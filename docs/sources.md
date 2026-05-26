# Free Public Data Sources — SF v1

Mapping every 🟢 F1 / ⭐ P1 data point to its actual source. Grouped by source (one pipeline per source) because that's the natural unit of ingestion work.

For each source:
- **Endpoint(s)** — where to actually call
- **Auth** — what (if anything) you need
- **Rate limits** — practical constraints
- **Update cadence** — how often it changes
- **Native granularity** — finest spatial unit
- **Format** — JSON / CSV / shapefile / GTFS / etc.
- **Data points covered** — what P1 metrics it gives you
- **Gotchas** — things that'll bite you

---

## 1. US Census Bureau — American Community Survey (ACS)

The single most important source. Covers most of People, Economics, Housing demographics.

- **Endpoint:** `https://api.census.gov/data/{year}/acs/acs5`
  - 5-year estimates (recommended for tract-level — more reliable)
  - Also acs1 (1-year, only large geographies)
- **Auth:** free API key (instant signup at api.census.gov/data/key_signup.html)
- **Rate limits:** 500 calls/day unauthenticated, effectively unlimited with key
- **Update cadence:** annual (December release for prior 5-year window, e.g. 2023 data released Dec 2024)
- **Native granularity:** down to block group; tract is the sweet spot
- **Format:** JSON (also CSV download for bulk)
- **Geometries:** TIGER/Line shapefiles, separate download — `https://www2.census.gov/geo/tiger/`

### Data points covered (P1)
- Total population (B01003)
- Population density (derived: pop / tract area from TIGER)
- Median age (B01002)
- Age brackets — % under 5, 5-17, 18-24, 25-34, 35-44, 45-54, 55-64, 65-74, 75+ (B01001)
- Household count (B11001)
- Avg household size (B25010)
- % single-person households (B11001)
- % married couples with kids (B11003)
- % households with kids under 18 (B11005)
- Racial composition % (B02001)
- Foreign-born % (B05002)
- % bachelor's degree (B15003)
- % graduate/professional degree (B15003)
- Median household income (B19013)
- Income distribution by bracket (B19001)
- Unemployment rate (B23025)
- % work from home (B08301)
- % below federal poverty line (B17001)
- Total housing units (B25001)
- % owner-occupied / renter-occupied (B25003)
- % vacant (B25002)
- % single-family detached (B25024)
- Median home value (B25077)
- Median rent paid (B25064)
- % income on housing (B25070, B25091)

### Gotchas
- ACS reports margins of error. For small tracts (e.g. industrial areas with low population), MoE can be huge — flag and possibly suppress data for tracts where MoE exceeds estimate × 0.5.
- Variable names are arcane (B01001_002E = male, B01001_026E = female). Maintain a mapping file.
- Tract boundaries change after each decennial census (last shift: 2020). Don't naively join old and new tract codes.
- 5-year estimates centered on the middle year — "2019-2023 ACS5" represents ~2021 conditions, not 2023.

---

## 2. DataSF — SF Open Data Portal

The crown jewel for SF. Built on Socrata. ~25 P1 data points across crime, 311, business, permits.

- **Base:** `https://data.sfgov.org/`
- **API pattern:** `https://data.sfgov.org/resource/{dataset_id}.json?$where=...&$limit=...`
- **Auth:** none required for reading, but get a Socrata app token (free) to lift rate limits
- **Rate limits:** ~1000/hour unauthenticated; effectively unlimited with token
- **Update cadence:** varies per dataset (see below)
- **Format:** JSON, CSV, GeoJSON via API; full bulk download available
- **Query language:** SoQL (SQL-ish) — supports `$where`, `$select`, `$group`, `$limit`, `$offset`

### Datasets to ingest

#### a) SFPD Incident Reports 2018 to Present
- Dataset: `wg3w-h783`
- Cadence: daily (typically 2-3 day lag)
- Granularity: point (lat/lng) and police district
- Volume: ~120k incidents/year
- **Covers:** all crime data points — total crimes, violent/property splits, homicide, robbery, assault, burglary, larceny, theft from vehicle, motor vehicle theft, all derived rates
- **Gotcha:** schema changed in 2018 (different dataset for pre-2018). Two versions of incident reporting (`Incidents 2003-May 2018`: `tmnf-yvry`). For trend lines, you need to harmonize or accept the 2018 cutoff.
- **Gotcha:** "incident_category" vs "incident_subcategory" vs "incident_description" — pick the right level. Subcategory is usually right.

