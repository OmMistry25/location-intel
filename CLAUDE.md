# CLAUDE.md

You are working on this codebase as a coding agent. Read this entire file at the start of every session. These rules are not optional.

## What this project is

A **place intelligence platform** — ingesting public + commercial data sources about urban areas, normalizing them into a unified time-series store keyed by geography, and exposing them through an API. The long-term vision is intent-based queries (composite scores tuned to use cases like house-hunting, retail siting, insurance underwriting). The current focus is the **data foundation**: ingestion pipelines, storage schema, and a thin universal API.

We are starting with **San Francisco only**. The architecture is built so adding cities later is configuration + new ingestion runs, not a rewrite.

For deeper context read in this order:
1. `README.md` — current state of the project
2. `docs/architecture.md` — the system design
3. `docs/data-points.md` — what we collect and why
4. `docs/sources.md` — where data comes from
5. `docs/schema.md` — how it's stored
6. `WORK_LOG.md` — what's been done recently and what's next
7. The CLAUDE.md in whichever package you're working in

## How you work here

### Branching

- **Never commit directly to `main`.** Always work on a feature branch.
- Branch naming: `<type>/<short-kebab-description>` where type is one of:
  - `feat/` — new functionality
  - `fix/` — bug fixes
  - `refactor/` — restructure without behavior change
  - `docs/` — documentation only
  - `chore/` — tooling, deps, config
- Examples: `feat/datasf-crime-ingestion`, `fix/acs-pagination-off-by-one`, `docs/add-source-spec-template`
- One logical change per branch. If a task naturally splits, create multiple branches and PRs.

### Commits

- Use **conventional commits**: `<type>(<scope>): <description>`
  - `feat(ingestion): add DataSF crime pipeline`
  - `fix(api): handle empty bbox in /places endpoint`
  - `docs(sources): document ACS variable mapping`
- Subject line under 72 chars, imperative mood ("add" not "added"), no period.
- Commits should be **logical units of work**, not "wip" or "fix typo." Squash before opening the PR if your commits are messy.
- A PR with one well-scoped commit is better than ten micro-commits. A PR with three commits each representing a clear step is also fine. Avoid both extremes.

### Pull requests

- **Every change goes through a PR**, even one-line fixes. No exceptions.
- PR title follows conventional commit format.
- Use the PR template (`.github/pull_request_template.md`) — fill in every section.
- **Open PRs using `gh pr create`** with the body populated from the template.
- **You do not merge your own PRs.** Om reviews and merges.
- Before opening a PR, **read your own diff** with `git diff main...HEAD` and call out anything you're uncertain about in the PR body under "Uncertain about."

### What "done" means before opening a PR

You have run all of these locally and they pass:

- [ ] Tests: `pytest` (python packages) or `pnpm test` (ts packages)
- [ ] Linter: `ruff check` (python) or `biome check` (ts) — no warnings, no errors
- [ ] Formatter: `ruff format` (python) or `biome format` (ts) — no changes needed
- [ ] Types: `pyright` (python) or `tsc --noEmit` (ts) — zero errors
- [ ] CI on the PR branch is green

If any of these fail, **do not open the PR**. Fix the issues first. If you cannot fix them, open the PR as a draft and explain what's blocked.

## Scope discipline — this matters most

This is the single most important section. Re-read it before every task.

### Stay in scope

- **Only touch files relevant to the task.** If you find a bug or wart in unrelated code, note it in the PR description under "Out-of-scope observations" — do not silently fix it.
- **Do not add unrequested features.** If the task is "ingest DataSF crime data," do not also add retry logic, a caching layer, and a Slack notifier. If they seem useful, mention them in the PR description as future work.
- **Minimum change to satisfy the spec, not what would be ideal.** Ideal-seeking is Om's job.

### Ask before doing any of these

- **Refactoring existing code** that isn't directly required by the task. "Could be cleaner" is not a reason to refactor — it's a reason to ask first.
- **Adding dependencies.** Don't silently add to `pyproject.toml` or `package.json`. Exception: dependencies explicitly mentioned in the task spec.
- **Destructive operations.** `rm -rf`, dropping db tables, force-pushing, rewriting history, deleting files, `git reset --hard`. Always confirm before running.
- **Changing CI configs, lint configs, formatter configs, or other tooling.** These affect every future change.
- **Changing the schema** in ways not specified by the task. Schema changes need explicit approval — they cascade through every downstream consumer.
- **Modifying migrations that already exist.** Always create a new migration. Check git history before editing anything in `infra/supabase/migrations/`.

### Never do these

- **Never commit secrets.** API keys, tokens, passwords, connection strings. Never. Even temporarily. If you see one in code, stop and flag it.
- **Never modify `.env` files** containing real values. Document required vars in `.env.example`.
- **Never commit data files.** No CSVs, parquet, dumps, geojson with real data. Test fixtures must be tiny, synthetic, hand-written. Real data goes in object storage or the database.
- **Never merge your own PRs.**
- **Never `git push --force` to a shared branch** (including main or any open PR branch without explicit ok).
- **Never edit or delete an ADR.** ADRs are append-only. If a decision changes, write a new ADR that supersedes the old one.

## Documentation expectations

You maintain docs as you change code. Specifically:

