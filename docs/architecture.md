# Architecture

System design for location-intel: components, data flow, storage conventions, deployment topology. Where something is decided but not yet built, it is marked as such.

> **Provenance:** the original off-repo architecture draft referenced in `HANDOFF_PROMPT.md` was never committed. This document reconstructs the architecture from the committed record — `README.md`, ADRs 0001–0003, `docs/sources.md`, `WORK_LOG.md`, `.env.example`, and the conventions in `CLAUDE.md` — and supersedes that draft.

Related docs:

- [`data-points.md`](./data-points.md) — what we collect and why
- [`sources.md`](./sources.md) — where the data comes from
- `schema.md` — how it's stored *(not yet written; next work item)*
- [`decisions/`](./decisions/) — ADRs

## System overview

```
External data sources (Census, DataSF, OSM, GTFS, FEMA, NOAA, EPA, …)
            ↓
        Ingestion pipelines (Python — one pattern per source type)
            ↓
        Raw events / observations (PostgreSQL + PostGIS on Supabase)
            ↓
        Derived metrics layer (rates, rolling windows, composites)
            ↓
        Universal API (TypeScript — single endpoint, parameterized by
        data point + geography + time)
            ↓
        Intent-specific surfaces (later — house-hunting, retail siting, …)
```

v1 is San Francisco only (see `README.md`, "Why San Francisco first"). City is treated as configuration: adding a city later means new ingestion runs and per-city config, not new code paths (`CLAUDE.md`, "What this project is").

## Components

Monorepo (ADR 0001) with four packages plus infra:

| Location | Language | Role | Status |
|---|---|---|---|
| `packages/ingestion` | Python | ETL pipelines, one per source | scaffold stub |
| `packages/intelligence` | Python | Derived metrics: rates, rolling windows, composite scores | scaffold stub |
| `packages/api` | TypeScript | Public-facing API | scaffold stub |
| `packages/shared` | TypeScript | Shared schemas and types | scaffold stub |
| `infra/supabase/migrations` | SQL | Numbered database migrations | empty |

Dependency direction: `ingestion` and `intelligence` write to the database; `api` reads from it. The Python and TypeScript packages do not import each other — **the database schema is the contract** between them. Shared type definitions for the TypeScript side live in `packages/shared`.

## Data flow

### 1. Sources

18 free public sources plus PurpleAir as the one paid exception (ADR 0003). Full inventory with endpoints, rate limits, and gotchas in [`sources.md`](./sources.md).

### 2. Ingestion pipelines

The 18 sources collapse into five pipeline patterns (detailed at the end of [`sources.md`](./sources.md)):

| Pattern | Shape | Example sources |
|---|---|---|
| A | Annual CSV/JSON snapshot — download, replace, version by effective date | ACS, LEHD LODES, CDC PLACES |
| B | Daily event stream via Socrata — incremental pull on `:updated_at` watermark, append-only | DataSF crime, 311, permits |
| C | Periodic API poll — scheduled poll, upsert into time-series table | EPA AirNow, NREL AFDC, CMS |
| D | One-time geometry import — import to PostGIS, refresh rarely | TIGER, FEMA NFHL, CAL FIRE FHSZ |
| E | Specialized existing tooling | OSM (osm2pgsql), GTFS |

Pipeline conventions (from `CLAUDE.md`, non-negotiable):

- All external calls go through a retry-with-backoff wrapper; documented rate limits are respected.
- Incremental pulls resume from a per-source watermark (last-seen `:updated_at` or equivalent).
- Source field names are mapped to canonical names at ingestion; source-specific naming does not propagate downstream.
- Failures are logged, the run is marked failed, and the pipeline continues with the next record where appropriate — no silently swallowed exceptions.

### 3. Storage

Postgres + PostGIS, managed via Supabase. The concrete table design is the next work item (`schema.md` + `infra/supabase/migrations/0001_init.sql`); these conventions are already fixed:

- **Bitemporal time series.** Every time-series record carries `observed_at` (when it happened in the world) and `recorded_at` (when we ingested it), both `timestamptz` in UTC. Sources backfill; we need both axes.
- **Geometry.** All geometries stored as PostGIS, SRID 4326 (WGS84), converted at ingestion if the source uses another projection. All geometry columns GIST-indexed. Spatial queries use `ST_DWithin`.
- **Layered storage.** Raw events/observations are kept distinct from derived metrics; derived layers are rebuilt from raw, not the other way around.
- **Migrations.** Numbered SQL files in `infra/supabase/migrations/`; a migration that has been run is never edited — a new one is added.

Supabase Storage holds non-DB files (large geometries, periodic dumps) — documented in `.env.example` (`SUPABASE_STORAGE_BUCKET`). No data files in the repo.

### 4. Derived metrics layer

Python (`packages/intelligence`). Computes rates (e.g. crime per 1k residents over rolling 30/90/365-day windows), aggregations to geographic units, and eventually the composite intent scores. Reads raw layers, writes derived layers. Not yet designed in detail.

### 5. Universal API

TypeScript (`packages/api`). A thin API parameterized by data point, geography, and time rather than one endpoint per dataset. Auth and rate limiting planned from the start (see `WORK_LOG.md` kickoff plan). Per ADR 0003, the API design must not assume real travel times exist — v1 exposes GTFS-derived proxies with a clean upgrade path.

### 6. Intent surfaces (later)

Composite, weighted scores tuned to use cases (house-hunting, retail siting, insurance underwriting). Explicitly out of scope for the current data-foundation phase.

## Deployment

Decided in ADR 0002; nothing is deployed yet.

- **Railway** runs all application services. Each deployable service gets its own Railway service config; scheduled ingestion runs as Railway cron services.
- **Supabase** provides Postgres + PostGIS, auth, and object storage.
- **CI** is GitHub Actions on PRs to `main`, path-filtered so Python and TypeScript checks only run when their files change.
- **CD**: Railway watches GitHub and deploys `main` post-merge.
- Environment variables are managed in the Railway dashboard; `.env.example` is the documentation source of truth for what exists.

## v1 boundaries (ADR 0003)

- **No OpenTripPlanner.** Travel-time/accessibility metrics ship as GTFS-derived proxies (stop density, frequency, lines within radius). Real travel times are a v2 trigger tied to enterprise demand.
- **No modeled microclimate.** v1 microclimate signal is limited to NOAA stations plus temperature/humidity readings that arrive as a byproduct of PurpleAir air-quality ingestion.
- **PurpleAir is the only paid source** (~$5–20/month). Everything else is free public data.

## Open items

In order (tracked in `WORK_LOG.md`):

1. Storage schema — `schema.md` + `infra/supabase/migrations/0001_init.sql`
2. DataSF crime pipeline spec — `sources/datasf-crime.md`
3. DataSF crime pipeline implementation — proves the architecture end to end
4. API skeleton — single `/data-points` endpoint