#### b) 311 Cases
- Dataset: `vw6y-z8j6`
- Cadence: real-time (records appear within hours)
- Granularity: point (lat/lng) + neighborhood
- Volume: ~500k+ requests/year
- **Covers:** street/sidewalk cleaning, graffiti, illegal dumping, encampment reports, abandoned vehicles, noise complaints, safety-related (lighting), pothole reports, resolution times
- **Gotcha:** request type names are messy and overlapping ("Street and Sidewalk Cleaning" vs "Street Cleaning"). Build a normalized category mapping.
- **Gotcha:** anonymized locations get rounded to block (lat/lng with last digits truncated) for sensitive categories.

#### c) Registered Business Locations
- Dataset: `g8m3-pdis`
- Cadence: monthly
- Granularity: address
- **Covers:** business count by type, business density, openings/closures, churn rate, NAICS-coded industries
- **Gotcha:** "registered" ≠ "open." A business pays a registration fee — closed businesses sometimes don't deregister immediately. Use "Business Start Date" and "Business End Date" carefully; the latter is often blank.
- **Gotcha:** chain detection requires fuzzy matching of `DBA Name` to a chain list. Not provided.

#### d) Building Permits
- Dataset: `i98e-djp9`
- Cadence: daily
- Granularity: address + parcel
- **Covers:** permits issued (count, dollar value), new construction units, demolition, projects under construction
- **Gotcha:** "filed date" vs "issued date" vs "completed date" — filed is when paperwork arrives, issued is when work can start. Use issued for "permits issued" metrics.

#### e) Fire Incidents
- Dataset: `wr8u-xric`
- Cadence: daily
- Granularity: point + district
- **Covers:** structure fires, fire response times (derived from on-scene timestamps)

#### f) Fire and EMS Calls for Service
- Dataset: `nuek-vuh3`
- Cadence: daily
- Granularity: point + district
- **Covers:** 911 call volume, fire/EMS response times

#### g) Street Tree List
- Dataset: `tkzw-k3nq`
- Cadence: monthly-ish (~7M points, stable)
- Granularity: point
- **Covers:** street tree density (per hex/tract)

#### h) Streetlight Inventory
- Source: SF Public Works — DataSF has it but variable freshness
- **Covers:** street lighting density (proxy for nighttime perceived safety)

#### i) Parks (Recreation and Parks Department GIS)
- Multiple datasets — `gtr9-ntp6` (boundaries), playgrounds, dog parks separate
- Cadence: when changes happen (rare)
- Granularity: polygon
- **Covers:** park count/distance/acreage, % land as parks, playground count, dog park count

#### j) Bike Network (SFMTA Bicycle Network)
- Dataset on DataSF + SFMTA direct
- **Covers:** bike lane mileage, protected vs unprotected (where coded)

#### k) Pedestrian and Bicycle Injury Collisions (TIMS / SWITRS)
- TIMS: `https://tims.berkeley.edu/` (UC Berkeley, free with account)
- **Covers:** pedestrian/cyclist injuries, traffic fatalities
- **Gotcha:** TIMS data is statewide; filter to SF. SWITRS is the underlying source.

#### l) Parking Tickets (Parking Citations)
- Dataset: `ab4h-6ztd`
- Cadence: daily
- **Covers:** parking ticket density (proxy for parking difficulty)
- **Gotcha:** ticket location is often street segment, not exact point. Aggregate to segment then to hex.

#### m) SF Planning Zoning Districts
- Dataset: `9r5g-25fp` or via SF Planning GIS
- **Covers:** zoning classification, % residential/commercial/mixed/industrial/open
- **Gotcha:** SF has ~50 zoning codes. You need to map these to your high-level categories.

#### n) Soft Story Properties (Earthquake)
- Dataset: `beah-shgi`
- **Covers:** earthquake retrofit status

### Common DataSF gotchas
- **Pagination:** default limit is 1000, max 50000 per request. For large datasets paginate with `$limit` and `$offset` or sort by `:id` and use `$where >`.
- **Geometry format:** some datasets give lat/lng as separate fields, some as `point` GeoJSON, some both. Inconsistent.
- **`:updated_at` field** lets you do incremental pulls — only fetch records changed since last run.
- **Soft deletes:** Socrata sometimes returns deleted records with a flag. Check dataset docs.

---

## 3. OpenStreetMap (OSM)

For the entire built environment + places. Download SF extract, query locally; or use Overpass API for live queries.

- **Bulk extracts:** `https://download.geofabrik.de/north-america/us/california.html` (then clip to SF bbox)
  - Or BBBike for custom extracts: `https://extract.bbbike.org/`
