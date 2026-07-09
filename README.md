# location-intel

A **place intelligence platform** — ingesting public and commercial data sources about urban areas, normalizing them into a unified time-series store keyed by geography, and exposing them through an API.

## What this is

Maps today (Google, Apple) are directories. They tell you what's *there*, not what a place is *like*. The data to answer "what is this neighborhood like" exists — crime feeds, census, transit, air quality, noise complaints, business activity, hundreds of others — but it's fragmented across hundreds of APIs in inconsistent formats, and no consumer product fuses it into a coherent picture of a place.

This project is the data infrastructure to do that fusion. The long-term direction is **intent-based queries** — composite, weighted scores tuned to specific use cases like house-hunting, retail site selection, or insurance underwriting. The near-term focus is the foundation: ingestion, schema, and a thin universal API.

## Current state

This project is in early build. The data foundation is being established for **San Francisco** as the first city.

- ✅ Data point taxonomy mapped (~400 candidates, ~85 prioritized for v1)
- ✅ Source mapping completed for free public sources (18 sources, ~75 data points)
- ✅ Repo scaffolded (monorepo tooling + CI)
- ⏳ Schema design — not started (next up)
- ⏳ First ingestion pipeline (DataSF crime) — pending
- ⏳ API skeleton — pending

See [`WORK_LOG.md`](./WORK_LOG.md) for the most recent state.

## Why San Francisco first

- DataSF is one of the best municipal open-data portals in the US. Most P1 data points are available with a consistent API.
- SF has unique signals (microclimate, soft-story earthquake retrofit data, 311 patterns) that make it interesting beyond just being a starter city.
- One city deep before many cities shallow — the ETL patterns differ per city, and you learn them better with depth.

## Architecture (high level)

```
External data sources (Census, DataSF, OSM, GTFS, FEMA, NOAA, EPA, …)
            ↓
        Ingestion pipelines (Python — one pattern per source type)
            ↓
        Raw events / observations (PostgreSQL + PostGIS)
            ↓
        Derived metrics layer (rates, rolling windows, composites)
            ↓
        Universal API (TypeScript — single endpoint, parameterized by data point + geography + time)
            ↓
        Intent-specific surfaces (later — house-hunting, retail siting, etc.)
```

See [`docs/architecture.md`](./docs/architecture.md) for detail.

## Repo layout

```
location-intel/
├── README.md                    # this file
├── CLAUDE.md                    # rules for Claude Code (read on every session)
├── WORK_LOG.md                  # session-by-session state
├── docs/
│   ├── architecture.md
│   ├── data-points.md           # the data point taxonomy
│   ├── sources.md               # source mapping summary
│   ├── schema.md                # storage schema
│   ├── sources/                 # one doc per data source
│   ├── decisions/               # ADRs
│   └── runbooks/                # operational docs
├── packages/
│   ├── ingestion/               # Python — ETL pipelines
│   ├── intelligence/            # Python — derived metrics, composite scores
│   ├── api/                     # TypeScript — public-facing API
│   └── shared/                  # shared schemas, types
├── infra/
│   ├── supabase/                # migrations, edge functions
│   └── deploy/                  # docker, deployment configs
├── scripts/                     # dev tooling, one-off scripts
└── data/                        # data dictionaries, category mappings (no actual data)
```

## Getting started (developer)

> Setup instructions will be added as the repo gets scaffolded.

Required external services:
- Supabase project (Postgres + PostGIS + Auth)
- API keys for: Census, DataSF (Socrata token), 511.org (transit), EPA AirNow, NREL, NOAA (NCEI token), PurpleAir (paid — see ADR 0003)

See [`.env.example`](./.env.example) for the full list of required variables.

Required local tools:
- Python 3.11+ (`uv` for package management)
- Node.js 20+ (`pnpm` for package management)
- Docker (for local Postgres if not using Supabase locally)

## Working on this project with Claude Code

Read [`CLAUDE.md`](./CLAUDE.md) before starting any Claude Code session. It's not optional — the rules in there exist to keep the codebase coherent across sessions.

## License

TBD.
