# Data Point Taxonomy — Tagged

**Feasibility tiers:**
- 🟢 **F1** — free, public, well-documented API/dataset
- 🟡 **F2** — paid but affordable (~<$500/mo SF-only)
- 🟠 **F3** — expensive ($500+/mo) OR free-but-significant-scraping
- 🔴 **F4** — hard: scrape-at-scale, ML inference, partnerships, or doesn't cleanly exist

**Priority tiers:**
- ⭐ **P1** — must-have for v1 credible API
- ⭐⭐ **P2** — depth pass after v1
- ⭐⭐⭐ **P3** — aspirational / experimental

---

## 1. People (Demographics)

### Population structure
- Total population — 🟢 F1 / ⭐ P1 *(ACS)*
- Population density — 🟢 F1 / ⭐ P1 *(ACS + tract area)*
- Household count — 🟢 F1 / ⭐ P1
- Average household size — 🟢 F1 / ⭐ P1
- Population growth rate (yoy, 5yr) — 🟢 F1 / ⭐ P1 *(ACS time series)*
- Daytime vs nighttime population ratio — 🟡 F2 / ⭐⭐ P2 *(LEHD LODES is free but messy; SafeGraph cleaner but paid)*

### Age composition
- Median age — 🟢 F1 / ⭐ P1
- % under 5, 5–17, 18–24, 25–34, 35–44, 45–54, 55–64, 65–74, 75+ — 🟢 F1 / ⭐ P1 *(all from ACS B01001)*
- Dependency ratio — 🟢 F1 / ⭐⭐ P2 *(derived)*

### Household composition
- % single-person households — 🟢 F1 / ⭐ P1
- % married couples with kids — 🟢 F1 / ⭐ P1
- % married couples without kids — 🟢 F1 / ⭐⭐ P2
- % single parents — 🟢 F1 / ⭐⭐ P2
- % roommate/unrelated adult households — 🟢 F1 / ⭐⭐ P2
- % multigenerational households — 🟢 F1 / ⭐⭐⭐ P3
- Avg children per household — 🟢 F1 / ⭐⭐ P2
- % households with kids under 18 — 🟢 F1 / ⭐ P1

### Race & ethnicity
- Racial composition % — 🟢 F1 / ⭐ P1
- Diversity index — 🟢 F1 / ⭐ P1 *(derived from racial comp)*
- Foreign-born % — 🟢 F1 / ⭐ P1
- Top countries of origin — 🟢 F1 / ⭐⭐ P2
- Recent immigrant % (last 5yr) — 🟢 F1 / ⭐⭐ P2

### Language
- % English only at home — 🟢 F1 / ⭐⭐ P2
- % Spanish at home — 🟢 F1 / ⭐⭐ P2
- % Chinese at home — 🟢 F1 / ⭐⭐ P2
- % other top languages — 🟢 F1 / ⭐⭐ P2
- % limited English proficiency — 🟢 F1 / ⭐⭐ P2

### Education
- % no high school diploma — 🟢 F1 / ⭐⭐ P2
- % high school grad — 🟢 F1 / ⭐⭐ P2
- % some college — 🟢 F1 / ⭐⭐ P2
- % bachelor's degree — 🟢 F1 / ⭐ P1 *(strong correlate of neighborhood character)*
- % graduate/professional degree — 🟢 F1 / ⭐ P1
- % currently enrolled in college — 🟢 F1 / ⭐⭐ P2
- School-age population — 🟢 F1 / ⭐⭐ P2

---

## 2. Economics

### Income
- Median household income — 🟢 F1 / ⭐ P1
- Mean household income — 🟢 F1 / ⭐⭐ P2
- Median individual income — 🟢 F1 / ⭐⭐ P2
- Income distribution by bracket — 🟢 F1 / ⭐ P1
- Gini coefficient — 🟢 F1 / ⭐⭐ P2
- Per capita income — 🟢 F1 / ⭐⭐ P2

### Employment
- Unemployment rate — 🟢 F1 / ⭐ P1 *(BLS LAUS county, ACS tract)*
- Labor force participation rate — 🟢 F1 / ⭐⭐ P2
- % employed full-time — 🟢 F1 / ⭐⭐ P2
- % self-employed — 🟢 F1 / ⭐⭐ P2
- % gig/1099 workers — 🔴 F4 / ⭐⭐⭐ P3 *(no clean source)*
- % work from home — 🟢 F1 / ⭐ P1 *(ACS, post-COVID highly relevant)*
- % work in same tract — 🟢 F1 / ⭐⭐ P2 *(LEHD LODES)*
- Commute outflow patterns — 🟢 F1 / ⭐⭐ P2 *(LEHD LODES OD)*
- Commute inflow patterns — 🟢 F1 / ⭐⭐ P2 *(LEHD LODES OD)*

### Occupation & industry
- Top occupations by % — 🟢 F1 / ⭐⭐ P2
- Top industries by % — 🟢 F1 / ⭐⭐ P2
- % in tech — 🟢 F1 / ⭐⭐ P2 *(NAICS 51, 54)*
- % in healthcare — 🟢 F1 / ⭐⭐ P2
- % in finance — 🟢 F1 / ⭐⭐ P2
- % in service industry — 🟢 F1 / ⭐⭐ P2
- % in education — 🟢 F1 / ⭐⭐⭐ P3
- % in government — 🟢 F1 / ⭐⭐⭐ P3