- **Live API (Overpass):** `https://overpass-api.de/api/interpreter`
- **Auth:** none
- **Rate limits:** Overpass: be nice, ~10k queries/day for self-hosted, ~unlimited for downloads
- **Update cadence:** continuously edited; download fresh extract weekly or use incremental diffs
- **Format:** OSM XML / PBF (binary); convert to PostGIS with osm2pgsql or imposm

### Data points covered (P1)
- Restaurant count, cafes, bars, coffee shops, grocery stores (with cuisine tags where available)
- Gym, library, hospital, urgent care locations
- Intersection density (derived from way intersections)
- Walkable amenities count
- Bike lane mileage (where tagged)
- Pedestrian crossing density
- Avg block length (derived)
- Tree canopy locations (limited)
- Building footprints (rough)
- Street network (for distance/routing)

### Gotchas
- **Coverage is uneven.** SF has dense OSM data for restaurants/bars in central areas, sparser in residential edges. For commercial completeness, supplement with a paid places API later.
- **Tagging inconsistency.** "restaurant" can be `amenity=restaurant`, `amenity=fast_food`, `shop=convenience` with food, etc. Build a tag-to-category mapping.
- **Cuisine tags are spotty** (~40-60% of restaurants tagged with `cuisine=*`).
- **Don't use Overpass for bulk ingest.** Use it for incremental updates or interactive queries. Bulk = download.
- **Use osm2pgsql with the "lua" style** to extract exactly the tags you need into PostGIS columns.

---

## 4. GTFS Transit Feeds

Static GTFS feeds describe routes, stops, schedules. Realtime GTFS-RT gives live vehicle positions and predictions.

- **511.org Bay Area** (clearinghouse for all Bay Area transit): `https://511.org/open-data/transit`
  - SFMTA (Muni)
  - BART
  - Caltrain
  - AC Transit
  - SamTrans
  - Golden Gate Transit
- **Auth:** free API key (signup at 511.org)
- **Rate limits:** generous (~60/min static, more for RT)
- **Update cadence:** static GTFS updated when agencies publish (weekly to monthly); GTFS-RT every ~30 seconds
- **Format:** GTFS (zip of CSV files); GTFS-RT (protobuf)

### Data points covered (P1)
- Bus stop locations and distances
- Rail/metro station locations
- Transit stop density
- Lines accessible within radius
- Bus frequency (peak / off-peak / weekend — derived from stop_times.txt)
- Rail frequency
- Nighttime transit availability
- Transit accessibility score (composite — needs routing engine)
- Transit time to downtown / SFO / job centers (needs routing engine)

### Routing engine for accessibility metrics
- **OpenTripPlanner (OTP)** — Java, mature, free. Build a graph from GTFS + OSM, query travel times for any origin-destination.
- **r5 / Conveyal** — fast accessibility analysis, free.
- Don't try to compute travel times by hand from GTFS — use OTP.

### Gotchas
- **Frequency by time-of-day** requires expanding `stop_times.txt` against `calendar.txt`/`calendar_dates.txt` to get actual scheduled trips for a given service day.
- **Multiple agencies = multiple feeds.** You'll merge them. Stop IDs collide between agencies — namespace them.
- **GTFS-RT historical** is not provided. If you want reliability metrics, you have to collect RT yourself over time.

---

## 5. FEMA — National Flood Hazard Layer (NFHL)

- **Endpoint:** ESRI REST service at `https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer`
- Alternatively bulk download by county: `https://msc.fema.gov/portal/advanceSearch`
- **Auth:** none
- **Rate limits:** reasonable
- **Cadence:** updated when flood maps revised (years)
- **Format:** shapefile, GeoJSON via REST

### Data points covered
- Flood zone classification (100yr / 500yr / minimal)
- Sea level rise (FEMA hosts some; NOAA is better — see below)

---

## 6. CAL FIRE — Fire Hazard Severity Zones (FHSZ)

- **Source:** `https://gis.data.ca.gov/datasets/CALFIRE-Forestry::fire-hazard-severity-zones`
- **Auth:** none
- **Format:** shapefile / GeoJSON
- **Cadence:** infrequent updates (recent major update 2024)

### Data points covered
- Wildfire risk zone (very high / high / moderate)

---

## 7. USGS / California Geological Survey

For earthquake hazards.

- **USGS DEM (elevation):** `https://apps.nationalmap.gov/downloader/` or via cloud-optimized GeoTIFFs at AWS Public Datasets
  - Covers: elevation/hilliness (huge in SF), slope analysis