- **Update the README** of the package you're working in if user-facing behavior changes.
- **Update relevant source docs** (`docs/sources/*.md`) when ingestion logic changes.
- **Update relevant runbooks** (`docs/runbooks/*.md`) when operational behavior changes.
- **Write a new ADR** for any non-trivial decision: schema choices, framework choices, anything you'd want to remember the reasoning for in three months. ADRs go in `docs/decisions/`, numbered sequentially. Use the ADR template.
- **Update `WORK_LOG.md`** at the end of every session — see "Ending a session" below.

### How to write docs

- **Dry technical reference.** No marketing language, no hype, no "this elegant solution." Docs explain what, where, why — not how great it is.
- **Comments explain why, not what.** The code says what. Don't write `# Set x to 5` above `x = 5`. Do write `# x must be 5 because the upstream API rounds to nearest 5` if that's true.
- **No AI-narration comments.** Avoid comments that just describe what the next line does.

## Code quality

- **No defensive programming where it's not needed.** Don't handle cases the function signature says won't happen. Don't catch exceptions you can't meaningfully handle.
- **Prefer dependencies over reimplementing.** But don't add a dependency for a one-line helper. Judgment call — when uncertain, ask.
- **Type everything** that's not a script. Internal scripts can be loose; library code is fully typed.
- **Public functions/classes have docstrings.** Internal helpers don't need them unless non-obvious.
- **Tests where they pay off.** Data transformations and business logic — yes. Glue code, config loaders, one-off scripts — usually no. For ingestion pipelines specifically: prefer integration-style tests with recorded fixtures over heavy unit-test mocking.
- **No commented-out code.** Delete it. Git remembers.
- **No `TODO` without context.** A `TODO` should say what needs doing and ideally reference an issue number. Otherwise it's noise.

## Project-specific technical conventions

These are non-negotiable. Violating these is a bug.

### Geographic data

- **All geometries stored as PostGIS, SRID 4326 (WGS84).** Convert at ingestion if source provides another projection.
- **All spatial queries use `ST_DWithin`, not `ST_Distance` with a filter.** ST_DWithin uses spatial indexes; ST_Distance does not.
- **All geometries indexed with GIST.** No exceptions.
- **Latitude is Y, longitude is X.** In PostGIS, points are constructed as `ST_MakePoint(lng, lat)`. Do not swap these. Many bugs.

### Time

- **All timestamps stored as `timestamptz` in UTC.** Never `timestamp` (without tz). Never local time in the database.
- **All time-series records have both `observed_at` (when it happened in the world) and `recorded_at` (when we ingested it).** This is non-negotiable — sources backfill and we need bitemporal queries.

### Naming

- **Snake_case for SQL and Python.** `camelCase` for TypeScript. **No** Hungarian notation, no `tbl_` prefixes.
- **Source field names get mapped to canonical names at ingestion.** Don't propagate source-specific naming downstream. E.g., SFPD's `incident_category` becomes our `category`.

### Errors and logging

- **Structured logging only.** No `print()` in library code. Use the configured logger.
- **Never log secrets.** API keys, tokens, full URLs with credentials. Redact.
- **Errors should fail loudly in dev, gracefully in pipelines.** Pipelines log the failure, mark the run as failed, and continue with the next record where appropriate. Don't swallow exceptions silently.

### External API calls

- **Respect documented rate limits.** Use backoff. Cache aggressively.
- **All external calls go through a retry-with-backoff wrapper.** No raw `requests.get` in pipeline code.
- **Document rate limits in the source's doc** (`docs/sources/*.md`).
- **Use a watermark for incremental pulls.** Store the last-seen `:updated_at` (or equivalent) per source, resume from there.

## Tooling

### Python

- Package management: **`uv`**. Not pip, not poetry.
- Lint + format: **`ruff`**.
- Type check: **`pyright`** (strict mode for library code, basic for scripts).
- Tests: **`pytest`**.
- Spatial: **`geopandas`** + **`shapely`** + **`pyproj`**.

### TypeScript

- Package management: **`pnpm`**.
- Lint + format: **`biome`**.
- Type check: **`tsc --noEmit`**.
- Tests: **`vitest`**.

### Database

- **Postgres + PostGIS.** Managed via Supabase.
- Migrations: numbered SQL files in `infra/supabase/migrations/`.
- **Never edit a migration that's been run.** Add a new one.

## Starting a session

When you start a session:

1. Read this CLAUDE.md (you're doing it).
2. Read `WORK_LOG.md` — what's been done, what's next, any open questions.
3. Read the CLAUDE.md in the package you'll be working in (if you're touching a package).
4. Read recent PRs (`gh pr list --limit 5`) to see current patterns.
5. If the task is ambiguous, **ask before doing anything**.

## Ending a session

When you finish a unit of work:

1. Ensure all work is committed. No uncommitted changes left behind.
2. Open a PR if the work is complete (per the "What 'done' means" checklist).
3. Update `WORK_LOG.md` with:
   - What was accomplished this session (PR links if applicable)
   - What's left in the current effort
   - Any decisions made (these should also have ADRs if non-trivial)
   - Any open questions for Om
4. If you discovered something that should change the plan, call it out in WORK_LOG.

## When in doubt

- **Ask.** A clarifying question is always better than guessing wrong.
- **Default to the smaller change.** You can expand scope if asked. You can't easily un-expand it.
- **Surface uncertainty in the PR body.** Better to flag "I'm not sure this is the right approach to X" than to ship it with false confidence.

## Things you've been wrong about before (update this section)

This section is for patterns Claude Code has gotten wrong in prior sessions. Update it when something is learned.

*(Empty — populate as we go.)*