### Poverty
- % below federal poverty line — 🟢 F1 / ⭐ P1
- % below 200% poverty line — 🟢 F1 / ⭐⭐ P2
- Child poverty rate — 🟢 F1 / ⭐⭐ P2
- Senior poverty rate — 🟢 F1 / ⭐⭐⭐ P3
- % receiving SNAP — 🟢 F1 / ⭐⭐ P2
- % receiving public assistance — 🟢 F1 / ⭐⭐⭐ P3

---

## 3. Housing

### Stock
- Total housing units — 🟢 F1 / ⭐ P1
- Housing unit density — 🟢 F1 / ⭐ P1
- % owner-occupied — 🟢 F1 / ⭐ P1
- % renter-occupied — 🟢 F1 / ⭐ P1
- % vacant — 🟢 F1 / ⭐ P1
- Vacancy rate — 🟢 F1 / ⭐ P1
- Year built distribution — 🟢 F1 / ⭐⭐ P2
- Median year built — 🟢 F1 / ⭐⭐ P2
- % single-family detached — 🟢 F1 / ⭐ P1
- % single-family attached (townhome) — 🟢 F1 / ⭐⭐ P2
- % small multifamily (2-4 units) — 🟢 F1 / ⭐⭐ P2
- % mid-rise (5-19 units) — 🟢 F1 / ⭐⭐ P2
- % high-rise (20+ units) — 🟢 F1 / ⭐⭐ P2
- Avg units per residential building — 🟢 F1 / ⭐⭐ P2 *(SF parcel data)*

### Values & costs
- Median home value (ACS estimate) — 🟢 F1 / ⭐ P1
- Median home value yoy change — 🟢 F1 / ⭐ P1 *(derived)*
- Median list price — 🟠 F3 / ⭐ P1 *(Zillow free Zestimate-derived datasets / Redfin / Realtor.com — scraping or paid)*
- Median sale price — 🟡 F2 / ⭐ P1 *(SF assessor records free; aggregation paid via Zillow/Redfin)*
- Price per sqft — 🟡 F2 / ⭐ P1
- Median days on market — 🟠 F3 / ⭐ P1 *(MLS-derived, paid)*
- Sale-to-list price ratio — 🟠 F3 / ⭐⭐ P2
- Median rent (asking) by bedroom — 🟠 F3 / ⭐ P1 *(Zillow ZORI free at city, granular paid; Apartment List / RentCafe)*
- Median rent (paid) — 🟢 F1 / ⭐ P1 *(ACS)*
- Rent yoy change — 🟢 F1 / ⭐ P1
- % income spent on housing — 🟢 F1 / ⭐ P1
- % cost-burdened renters — 🟢 F1 / ⭐⭐ P2
- % severely cost-burdened — 🟢 F1 / ⭐⭐ P2

### Market dynamics
- Inventory (active listings) — 🟠 F3 / ⭐⭐ P2
- New listings rate — 🟠 F3 / ⭐⭐ P2
- Pending sales rate — 🟠 F3 / ⭐⭐⭐ P3
- Price reduction rate — 🟠 F3 / ⭐⭐⭐ P3
- Foreclosure rate — 🟡 F2 / ⭐⭐ P2 *(SF assessor + court records)*
- Tax delinquency rate — 🟢 F1 / ⭐⭐⭐ P3 *(SF assessor)*

### Construction & development
- Building permits issued — 🟢 F1 / ⭐ P1 *(DataSF: SF planning permits)*
- New construction units in pipeline — 🟢 F1 / ⭐⭐ P2 *(SF Pipeline report)*
- Demolition permits — 🟢 F1 / ⭐⭐ P2
- Major projects under construction — 🟢 F1 / ⭐⭐ P2
- Planned developments — 🟢 F1 / ⭐⭐ P2
- Recent rezoning activity — 🟢 F1 / ⭐⭐⭐ P3

---

## 4. Safety