- **CGS Liquefaction & Landslide zones:** `https://maps.conservation.ca.gov/cgs/EQZApp/app/`
- **Cadence:** rarely changes
- **Format:** shapefile, GeoTIFF

### Data points covered
- Earthquake liquefaction risk
- Earthquake landslide risk
- Elevation/hilliness
- Tsunami inundation (CGS publishes statewide)

---

## 8. NOAA — Sea Level Rise & Climate

- **Sea Level Rise viewer data:** `https://coast.noaa.gov/slrdata/`
- **Climate normals:** `https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals`
- **Weather stations historical:** NCEI GHCN-Daily
- **Auth:** free token for NCEI data services
- **Cadence:** climate normals updated every decade; current weather constant

### Data points covered
- Sea level rise exposure (1ft, 2ft, 6ft scenarios — corresponds to 2050/2100 IPCC)
- Avg temp by month (sparse stations — SF has a few)
- Wind speed by neighborhood (modeling needed)

---

## 9. EPA AirNow + BAAQMD + PurpleAir

For air quality.

- **EPA AirNow API:** `https://docs.airnowapi.org/`
  - Auth: free key
  - Coverage: official monitoring stations (sparse — ~5 in SF)
  - Cadence: hourly
- **BAAQMD (Bay Area Air Quality Management District):** publishes via AirNow + own dashboards
- **PurpleAir API:** `https://api.purpleair.com/` (now requires paid signup, but reads are very cheap; ~$1 for full SF history)
  - 1000+ low-cost sensors in SF — much denser than official
  - Cadence: ~2 min readings
  - **Important reclassification:** PurpleAir is technically not free anymore. Marking 🟡 F2 in practice. For "truly free" stick to AirNow.

### Data points covered (sticking to AirNow free tier)
- AQI (daily, annual)
- PM2.5 levels
- Ozone
- Days exceeding "good" AQI
- NO2 (less coverage — supplement with EPA AQS)
- **Limitation:** ~5 stations means tract-level is interpolated, not measured. For finer resolution, PurpleAir becomes worth it.

---

## 10. CDC PLACES

Census-tract-level health outcomes, modeled from BRFSS.

- **Endpoint:** `https://chronicdata.cdc.gov/resource/{dataset}.json` (Socrata-based)
- **Dataset for tract-level:** `cwsq-ngmh`
- **Auth:** none required, Socrata token recommended
- **Cadence:** annual
- **Granularity:** census tract

### Data points covered
- Asthma rate (current)
- Life expectancy (use USALEEP, see below)
- Obesity rate
- Smoking rate (P3, but free here)
- Plus 25+ other health indicators (mental health, sleep, exercise, etc.)

### USALEEP (life expectancy)
- `https://www.cdc.gov/nchs/nvss/usaleep/usaleep.html`
- Tract-level life expectancy at birth
- One-time download, infrequently refreshed

---

## 11. CMS Hospital Compare

- **Endpoint:** `https://data.cms.gov/provider-data/`
- **Auth:** none
- **Cadence:** quarterly
- **Format:** CSV, JSON

### Data points covered
- Hospital ratings (1-5 stars)
- Hospital locations (joined with NPI registry for geocoding)

---

## 12. LEHD LODES (US Census)

Workplace-residence linkages — where workers live vs work.

- **Endpoint:** bulk download by state and year `https://lehd.ces.census.gov/data/lodes/`
- **Auth:** none
- **Cadence:** annual (2-3 year lag)
- **Granularity:** census block
- **Format:** CSV

### Data points covered
- Jobs density (WAC files — workplace area characteristics)
- Workers density (RAC files — residence area characteristics)
- Commute outflow patterns (OD files — origin-destination)
- Commute inflow patterns
- % work in same tract (derived from OD)
- Daytime population estimates (derived)

### Gotchas
- Block-level data has noise injected (differential privacy). Aggregate to tract for stability.
- ~2 year lag is the worst part. 2022 data released 2024.

---

## 13. California Department of Education

- **DataQuest:** `https://dq.cde.ca.gov/dataquest/` (web UI; data downloads as CSV)
- **API access:** limited — most via CSV exports
- **Cadence:** annual
- **Granularity:** school

### Data points covered
- Public school locations + boundaries
- Test scores (Smarter Balanced)
- Enrollment
- Graduation rates
- School ratings (need to compute — CDE doesn't give a single rating, GreatSchools does but isn't free)

### Alternative: NCES (federal)
- `https://nces.ed.gov/ccd/elsi/` for federal common core of data
- Private School Survey for private schools

---

## 14. National Renewable Energy Lab (NREL) — Alternative Fuels Data Center

