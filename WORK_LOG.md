# Work log

This is the session-by-session memory of the project. Claude Code reads it at the start of every session. Update it at the end of every session.

**Format:** most recent at the top. Date + summary of what was done, what's next, any decisions, any open questions.

---

## Queued follow-ups

Standing list of agreed-but-not-yet-started work. Remove items as they ship.

_(None — the CLAUDE.md self-audit requirement shipped 2026-05-26; the PR-template Self-audit section shipped 2026-07-09.)_

---

## 2026-07-09 — Docs hygiene: architecture backfill + cross-doc drift fixes

**What was accomplished**

Docs-only PR fixing accumulated drift between the docs and reality:

1. **Backfilled `docs/architecture.md`.** CLAUDE.md lists it as required reading and `HANDOFF_PROMPT.md` said to copy it in, but the original off-repo draft was never committed. Reconstructed from the committed record (README, ADRs 0001–0003, `docs/sources.md`, CLAUDE.md conventions) with a provenance note. Written at design altitude only — no schema details, those belong to the schema task.
2. **README:** corrected the "Current state" checklist (scaffold is done, schema not started — it said the reverse); completed the required-API-keys list (added NOAA and PurpleAir, linked `.env.example`); reworded the stale "Getting started" scaffolding note; marked not-yet-created paths in the repo-layout tree as planned.
3. **PR template:** added the `## Self-audit` section required by CLAUDE.md — the flagged follow-up from the 2026-05-26 session.
4. **`docs/data-points.md`:** annotated the air-quality entries to reflect PurpleAir's paid (🟡 F2) status, consistent with `docs/sources.md` §9 and ADR 0003. Tags stay F1 because EPA AirNow covers those points free at station resolution.
5. **`docs/data-points.md` + `docs/sources.md` §4:** annotated the routing-engine-dependent transit entries (accessibility score, transit times) as deferred to v2 per ADR 0003 — same class of drift as PurpleAir; v1 ships GTFS-derived proxies only.

**Decisions made this session**

- `architecture.md` documents only already-decided architecture; anything not yet built is explicitly marked. No new decisions were made, so no new ADR.

**What's next (in order)** — unchanged:

1. **Design the storage schema** — `docs/schema.md` + `infra/supabase/migrations/0001_init.sql`
2. Spec the DataSF crime pipeline — `docs/sources/datasf-crime.md`
3. Implement the DataSF crime pipeline
4. API skeleton — single `/data-points` endpoint

Note: no Supabase project has been provisioned yet. Creating/linking one (dashboard access, real credentials) is an Om task; the schema can be designed and the migration written before that exists.

**Open questions for Om**

*(None blocking.)*

---

## 2026-05-26 — Self-audit requirement added to CLAUDE.md (follow-up PR)

**What was accomplished**

Shipped the queued follow-up from the scaffold session. Added two rules to `CLAUDE.md`:

1. A **Self-audit** subsection under "How you work here" requiring every PR description to include a Self-audit covering deviations from the spec, choices made where the spec was silent, a scope check (no forbidden tools / no scope creep), and honest disclosure of anything cut or unauthorized.
2. A **source-of-truth** principle at the top of "Documentation expectations": anything future sessions need must live in the repo; machine-local agent memory is a convenience cache only, never canonical.

Docs-only change. Opened as a separate PR off `main` after PR #1 merged, per the queued plan.

**Decisions made this session**

- Cleared the now-shipped item from "Queued follow-ups" and added this entry rather than leaving a stale queue.
- Did **not** modify `.github/pull_request_template.md` to add a Self-audit section — left as a flagged follow-up (see PR self-audit) to keep this PR to the requested CLAUDE.md scope.

---

## 2026-05-26 — Monorepo scaffold (first Claude Code session)

**What was accomplished**

Scaffolded the monorepo structure with working tooling. No feature code — skeleton only. Single combined PR (Python scaffold + TS scaffold + CI) rather than three, to avoid a chicken-and-egg between CI and the code it checks (see PR description).

1. **Workspace structure.** `packages/{ingestion,intelligence}` (Python), `packages/{api,shared}` (TypeScript), `infra/supabase/migrations/` (empty, `.gitkeep`), `scripts/` (`.gitkeep`).

2. **Python tooling.** Root `pyproject.toml` defines a uv virtual workspace and configures ruff (lint + format) and pyright (strict). Per-package `pyproject.toml` (hatchling, src layout) for ingestion and intelligence. Each exposes a `hello()` callable and a stub test. `requires-python = ">=3.11"`; `uv.lock` committed.

3. **TypeScript tooling.** Root `package.json` (pnpm workspace), `pnpm-workspace.yaml`, strict `tsconfig.json`, `biome.json`. Per-package `package.json` + `tsconfig.json` for api and shared. Each exports `hello()` and has a stub vitest test. `pnpm-lock.yaml` committed.

