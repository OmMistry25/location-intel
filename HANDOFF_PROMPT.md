# First Claude Code session — handoff prompt

Paste the prompt below into your first Claude Code session, after you've placed the handoff files in your repo and committed them on an initial commit on `main`.

---

## Prerequisites (do these before starting Claude Code)

1. Create a new GitHub repository (private). Name TBD — see open question in `WORK_LOG.md`.
2. Clone it locally.
3. Drop all the handoff files into the repo, preserving directory structure:
   - `README.md`
   - `CLAUDE.md`
   - `WORK_LOG.md`
   - `.env.example`
   - `.gitignore`
   - `.github/pull_request_template.md`
   - `docs/decisions/_template.md`
   - `docs/decisions/0001-monorepo.md`
   - `docs/sources/_template.md`
   - Also copy in: `docs/data-points.md` (from the tagged data points file), `docs/sources.md` (from the free sources mapped file), `docs/architecture.md` (the original architecture file, will be revised)
4. Commit and push to `main`. This is the only commit that goes directly to main — everything else goes through PRs.
5. Set up branch protection on `main` requiring PR + review (yourself).
6. In GitHub Actions secrets, add placeholders for the API keys (real values come later when you actually ingest).

Now start Claude Code and paste this prompt:

---

## The prompt

```
I'm starting a new project, location-intel. The repo has been initialized with documentation and rules but no code yet. Your task for this first session is to scaffold the monorepo structure.

Before you do anything, read these files in order:
1. README.md
2. CLAUDE.md
3. WORK_LOG.md
4. docs/decisions/0001-monorepo.md
5. docs/decisions/0002-deployment-railway.md
6. docs/decisions/0003-v1-scope.md

CLAUDE.md is the rules document. Follow it exactly — especially the sections on branching, PRs, scope discipline, and "what done means."

Your scope for this session is narrow: scaffold the monorepo with empty packages and working tooling. Specifically:

1. Set up the workspace structure:
   - packages/ingestion/ (Python)
   - packages/intelligence/ (Python)
   - packages/api/ (TypeScript)
   - packages/shared/ (TypeScript types + shared SQL definitions)
   - infra/supabase/ (with empty migrations/ subdirectory)
   - scripts/ (empty)

2. Set up Python tooling:
   - Root pyproject.toml configuring uv workspaces, ruff, pyright
   - Per-package pyproject.toml for ingestion and intelligence
   - Each Python package has an __init__.py and a minimal "hello world" callable

3. Set up TypeScript tooling:
   - Root package.json with pnpm workspaces
   - pnpm-workspace.yaml
   - Root tsconfig.json with strict settings
   - Root biome.json for lint + format
   - Per-package package.json for api and shared
   - Each TS package has a src/index.ts with a minimal export

4. CI:
   - .github/workflows/ci.yml that runs on every PR
   - Detects whether Python or TS files changed
   - Runs ruff check + ruff format --check + pyright + pytest for Python
   - Runs biome check + tsc --noEmit + vitest for TypeScript
   - Caches dependencies appropriately

5. A CLAUDE.md in each package directory with a single line: "See root CLAUDE.md. Package-specific conventions will be added here as established."

6. Update WORK_LOG.md at the end with what you accomplished and what's next.

DO NOT:
- Add any feature code beyond hello-world stubs
- Add any dependencies beyond what's strictly needed for the tooling above
- Make any architectural decisions not already in the ADRs
- Create database migrations (that's the next session, after schema design)
- Try to set up Supabase or anything that requires real credentials
- Try to deploy anything to Railway yet (deployment configs come later, after we have working code)
- Create Railway service configs (railway.toml) yet — they're per-service and we don't have services to deploy

Open one PR per logical change — probably 3 PRs total (Python scaffolding, TS scaffolding, CI), but use your judgment. If you think one PR is cleaner, do that. Each PR should pass CI on its own.

If anything is ambiguous, ask before doing it. Don't guess.
```

---

## What to expect

Claude Code should produce 1-3 PRs covering Python scaffold, TypeScript scaffold, and CI. Review each carefully — this is your chance to catch any drift from the rules before the codebase has any meaningful weight.

Things to specifically look for in review:

- **Scope creep.** Did it add anything not asked for? Reject and ask to remove.
- **Dependency additions.** Anything beyond the bare minimum tooling? Question it.
- **Comments.** Are there narration comments ("# Initialize the workspace")? Reject.
- **CI complexity.** Did it overengineer the CI workflow? The first version should be simple — caching + the 4-5 commands listed. No matrix builds, no fancy reporting, no deployment hooks.
- **README of each package.** It should be very brief at this point — what the package will eventually do, not what it does today (since it doesn't do anything today).

After the scaffold is merged, the next session is **schema design + first ingestion pipeline spec**, which we'll write up before pointing Claude Code at it.
