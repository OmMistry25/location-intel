# ADR 0001: Use a monorepo

**Status:** Accepted
**Date:** 2026-05-25
**Deciders:** Om

## Context

This project will eventually contain multiple distinct components:
- Data ingestion pipelines (Python)
- Intelligence layer / derived metrics (Python)
- Public API (TypeScript / Node)
- Eventual frontend surfaces (TypeScript)
- Shared schemas, types, and configuration

These components are tightly coupled by design — they all operate on the same canonical schema, and changes to ingestion routinely require coordinated changes to the API and intelligence layer. We need to decide whether to organize this as one repo or multiple.

## Decision

Use a single monorepo with workspaces for each package.

## Options considered

### Option 1: Polyrepo (one repo per component)

**Pros:**
- Clean separation of concerns at the repo level
- Each component versions and deploys independently
- Granular access control
- Smaller individual repos

**Cons:**
- Cross-component changes require coordinated PRs across repos
- Tooling has to be duplicated (CI, lint, type configs) per repo
- Refactors that span components are painful
- Onboarding requires cloning multiple repos and understanding their relationships
- More overhead for a solo project

### Option 2: Monorepo

**Pros:**
- One clone, one set of tooling
- Cross-component changes happen in one PR
- Easier refactors across boundaries
- Single source of truth for shared schemas and types
- Better fit for a solo project where there are no team boundaries to enforce
- Claude Code works better with one cohesive context

**Cons:**
- Larger repo
- Less explicit boundaries — easier to accidentally couple things
- Versioning is monolithic (one version for everything) unless we set up per-package versioning explicitly

## Why this option

For a solo personal project where every component depends on a shared canonical schema, polyrepo's main benefit (independence) is a liability — we *want* the components to be co-versioned and co-deployed. Monorepo wins on developer velocity by a wide margin in this configuration.

The "less explicit boundaries" concern is real but manageable through clear package structure and lint rules that enforce dependency direction.

## Consequences

- Single repository at `<org>/location-intel` (name TBD).
- Python packages and TypeScript packages coexist under `packages/`.
- Shared docs, ADRs, and configs live at the root.
- Tooling configs (ruff, biome, tsconfig, etc.) configured at the root and inherited / overridden per package.
- CI runs as a single workflow that detects which packages changed and runs targeted checks.
- If we ever need to extract a package to its own repo, we can do that with `git subtree` or `git filter-repo` — not a one-way door.

## Revisit when

- We have a clear case for open-sourcing one component while keeping others private and the line is clean.
- The repo grows past ~5 distinct packages and the boundaries between them are getting muddled despite the structure.
- We add collaborators who only work on one component.