4. **CI.** `.github/workflows/ci.yml` runs on PRs to `main`. A `dorny/paths-filter` job gates Python vs TS jobs by changed paths. Python job: ruff check, ruff format --check, pyright, pytest (uv, cached). TS job: biome check, tsc --noEmit, vitest (pnpm, cached).

5. **Per-package `CLAUDE.md`** stub in each of the four packages.

**Pinned tool versions:** ruff 0.15.14, pyright 1.1.409, pytest 9.0.3, @biomejs/biome 2.4.15, typescript 6.0.3, vitest 4.1.7, @types/node 22.19.19. CI uses uv 0.11.16 / pnpm 11.3.0 / Node 22. GitHub Actions pinned to major tags (checkout v6, paths-filter v4, setup-uv v8, setup-node v6, pnpm/action-setup v6).

**Verified locally (all green):** ruff check, ruff format --check, pyright (0 errors), pytest (2 passed); biome check, tsc --noEmit (0 errors), vitest (2 passed). Frozen installs (`uv sync --frozen`, `pnpm install --frozen-lockfile`) succeed against committed lockfiles.

**What's next (in order)** — unchanged from kickoff; next is schema design (step 2 below).

**Decisions made this session**

- pytest uses `--import-mode=importlib` (both packages have `tests/test_main.py`; importlib mode avoids the duplicate-basename collision and suits the src layout). Documented in PR.
- Combined-PR exception is one-time; subsequent PRs return to one-logical-change-per-PR.

**Open questions for Om**

- *(None blocking.)* Build-tool version pins were chosen as latest stable at scaffold time; bump policy TBD.

---

## 2026-05-25 — Project kickoff (planning phase, pre-code)

**What was accomplished**

Off-repo planning work completed with Om in conversation:

1. **Project framing decided.** This is a "location intelligence" platform, not a maps app. The map is one potential surface; the data infrastructure is the product. Build order is data → API → intelligence layer → consumer surfaces.

2. **Data point taxonomy completed.** ~400 candidate data points across 20 dimensions (people, economics, housing, safety, mobility, amenities, environment, urban form, etc.). Tagged with feasibility (F1–F4) and priority (P1–P3). See `docs/data-points.md`.

3. **Free public source mapping completed.** 18 sources covering ~75 P1 data points, all free. These collapse into 5 ingestion patterns (annual snapshot, daily event stream, periodic poll, one-time geometry, specialized OSM/GTFS). See `docs/sources.md`.

4. **Repo conventions decided.** Monorepo, Python + TypeScript workspaces, CLAUDE.md as the rules file, ADRs in `docs/decisions/`. See `CLAUDE.md` and `docs/decisions/0001-monorepo.md`.

5. **V1 scope locked.** Free public sources + PurpleAir (one paid exception, ~$5–20/mo) for air quality and microclimate. OpenTripPlanner and modeled microclimate deferred to v2. See `docs/decisions/0003-v1-scope.md`.

6. **Deployment target chosen.** Railway for application services. Supabase for database + auth. See `docs/decisions/0002-deployment-railway.md`.

7. **Project name set.** `location-intel` (basic, placeholder-ish, fine for now).

**What's next (in order)**

1. **Scaffold the monorepo.** Create the directory structure, set up Python (uv + ruff + pyright) and TypeScript (pnpm + biome) tooling, base CI, .env.example, .gitignore. No package code yet — just the skeleton. *(This is the first Claude Code session.)*

2. **Design the storage schema.** Define the raw events / observations / derived metrics tables, the geometry tables, the time-series shape (`observed_at` + `recorded_at` bitemporal). Write `docs/schema.md`. Write the first migration (`infra/supabase/migrations/0001_init.sql`).

3. **Spec the first ingestion pipeline (DataSF crime) end-to-end.** Endpoint, schema mapping, watermark logic, dedup rules, output table. Write `docs/sources/datasf-crime.md` with full detail.

4. **Implement the first ingestion pipeline.** Following the spec. This is the "prove the architecture works" step — once one pipeline runs cleanly, the others are variations on the pattern.

5. **API skeleton.** Define endpoint shapes, set up the TypeScript package with auth, rate limiting hooks, and a single `/data-points` endpoint that returns one of the ingested data points.

**Open questions for Om**

*(None blocking. Updated as new questions arise.)*

**Decisions made this session** (each has an ADR or is documented in CLAUDE.md / source docs)

- Monorepo over polyrepo (ADR 0001)
- Railway for deployment (ADR 0002)
- V1 scope: free sources + PurpleAir (one paid exception); defer OpenTripPlanner and modeled microclimate (ADR 0003)
- Python for data work, TypeScript for API
- San Francisco as first and only city for v1
- Bitemporal time-series storage (`observed_at` + `recorded_at`)
- All geometries in EPSG:4326, PostGIS, GIST-indexed
- Conventional commits + PR template + ADRs as standard process
- Project name: `location-intel`
