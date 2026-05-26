# ADR 0002: Deploy on Railway

**Status:** Accepted
**Date:** 2026-05-25
**Deciders:** Om

## Context

This project will need to deploy:
- Long-running Python workers for data ingestion (scheduled cron + occasional one-off backfills)
- A Node.js/TypeScript API service
- Eventually, more services (intelligence layer, possibly a routing engine)

The database is on Supabase (decided separately). The question is where the application code runs.

Constraints:
- Solo developer; operational simplicity matters more than ultimate flexibility
- Multi-language support (Python + Node.js) without painful workarounds
- Reasonable cost at low-to-moderate scale (no surprise bills at $1k/month for early-stage usage)
- Cron / scheduled jobs as a first-class concept
- Can deploy from a monorepo without contortions

## Decision

Use Railway as the primary deployment target for all application services.

## Options considered

### Option 1: Railway

**Pros:**
- First-class support for both Python and Node.js
- Cron jobs as a primitive
- Monorepo deployment via configurable build/start commands per service
- Reasonable pricing (~$5/service/month base, usage-based above that)
- Simple Postgres add-on if we ever leave Supabase
- Good DX for solo developers

**Cons:**
- Smaller ecosystem than Fly.io or Render
- Newer, less battle-tested at very large scale (not an issue at our stage)
- No edge / global distribution (also not needed at our stage)

### Option 2: Fly.io

**Pros:**
- Mature, well-known
- Global edge deployment
- Good for stateful services

**Cons:**
- More configuration overhead (fly.toml per service, machines model)
- Cron is via a separate mechanism (machines + scheduled triggers) — clunkier
- Better for use cases where global distribution matters (not ours)

### Option 3: Render

**Pros:**
- Similar to Railway in DX
- Free tier for hobby projects

**Cons:**
- Free tier limitations (services sleep, cold starts) are painful for ingestion workers
- Pricing scales less predictably than Railway
- Cron requires separate configuration

### Option 4: Supabase Edge Functions only

**Pros:**
- Already using Supabase
- One vendor, one bill
- Cron supported (Supabase Cron)

**Cons:**
- Deno runtime only — works for the API, doesn't fit Python ingestion
- Edge functions have execution time limits unfriendly to large backfills
- Would force us into Deno for everything or split deployment across vendors anyway

### Option 5: Self-hosted (VPS like Hetzner, DigitalOcean)

**Pros:**
- Cheapest at scale
- Full control

**Cons:**
- Operational burden (patching, monitoring, deployment automation) that doesn't pay back at a solo project at this stage
- Time better spent on the actual product

## Why this option

Railway hits the sweet spot for this project: solo-dev friendly, multi-language, cron support, monorepo support, and pricing that doesn't bite at our scale. The trade-off (smaller ecosystem, no edge) doesn't matter for an early-stage data infrastructure project.

## Consequences

- All application services deploy to Railway.
- Each `packages/*` service has its own `railway.toml` (or Railway service config) defining build/start commands.
- Cron-scheduled ingestion jobs are configured as Railway cron services, not via a separate scheduler.
- Environment variables managed in Railway dashboard (with `.env.example` as the documentation source of truth).
- CI/CD: GitHub Actions builds and tests; Railway watches GitHub for deploys on `main` (post-merge).
- Database stays on Supabase. The connection string is one of the Railway env vars.

## Revisit when

- Multi-region deployment becomes a real need (move to Fly.io)
- Costs exceed ~$200/month and the breakdown suggests self-hosting would save meaningfully
- Railway's roadmap diverges from our needs (e.g., they deprecate cron, drop Python support)
