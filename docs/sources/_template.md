# Source: <Name>

**Status:** Spec'd | In progress | Implemented | Deprecated
**Pattern:** Annual snapshot | Event stream | Periodic poll | One-time geometry | Specialized
**Cadence:** <how often we ingest>
**Last updated:** YYYY-MM-DD

## Overview

<!-- One paragraph: what this source is, what it covers, why we use it. -->

## Data points covered

<!-- List of canonical data points this source provides. Link to docs/data-points.md entries. -->

- `<data_point_id>` — <brief description>
- ...

## Endpoint(s)

<!-- Actual URLs, with examples. -->

- Base URL: `https://...`
- Specific datasets/endpoints: ...

## Authentication

<!-- What's needed. Env var names. How to get keys. -->

- Required env vars: `EXAMPLE_API_KEY`
- How to obtain: link to signup page
- Key storage: documented in `.env.example`

## Rate limits

<!-- Documented limits. How we respect them. -->

## Schema

### Source schema (what the API returns)

<!-- The raw shape — field names, types, what each means. -->

| Source field | Type | Description |
|---|---|---|
| ... | ... | ... |

### Canonical mapping (what we store)

<!-- How source fields map to our canonical schema. -->

| Source field | → | Canonical column | Notes |
|---|---|---|---|
| ... | → | ... | ... |

## Watermark / incremental strategy

<!-- For event streams: how do we resume from where we left off? -->

- Watermark column: `<field>`
- Initial backfill range: ...
- Incremental window: ...

## Deduplication

<!-- How do we handle records appearing more than once? -->

- Primary key: ...
- Conflict resolution: ...

## Known gotchas

<!-- Schema quirks, breaking changes, edge cases. Update this as you find more. -->

- ...

## Change history

<!-- Significant changes to this source's data or our handling of it. -->

- YYYY-MM-DD: Initial spec