### Crime — incidents
- Total reported crimes — 🟢 F1 / ⭐ P1 *(SFPD Incident Reports on DataSF, daily)*
- Violent crimes total — 🟢 F1 / ⭐ P1
- Property crimes total — 🟢 F1 / ⭐ P1
- Homicide — 🟢 F1 / ⭐ P1
- Shooting (non-fatal) — 🟢 F1 / ⭐⭐ P2
- Robbery (street/commercial/residential) — 🟢 F1 / ⭐ P1
- Assault (aggravated, simple) — 🟢 F1 / ⭐ P1
- Sexual assault — 🟢 F1 / ⭐⭐ P2
- Burglary (residential, commercial) — 🟢 F1 / ⭐ P1
- Larceny/theft from person — 🟢 F1 / ⭐ P1
- Theft from vehicle — 🟢 F1 / ⭐ P1 *(SF's signature crime, very high signal)*
- Motor vehicle theft — 🟢 F1 / ⭐ P1
- Bike theft — 🟢 F1 / ⭐⭐ P2
- Vandalism — 🟢 F1 / ⭐⭐ P2
- Arson — 🟢 F1 / ⭐⭐ P2
- Drug offenses — 🟢 F1 / ⭐⭐ P2
- DUI — 🟢 F1 / ⭐⭐⭐ P3
- Weapons offenses — 🟢 F1 / ⭐⭐ P2
- Domestic violence calls — 🟢 F1 / ⭐⭐ P2
- Hate crimes — 🟢 F1 / ⭐⭐ P2

### Crime — derived metrics
- Crime rate per 1k residents (overall, violent, property) rolling 30/90/365d — 🟢 F1 / ⭐ P1 *(derived)*
- Crime rate per 1k daytime population — 🟡 F2 / ⭐⭐ P2 *(needs daytime pop data)*
- Crime rate yoy change — 🟢 F1 / ⭐ P1 *(derived)*
- Time-of-day distribution — 🟢 F1 / ⭐⭐ P2 *(derived)*
- Day-of-week distribution — 🟢 F1 / ⭐⭐ P2 *(derived)*
- Seasonal pattern — 🟢 F1 / ⭐⭐⭐ P3
- Clearance rate — 🟠 F3 / ⭐⭐⭐ P3 *(SFPD reporting, inconsistent)*

### Emergency response
- 911 call volume — 🟢 F1 / ⭐⭐ P2 *(SF Fire/EMS dispatch on DataSF)*
- Police response times — 🟡 F2 / ⭐⭐⭐ P3 *(SFPD publishes, inconsistent)*
- Fire response times — 🟢 F1 / ⭐⭐ P2
- EMS response times — 🟢 F1 / ⭐⭐ P2
- Nearest police station distance — 🟢 F1 / ⭐⭐ P2 *(SF facilities GIS)*
- Nearest fire station distance — 🟢 F1 / ⭐⭐ P2
- Nearest hospital/ER distance — 🟢 F1 / ⭐ P1

### Perceived safety signals
- 311 safety-related calls (lighting, encampments) — 🟢 F1 / ⭐ P1 *(SF 311 on DataSF, very high signal in SF)*
- Street lighting density — 🟢 F1 / ⭐⭐ P2 *(SF Streetlight inventory)*
- Security camera coverage — 🔴 F4 / ⭐⭐⭐ P3
- Nextdoor/Citizen incident density — 🔴 F4 / ⭐⭐⭐ P3 *(scrape, ToS risk)*
- Pedestrian/cyclist injuries — 🟢 F1 / ⭐ P1 *(SF Vision Zero, TIMS)*
- Traffic fatalities — 🟢 F1 / ⭐ P1

### Fire & natural hazards
- Structure fire incidents — 🟢 F1 / ⭐⭐ P2
- Wildfire risk zone — 🟢 F1 / ⭐ P1 *(CAL FIRE FHSZ)*
- Earthquake liquefaction risk — 🟢 F1 / ⭐ P1 *(CGS / USGS)*
- Earthquake landslide risk — 🟢 F1 / ⭐⭐ P2
- Flood zone — 🟢 F1 / ⭐ P1 *(FEMA NFHL)*
- Sea level rise exposure — 🟢 F1 / ⭐ P1 *(NOAA SLR viewer data)*
- Tsunami inundation zone — 🟢 F1 / ⭐⭐ P2 *(CGS)*

---

## 5. Mobility & Connectivity

### Transit access
- Nearest bus stop distance — 🟢 F1 / ⭐ P1 *(GTFS — SFMTA, BART, Caltrain)*
- Nearest rail/metro station distance — 🟢 F1 / ⭐ P1
- Transit stop density — 🟢 F1 / ⭐ P1
- Transit lines within 0.5mi — 🟢 F1 / ⭐ P1
- Bus frequency (peak, off-peak, weekend) — 🟢 F1 / ⭐ P1 *(derived from GTFS)*
- Rail frequency — 🟢 F1 / ⭐ P1
- Transit reliability — 🟡 F2 / ⭐⭐ P2 *(GTFS-RT historical, requires storage)*
- Nighttime transit availability — 🟢 F1 / ⭐ P1
- Transit accessibility score — 🟢 F1 / ⭐ P1 *(derived; Conveyal/r5/OTP open source — routing engine deferred to v2 per ADR 0003; v1 ships GTFS-derived proxies)*

### Transit destinations
*(Real travel times need a routing engine — deferred to v2 per ADR 0003. v1 ships GTFS-derived proxies (stop density, frequency, lines within radius); tags below describe feasibility, not the v1 cut.)*
- Transit time to downtown SF — 🟢 F1 / ⭐ P1 *(OTP or Google Distance Matrix free tier)*
- Transit time to nearest major job center — 🟢 F1 / ⭐ P1
- Transit time to nearest hospital — 🟢 F1 / ⭐⭐ P2
- Transit time to SFO — 🟢 F1 / ⭐ P1
- % jobs reachable within 30/45/60 min by transit — 🟢 F1 / ⭐⭐ P2 *(accessibility analysis)*
- % jobs reachable by car — 🟢 F1 / ⭐⭐ P2

### Driving & parking
- Avg driving time to downtown (peak, off-peak) — 🟡 F2 / ⭐⭐ P2 *(Google/Mapbox/HERE Distance Matrix)*
- Congestion index — 🟠 F3 / ⭐⭐⭐ P3 *(TomTom/INRIX paid)*
- Traffic speed by hour — 🟠 F3 / ⭐⭐⭐ P3
- On-street parking availability — 🟢 F1 / ⭐⭐ P2 *(SFMTA SFpark data)*
- Off-street parking lot density — 🟢 F1 / ⭐⭐⭐ P3
- Parking ticket density — 🟢 F1 / ⭐⭐ P2 *(SF DataSF — proxy for parking difficulty)*
- Garage availability (SFR %) — 🟢 F1 / ⭐⭐⭐ P3 *(SF assessor)*

### Walking
- Walk Score — 🟡 F2 / ⭐ P1 *(Walk Score API, paid)*
- Intersection density — 🟢 F1 / ⭐ P1 *(OSM derived)*
- Sidewalk coverage % — 🟢 F1 / ⭐⭐ P2 *(SF Public Works GIS)*
- Sidewalk quality / complaints — 🟢 F1 / ⭐⭐ P2 *(311)*
- Pedestrian crossing density — 🟢 F1 / ⭐⭐ P2 *(OSM)*
- Avg block length — 🟢 F1 / ⭐⭐ P2 *(OSM derived)*
- Walkable amenities within 0.25/0.5/1mi — 🟢 F1 / ⭐ P1 *(OSM + places data)*

### Cycling
- Bike Score — 🟡 F2 / ⭐⭐ P2 *(Walk Score family API)*
- Bike lane mileage within 0.5mi — 🟢 F1 / ⭐ P1 *(OSM + SFMTA)*
- Protected vs unprotected bike lane ratio — 🟢 F1 / ⭐⭐ P2
- Bike share station density — 🟢 F1 / ⭐⭐ P2 *(GBFS — Bay Wheels feed)*
- Bike share availability (real-time) — 🟢 F1 / ⭐⭐⭐ P3 *(GBFS real-time)*
- Bike theft rate — 🟢 F1 / ⭐⭐ P2 *(overlap with crime)*
- Elevation/hilliness — 🟢 F1 / ⭐ P1 *(USGS DEM, MAJOR in SF)*
- Bike network connectivity score — 🟢 F1 / ⭐⭐ P2

### Micromobility & rideshare
- Scooter/e-bike availability — 🟡 F2 / ⭐⭐⭐ P3 *(MDS data, SF requires operators to share)*
- Avg Uber/Lyft wait time — 🔴 F4 / ⭐⭐⭐ P3 *(no public source)*
- Avg Uber/Lyft price — 🔴 F4 / ⭐⭐⭐ P3

### Airport access
*(Transit-time entries here are routing-engine-dependent — deferred to v2 per ADR 0003, same as Transit destinations above.)*
- Drive time to SFO — 🟢 F1 / ⭐ P1
- Drive time to OAK — 🟢 F1 / ⭐⭐ P2
- Transit time to SFO — 🟢 F1 / ⭐ P1
- Transit time to OAK — 🟢 F1 / ⭐⭐ P2

---

## 6. Amenities — Food & Drink

### Density & variety
- Restaurant count within 0.25/0.5/1mi — 🟢 F1 / ⭐ P1 *(OSM) or 🟡 F2 (Google Places / Foursquare for completeness)*
- Restaurants per 1k residents — 🟢 F1 / ⭐ P1
- Cafe count — 🟢 F1 / ⭐ P1
- Coffee shop density — 🟢 F1 / ⭐ P1
- Bar count — 🟢 F1 / ⭐ P1
- Bar density per 1k residents — 🟢 F1 / ⭐ P1 *(nightlife proxy)*
- Grocery store count — 🟢 F1 / ⭐ P1
- Specialty grocery (Whole Foods, TJ's) — 🟡 F2 / ⭐⭐ P2 *(places API)*
- Ethnic/specialty market count — 🟡 F2 / ⭐⭐ P2
- Farmers market presence + frequency — 🟢 F1 / ⭐⭐ P2
- Bakery count — 🟢 F1 / ⭐⭐ P2
- Convenience store count — 🟢 F1 / ⭐⭐ P2
- Liquor store density — 🟢 F1 / ⭐⭐ P2

### Quality
- Avg rating of restaurants — 🟡 F2 / ⭐ P1 *(Google Places API paid, Yelp Fusion is rate-limited free)*
- Median price tier — 🟡 F2 / ⭐ P1
- Michelin-rated restaurants — 🟢 F1 / ⭐⭐ P2 *(scrape Michelin guide)*
- James Beard recognition — 🟢 F1 / ⭐⭐⭐ P3
- Top-rated restaurants (4.5+) — 🟡 F2 / ⭐ P1
- New restaurant openings (last 12mo) — 🟢 F1 / ⭐⭐ P2 *(SF business registration data)*
- Restaurant closures (last 12mo) — 🟢 F1 / ⭐⭐ P2
- Restaurant churn rate — 🟢 F1 / ⭐⭐ P2

### Cuisine variety
- Distinct cuisines within 0.5/1mi — 🟡 F2 / ⭐ P1 *(Yelp/Google categories)*
- Cuisine diversity index — 🟡 F2 / ⭐⭐ P2 *(derived)*
- Specific cuisine counts (15+ types) — 🟡 F2 / ⭐⭐ P2

### Food access
- Food desert classification — 🟢 F1 / ⭐⭐ P2 *(USDA Food Access Research Atlas)*
- Distance to nearest grocery — 🟢 F1 / ⭐ P1
- % residents within 0.5mi of grocery — 🟢 F1 / ⭐⭐ P2
- Restaurant inspection scores — 🟢 F1 / ⭐⭐ P2 *(SF DPH on DataSF)*

---

## 7. Amenities — Retail & Services

- Retail establishment density — 🟢 F1 / ⭐ P1 *(SF business registration)*
- Pharmacy count + proximity — 🟢 F1 / ⭐ P1
- Bank/ATM density — 🟢 F1 / ⭐⭐ P2
- Post office proximity — 🟢 F1 / ⭐⭐⭐ P3
- Dry cleaner density — 🟢 F1 / ⭐⭐⭐ P3
- Hardware store proximity — 🟢 F1 / ⭐⭐ P2
- Bookstore count — 🟢 F1 / ⭐⭐ P2
- Thrift/vintage store density — 🟢 F1 / ⭐⭐⭐ P3
- Big-box retail proximity — 🟢 F1 / ⭐⭐ P2
- Shopping mall/center proximity — 🟢 F1 / ⭐⭐ P2
- Gas station density — 🟢 F1 / ⭐⭐ P2
- EV charging station density — 🟢 F1 / ⭐⭐ P2 *(NREL AFDC, free API)*
- Car wash count — 🟢 F1 / ⭐⭐⭐ P3
- Veterinary services proximity — 🟢 F1 / ⭐⭐ P2
- Pet store count — 🟢 F1 / ⭐⭐⭐ P3
- Hair salon / barber density — 🟢 F1 / ⭐⭐⭐ P3

---

## 8. Amenities — Health & Wellness

### Healthcare
- Hospital proximity + rating — 🟢 F1 / ⭐ P1 *(CMS Hospital Compare)*
- Urgent care proximity — 🟢 F1 / ⭐ P1
- Primary care provider density — 🟡 F2 / ⭐⭐ P2 *(HRSA + NPI registry)*
- Specialist density — 🟡 F2 / ⭐⭐ P2
- Dental care density — 🟡 F2 / ⭐⭐ P2
- Mental health provider density — 🟡 F2 / ⭐⭐ P2

### Fitness & wellness
- Gym/fitness studio count — 🟢 F1 / ⭐ P1
- Yoga/pilates studio count — 🟢 F1 / ⭐⭐ P2
- Climbing gym count — 🟢 F1 / ⭐⭐⭐ P3
- Public pool proximity — 🟢 F1 / ⭐⭐ P2 *(SF Rec & Parks)*
- Spa count — 🟢 F1 / ⭐⭐⭐ P3
- Juice/health-food spot density — 🟢 F1 / ⭐⭐⭐ P3

### Public health indicators
- AQI (PM2.5, ozone, NO2) — 🟢 F1 / ⭐ P1 *(EPA AirNow, BAAQMD; F1 at station resolution — PurpleAir densification is 🟡 F2, the one paid v1 source, see ADR 0003)*
- Avg AQI yearly — 🟢 F1 / ⭐ P1
- Days exceeding "good" AQI — 🟢 F1 / ⭐ P1
- Noise pollution levels — 🟡 F2 / ⭐⭐ P2 *(BTS National Transportation Noise Map; SF-specific modeling)*
- Water quality reports — 🟢 F1 / ⭐⭐⭐ P3 *(SFPUC)*
- Proximity to industrial/superfund sites — 🟢 F1 / ⭐⭐ P2 *(EPA Envirofacts)*
- Asthma rate — 🟢 F1 / ⭐⭐ P2 *(CDC PLACES, tract-level)*
- Life expectancy — 🟢 F1 / ⭐ P1 *(CDC USALEEP, tract-level)*
- Obesity rate — 🟢 F1 / ⭐⭐ P2 *(CDC PLACES)*
- Smoking rate — 🟢 F1 / ⭐⭐⭐ P3 *(CDC PLACES)*

---

## 9. Amenities — Recreation & Green Space

- Park count within 0.25/0.5/1mi — 🟢 F1 / ⭐ P1 *(SF Rec & Parks GIS)*
- Park acreage per capita — 🟢 F1 / ⭐ P1
- Distance to nearest park — 🟢 F1 / ⭐ P1
- Distance to nearest large park — 🟢 F1 / ⭐⭐ P2
- % land area as parks — 🟢 F1 / ⭐ P1
- Tree canopy coverage % — 🟢 F1 / ⭐ P1 *(USFS Tree Canopy / SF Urban Forest)*
- Playground count — 🟢 F1 / ⭐⭐ P2
- Dog park count — 🟢 F1 / ⭐⭐ P2
- Sports field availability — 🟢 F1 / ⭐⭐⭐ P3
- Public tennis/basketball/pickleball courts — 🟢 F1 / ⭐⭐ P2
- Beach proximity — 🟢 F1 / ⭐⭐ P2
- Trail mileage within 1mi — 🟢 F1 / ⭐⭐ P2
- Waterfront access — 🟢 F1 / ⭐⭐ P2
- Community garden count — 🟢 F1 / ⭐⭐⭐ P3
- Public art / mural density — 🟢 F1 / ⭐⭐⭐ P3 *(SF Arts Commission, partial OSM)*

---

## 10. Culture & Social Life

### Entertainment venues
- Movie theater count — 🟢 F1 / ⭐⭐ P2
- Live music venue density — 🟢 F1 / ⭐ P1 *(important for "vibe")*
- Comedy club count — 🟢 F1 / ⭐⭐⭐ P3
- Theater (performing arts) count — 🟢 F1 / ⭐⭐ P2
- Museum count — 🟢 F1 / ⭐⭐ P2
- Art gallery density — 🟢 F1 / ⭐⭐ P2
- Nightclub density — 🟢 F1 / ⭐ P1
- Karaoke / arcade / entertainment venue — 🟢 F1 / ⭐⭐⭐ P3

### Cultural infrastructure
- Public library count + proximity — 🟢 F1 / ⭐⭐ P2 *(SFPL)*
- Library hours (evening, weekend) — 🟢 F1 / ⭐⭐⭐ P3
- Religious institution density — 🟢 F1 / ⭐⭐⭐ P3
- Community center count — 🟢 F1 / ⭐⭐ P2

### Events & vibrancy
- Recurring event count — 🟠 F3 / ⭐⭐⭐ P3 *(Eventbrite/Meetup scraping)*
- Festival/event frequency annually — 🟠 F3 / ⭐⭐⭐ P3
- Street fair / farmers market frequency — 🟢 F1 / ⭐⭐ P2
- Film shoot permits — 🟢 F1 / ⭐⭐⭐ P3 *(SF Film Commission)*

### Nightlife intensity
- % bars open past midnight — 🟡 F2 / ⭐⭐ P2 *(ABC license data + Yelp hours)*
- 2am license density — 🟢 F1 / ⭐⭐ P2 *(CA ABC public data)*
- Noise complaints — 🟢 F1 / ⭐ P1 *(311, very high signal)*
- Nighttime foot traffic — 🟠 F3 / ⭐⭐⭐ P3 *(SafeGraph/Placer.ai paid)*
- 24-hour establishment count — 🟢 F1 / ⭐⭐⭐ P3

---

## 11. Education

### K-12
- Public elementary proximity + ratings — 🟢 F1 / ⭐ P1 *(GreatSchools free tier limited; CDE free for raw data)*
- Public middle school proximity + ratings — 🟢 F1 / ⭐ P1
- Public high school proximity + ratings — 🟢 F1 / ⭐ P1
- School district boundaries + rating — 🟢 F1 / ⭐ P1 *(SF has SFUSD lottery system — boundaries less determinative)*
- Private school count + ratings — 🟢 F1 / ⭐⭐ P2 *(NCES Private School Survey)*
- Charter school presence — 🟢 F1 / ⭐⭐ P2
- School enrollment / capacity ratios — 🟢 F1 / ⭐⭐⭐ P3
- Avg test scores — 🟢 F1 / ⭐⭐ P2 *(CA Smarter Balanced)*
- Avg class size — 🟢 F1 / ⭐⭐⭐ P3
- Per-pupil spending — 🟢 F1 / ⭐⭐⭐ P3
- Graduation rates — 🟢 F1 / ⭐⭐ P2
- College-going rates — 🟢 F1 / ⭐⭐⭐ P3

### Early childhood
- Daycare/preschool count + ratings — 🟡 F2 / ⭐⭐ P2 *(CA licensing data free, ratings via scrape)*
- Daycare cost (median) — 🔴 F4 / ⭐⭐⭐ P3
- Waitlist proxies — 🔴 F4 / ⭐⭐⭐ P3

### Higher education
- University/college proximity — 🟢 F1 / ⭐⭐ P2
- Community college proximity — 🟢 F1 / ⭐⭐ P2
- Adult education availability — 🟢 F1 / ⭐⭐⭐ P3

---

## 12. Family & Kids
*(Most overlap with other dimensions; kept thin)*
- Family-with-kids density — 🟢 F1 / ⭐ P1 *(overlap, demographics)*
- Playground density — 🟢 F1 / ⭐⭐ P2
- Kid-friendly restaurant density — 🟠 F3 / ⭐⭐⭐ P3 *(requires categorization)*
- Pediatrician density — 🟡 F2 / ⭐⭐ P2
- Youth program availability — 🟢 F1 / ⭐⭐⭐ P3
- Children's museum proximity — 🟢 F1 / ⭐⭐⭐ P3
- Family activity venue count — 🟢 F1 / ⭐⭐⭐ P3

---

## 13. Environment & Climate

### Air
*(F1 tags here reflect EPA AirNow at station resolution. PurpleAir densification is 🟡 F2 — no longer free; included in v1 as the one paid source per ADR 0003.)*
- AQI daily/annual — 🟢 F1 / ⭐ P1
- PM2.5 levels — 🟢 F1 / ⭐ P1
- NO2 levels — 🟢 F1 / ⭐⭐ P2
- Ozone — 🟢 F1 / ⭐⭐ P2
- Proximity to freeways — 🟢 F1 / ⭐ P1
- Proximity to industrial polluters — 🟢 F1 / ⭐⭐ P2

### Noise
- Noise complaint density — 🟢 F1 / ⭐ P1 *(311)*
- Traffic noise modeled — 🟡 F2 / ⭐⭐ P2
- Airport flight path exposure — 🟢 F1 / ⭐⭐ P2 *(SFO noise contours)*
- Proximity to highways — 🟢 F1 / ⭐⭐ P2

### Climate (this is the SF-specific magic)
- Avg temp by month — 🟢 F1 / ⭐⭐ P2 *(NOAA stations, sparse → modeled)*
- Microclimate variation within SF — 🟠 F3 / ⭐ P1 *(MAJOR SF signal — fog/sun zones; PurpleAir + NOAA + modeled)*
- Annual sunshine hours by neighborhood — 🟠 F3 / ⭐⭐ P2 *(modeled from satellite cloud cover)*
- Fog frequency by neighborhood — 🟠 F3 / ⭐⭐ P2 *(GOES satellite + ground stations)*
- Avg wind speed by neighborhood — 🟢 F1 / ⭐⭐ P2
- Precipitation patterns — 🟢 F1 / ⭐⭐⭐ P3

### Hazards
*(See Safety §4 — already covered)*

### Sustainability
- Tree canopy % — 🟢 F1 / ⭐ P1 *(overlap)*
- Impervious surface % — 🟢 F1 / ⭐⭐ P2 *(USGS NLCD)*
- Solar potential — 🟢 F1 / ⭐⭐⭐ P3 *(NREL PVWatts)*
- Green building density — 🟡 F2 / ⭐⭐⭐ P3 *(USGBC LEED registry)*
- EV adoption rate — 🟡 F2 / ⭐⭐⭐ P3 *(CA DMV aggregates)*

---

## 14. Urban Form & Built Environment

### Zoning & land use
- Zoning classification — 🟢 F1 / ⭐ P1 *(SF Planning zoning shapefile)*
- % residential land — 🟢 F1 / ⭐ P1
- % commercial land — 🟢 F1 / ⭐ P1
- % mixed-use land — 🟢 F1 / ⭐ P1
- % industrial land — 🟢 F1 / ⭐ P1
- % open space — 🟢 F1 / ⭐ P1
- Allowed building height — 🟢 F1 / ⭐⭐ P2
- FAR limits — 🟢 F1 / ⭐⭐⭐ P3
- Recent zoning changes — 🟢 F1 / ⭐⭐⭐ P3

### Density & form
- Residential unit density — 🟢 F1 / ⭐ P1
- Commercial sqft density — 🟢 F1 / ⭐⭐ P2 *(SF assessor)*
- Jobs density — 🟢 F1 / ⭐ P1 *(LEHD LODES WAC)*
- Building footprint coverage % — 🟢 F1 / ⭐⭐ P2 *(SF building footprints + OSM)*
- Avg building height — 🟢 F1 / ⭐⭐ P2 *(SF building footprints with heights)*
- Skyline character — 🟢 F1 / ⭐⭐⭐ P3

### Street character
- Street tree density — 🟢 F1 / ⭐ P1 *(SF Urban Forest Map)*
- Street width — 🟢 F1 / ⭐⭐ P2 *(OSM)*
- One-way vs two-way % — 🟢 F1 / ⭐⭐⭐ P3 *(OSM)*
- Bike infrastructure — *(overlap with Mobility)*
- Street furniture — 🟢 F1 / ⭐⭐⭐ P3

### Condition signals (311)
- 311 by type (potholes, graffiti, trash, encampments, abandoned vehicles) — 🟢 F1 / ⭐ P1 *(MAJOR SF signal)*
- 311 resolution times — 🟢 F1 / ⭐⭐ P2
- Street cleaning frequency — 🟢 F1 / ⭐⭐ P2
- Graffiti reports — 🟢 F1 / ⭐ P1
- Illegal dumping reports — 🟢 F1 / ⭐ P1
- Encampment reports — 🟢 F1 / ⭐ P1 *(highly contested but high-signal in SF)*

---

## 15. Economic Vitality (Commercial)

- Business count by type — 🟢 F1 / ⭐ P1 *(SF Registered Business Locations on DataSF)*
- Business density — 🟢 F1 / ⭐ P1
- Business openings (last 12mo) — 🟢 F1 / ⭐ P1
- Business closures (last 12mo) — 🟢 F1 / ⭐ P1
- Business churn rate — 🟢 F1 / ⭐ P1 *(derived)*
- Avg business tenure — 🟢 F1 / ⭐⭐ P2
- Chain vs independent ratio — 🟡 F2 / ⭐⭐ P2 *(business reg + chain list matching)*
- Commercial storefront vacancy rate — 🟠 F3 / ⭐⭐ P2 *(SF Vacant Storefront Registry; partial)*
- Office occupancy rate — 🟠 F3 / ⭐⭐ P2 *(Kastle, paid)*
- Foot traffic — 🟠 F3 / ⭐⭐ P2 *(SafeGraph/Placer.ai paid)*
- Foot traffic trend yoy — 🟠 F3 / ⭐⭐ P2
- Commercial rents — 🟠 F3 / ⭐⭐⭐ P3 *(CoStar/CompStak paid+)*

---

## 16. Social Signals (Soft Layer)

- Social media mention volume — 🔴 F4 / ⭐⭐⭐ P3 *(no clean public API)*
- Venue check-in volume — 🔴 F4 / ⭐⭐⭐ P3
- Review volume (Yelp/Google) — 🟡 F2 / ⭐⭐ P2 *(places API derivative)*
- Review sentiment trends — 🟡 F2 / ⭐⭐⭐ P3 *(NLP on review text)*
- "Trending" neighborhoods — 🔴 F4 / ⭐⭐⭐ P3
- News mention frequency by neighborhood — 🟡 F2 / ⭐⭐⭐ P3 *(news APIs + NER)*
- News sentiment by neighborhood — 🟡 F2 / ⭐⭐⭐ P3
- Reddit mention volume — 🟠 F3 / ⭐⭐⭐ P3 *(Reddit API + post-2023 pricing)*
- Local subreddit / Nextdoor activity — 🔴 F4 / ⭐⭐⭐ P3

---

## 17. Accessibility & Inclusion

- ADA-compliant infrastructure — 🟢 F1 / ⭐⭐ P2 *(SF curb ramps inventory)*
- Wheelchair-accessible venues % — 🟡 F2 / ⭐⭐⭐ P3 *(Google Places attribute)*
- Senior services density — 🟢 F1 / ⭐⭐⭐ P3
- Veteran services — 🟢 F1 / ⭐⭐⭐ P3
- LGBTQ+ community indicators — 🟠 F3 / ⭐⭐⭐ P3
- Religious diversity — 🟢 F1 / ⭐⭐⭐ P3
- Multilingual service availability — 🟠 F3 / ⭐⭐⭐ P3

---

## 18. Real Estate Dynamics (Deeper)

- Property tax assessment data — 🟢 F1 / ⭐⭐ P2 *(SF Assessor)*
- Effective property tax rates — 🟢 F1 / ⭐⭐ P2
- Mello-Roos / special assessments — 🟢 F1 / ⭐⭐⭐ P3
- HOA prevalence — 🟠 F3 / ⭐⭐⭐ P3 *(not cleanly available)*
- Short-term rental density (Airbnb) — 🟠 F3 / ⭐⭐ P2 *(InsideAirbnb free, slightly dated)*
- Short-term rental regulation status — 🟢 F1 / ⭐⭐⭐ P3
- Rental application norms — 🔴 F4 / ⭐⭐⭐ P3
- Avg rental security deposit — 🔴 F4 / ⭐⭐⭐ P3

---

## 19. Civic & Governance

- Voter turnout — 🟢 F1 / ⭐⭐⭐ P3 *(SF Dept of Elections)*
- Political composition — 🟢 F1 / ⭐⭐⭐ P3
- City council/supervisor district — 🟢 F1 / ⭐⭐ P2
- Recent ballot measures + outcomes — 🟢 F1 / ⭐⭐⭐ P3
- Public meeting frequency — 🟢 F1 / ⭐⭐⭐ P3
- Civic engagement indicators — 🟢 F1 / ⭐⭐⭐ P3

---

## 20. SF-Specific / Hyperlocal

- Microclimate zone — 🟠 F3 / ⭐ P1 *(MAJOR SF differentiator)*
- Neighborhood character tags — 🟡 F2 / ⭐⭐ P2 *(derived/curated)*
- BART vs MUNI vs Caltrain access split — 🟢 F1 / ⭐ P1
- Tech shuttle stop proximity — 🟢 F1 / ⭐⭐⭐ P3 *(SFMTA Commuter Shuttle data)*
- Proximity to major employer campuses — 🟡 F2 / ⭐⭐ P2 *(curated employer list)*
- Earthquake retrofit status — 🟢 F1 / ⭐⭐ P2 *(SF soft-story program registry)*

---

## Summary tables

### By feasibility

| Tier | Count | % |
|------|-------|---|
| 🟢 F1 (free/public) | ~280 | 73% |
| 🟡 F2 (paid affordable) | ~45 | 12% |
| 🟠 F3 (expensive / scrape) | ~35 | 9% |
| 🔴 F4 (hard) | ~20 | 5% |

### By priority

| Tier | Count | What this is |
|------|-------|--------------|
| ⭐ P1 | ~85 | First credible v1 API |
| ⭐⭐ P2 | ~135 | Depth pass — broader coverage |
| ⭐⭐⭐ P3 | ~160 | Aspirational / experimental |

### P1 is dominated by free sources

Of the ~85 P1 data points: ~75 are 🟢 F1, ~7 are 🟡 F2, ~3 are 🟠 F3.

**Translation:** the v1 cut is mostly free public data. The expensive stuff (real estate listings granular, Walk Score API, microclimate modeling, foot traffic) is a small set we can decide to buy, scrape, or defer.
