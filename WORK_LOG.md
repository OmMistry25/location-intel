# Work log

This is the session-by-session memory of the project. Claude Code reads it at the start of every session. Update it at the end of every session.

**Format:** most recent at the top. Date + summary of what was done, what's next, any decisions, any open questions.

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