- **Endpoint:** `https://developer.nrel.gov/api/alt-fuel-stations/v1.json`
- **Auth:** free key (api.data.gov / developer.nrel.gov)
- **Cadence:** daily

### Data points covered
- EV charging station locations
- EV charging density

---

## 15. USDA Food Access Research Atlas

- **Source:** `https://www.ers.usda.gov/data-products/food-access-research-atlas/`
- **Format:** CSV download
- **Cadence:** every few years

### Data points covered
- Food desert classification (tract-level)

---

## 16. EPA Envirofacts

- **Endpoint:** `https://www.epa.gov/enviro/envirofacts-data-service-api`
- **Auth:** none
- **Cadence:** rolling
- **Covers:** Superfund sites, brownfields, hazardous waste sites

### Data points covered
- Proximity to industrial/superfund sites

---

## 17. SF Planning + SF Public Works (additional)

Some SF data lives outside DataSF on agency portals.

- **SF Planning GIS:** `https://sfplanninggis.org/`
- **SF Public Works data hub:** `https://data.sfgov.org` mostly but some on `sfpublicworks.org`
- **SFMTA:** `https://www.sfmta.com/reports/data-and-reports`

### Data points covered
- Zoning shapefile (most current)
- Sidewalk inventory
- SFMTA bicycle network (current)
- Commuter shuttle stops (P3)

---

## 18. TIGER/Line (Census Geographies)

The geometry backbone.

- **Endpoint:** `https://www2.census.gov/geo/tiger/TIGER2024/`
- **Auth:** none
- **Cadence:** annual minor updates, major every 10yr
- **Format:** shapefile

### What you actually need (one-time download)
- Census tracts (CA)
- Census block groups (CA)
- Census blocks (CA — large file)
- Places (incorporated cities)
- Roads (segments)
- ZCTAs (ZIP-equivalent)

---

# Source Inventory Summary

| # | Source | Auth | Cadence | P1 Data Points |
|---|--------|------|---------|----------------|
| 1 | Census ACS | free key | annual | ~40 |
| 2 | DataSF (Socrata) | free token | varies (daily for most) | ~25 |
| 3 | OpenStreetMap | none | continuous | ~10 |
| 4 | GTFS (511.org) | free key | static weekly, RT live | ~8 |
| 5 | FEMA NFHL | none | infrequent | 1 |
| 6 | CAL FIRE FHSZ | none | infrequent | 1 |
| 7 | USGS / CGS | none | rare | 3 |
| 8 | NOAA SLR + Climate | free token | infrequent | 2 |
| 9 | EPA AirNow | free key | hourly | 3 |
| 10 | CDC PLACES + USALEEP | free token | annual | 2 |
| 11 | CMS Hospital Compare | none | quarterly | 1 |
| 12 | LEHD LODES | none | annual | 3 |
| 13 | CA Dept of Education | none | annual | ~4 |
| 14 | NREL AFDC | free key | daily | 1 |
| 15 | USDA Food Atlas | none | infrequent | 1 |
| 16 | EPA Envirofacts | none | rolling | 1 |
| 17 | SF Planning / SFMTA | none | varies | ~2 |
| 18 | TIGER/Line | none | annual | (geometry only) |

**18 distinct sources, ~75 P1 data points, $0/month in costs.**

---

# Ingestion patterns (preview)

These 18 sources collapse into ~5 distinct pipeline patterns:

### Pattern A: Annual CSV/JSON snapshot
ACS, LEHD, CDC PLACES, USDA Food Atlas, USALEEP, CA DOE
- Download once a year, replace existing data, version with effective date
- Simplest pipeline. Cron job, one big SQL `COPY`.

### Pattern B: Daily event stream via Socrata
DataSF crime, 311, permits, fire/EMS, parking tickets
- Incremental pull using `:updated_at` watermark
- Append-only events table; rebuild rolling aggregates downstream

### Pattern C: Periodic API poll
EPA AirNow (hourly), NREL AFDC (daily), CMS (quarterly)
- Scheduled poll → upsert into time-series table

### Pattern D: One-time geometry import
TIGER, FEMA NFHL, CAL FIRE FHSZ, USGS/CGS hazard zones, SF zoning, sea level rise, USGS DEM
- Download once, import to PostGIS, refresh maybe annually
- These are the spatial "static layers"

### Pattern E: OSM + transit specialized
OSM (osm2pgsql), GTFS (gtfsdb / custom), OTP graph builds
- Each has its own tooling — not custom pipelines, use existing tools

**5 pipeline patterns + 18 sources + 1 schema = the v1 ingestion infrastructure.**
