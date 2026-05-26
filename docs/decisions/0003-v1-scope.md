# ADR 0003: V1 scope — free public sources plus PurpleAir; defer OpenTripPlanner

**Status:** Accepted
**Date:** 2026-05-25
**Deciders:** Om

## Context

While mapping data sources for v1, three specific data points sat in a gray zone — important for the eventual product but with significant cost or complexity in v1:

1. **Microclimate data (sun/fog zones, temperature variation across SF)** — a real SF differentiator. Free options (NOAA stations) are too sparse for neighborhood-level resolution; better options (PurpleAir, modeled microclimate, commercial weather APIs) are paid or require non-trivial engineering.

2. **PurpleAir air quality** — formerly free, now a paid API (~$5–20/month at our scale). Provides ~1000+ sensors in SF vs ~5 EPA AirNow stations. As a side benefit, PurpleAir sensors also report temperature and humidity, giving us sparse-but-real microclimate data as a byproduct of air quality ingestion.

3. **Travel-time / accessibility metrics via OpenTripPlanner** — running OTP would give us real "transit time to X" calculations across the city. The simpler alternative is proxy metrics (stop density, frequency, lines accessible within radius) computed directly from GTFS without a routing engine.

We needed to decide what makes the v1 cut.

## Decision

V1 includes:

- **All free public sources** as documented in `docs/sources.md` (~18 sources, ~75 P1 data points).
- **PurpleAir** as the one paid exception, justified by the air quality density it unlocks and the bonus microclimate data (temperature, humidity) it provides as a byproduct.

V1 defers:

- **OpenTripPlanner.** Ship GTFS-derived proxy metrics (stop density, route frequency, lines within walking radius) instead of real travel times. Defer OTP to v2 or whenever an enterprise buyer specifically requires real travel times.
- **Dedicated microclimate sourcing** beyond what PurpleAir provides as a byproduct. NOAA stations + PurpleAir temperature is what v1 has. Modeled microclimate (satellite cloud cover + topography) is deferred to v2.

## Options considered

### PurpleAir

**Option A: Include in v1.** ~$5–20/month for SF-only. Cheap enough that the cost is negligible compared to the engineering time it would take to model air quality from sparse AirNow stations to hex level. Also gives us microclimate temperature data essentially for free.

**Option B: Defer, use AirNow only.** Preserves "100% free v1" as a principle. Resolution is ~5 stations citywide for air quality. No microclimate signal.

**Picked A.** The marginal cost is real but tiny; the data quality jump is large. "100% free" was a useful principle but not a goal in itself. The principle was really "no big paid commitments" — PurpleAir is not a big commitment.

### OpenTripPlanner

**Option A: Include in v1.** Real travel times for every origin-destination pair. Requires running a JVM service, building and maintaining the graph, ~8GB RAM minimum, ongoing operational burden.

**Option B: Defer, use proxies.** GTFS-derived metrics (stop density, frequency, lines accessible within walking distance). Cover ~80% of consumer use cases. No operational service to maintain.

**Picked B.** OTP is a project in itself — running it well is weeks of work and ongoing maintenance. The proxies are good enough for v1 consumer use cases. When an enterprise buyer specifically asks for real travel times (and is willing to pay), that's the right trigger to invest. Don't pre-invest.

### Microclimate (beyond PurpleAir byproduct)

**Option A: Build modeled microclimate in v1.** Free data sources (GOES satellite, USGS DEM, NOAA reanalysis) but weeks of engineering work to compose them into useful tract-level metrics.

**Option B: Defer.** Ship with NOAA stations + PurpleAir temperature only. Accept that SF microclimate is partially captured but not richly modeled.

**Picked B.** Modeled microclimate is a significant engineering project on its own and not foundational — it's an enrichment. The PurpleAir byproduct already gives us *some* of this signal. Revisit when we know whether anyone actually queries microclimate data heavily.

## Why these choices fit together

The consistent principle: **v1 is the credible foundation, not the impressive demo.** That doesn't mean "everything must be free" or "everything must be simple" — it means "every dependency we take on must clearly pay for itself before v1 ships."

- PurpleAir pays for itself: massive data quality improvement, trivial cost.
- OTP does not pay for itself in v1: massive operational cost, marginal data quality improvement for consumer use cases.
- Modeled microclimate does not pay for itself in v1: weeks of work for a niche signal we don't know matters yet.

## Consequences

- v1 ingestion pipeline list: ~18 free sources + PurpleAir = 19 sources total.
- v1 air quality data is rich (PurpleAir + AirNow), tract-level resolution achievable.
- v1 microclimate data is sparse but real (PurpleAir temperature, NOAA stations). Documented as a partial-coverage data point.
- v1 mobility data is GTFS-derived proxies — stop density, frequency, lines-within-radius — not real travel times. Documented as such.
- PurpleAir API key required and budgeted as an ongoing operating cost. Added to `.env.example`.
- The API design must NOT assume real travel times exist. Endpoints that would benefit should accept proxies in v1 and upgrade cleanly later.

## Revisit when

- An enterprise design partner asks for real travel times specifically and is willing to pay → trigger to build OTP.
- v1 ships and usage shows microclimate queries are common → trigger to invest in modeled microclimate.
- PurpleAir pricing changes significantly → reassess against alternatives.
