# AGENTS.md

# Repository Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Do not assume. Do not hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them; do not pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what is confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that was not requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Do not "improve" adjacent code, comments, or formatting.
- Do not refactor things that are not broken.
- Match existing style, even if you would do it differently.
- If you notice unrelated dead code, mention it; do not delete it.

When your changes create orphans:
- Remove imports, variables, and functions that your changes made unused.
- Do not remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" -> "Write tests for invalid inputs, then make them pass"
- "Fix the bug" -> "Write a test that reproduces it, then make it pass"
- "Refactor X" -> "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

Strong success criteria let you loop independently. Weak criteria such as "make it work" require constant clarification.

**These guidelines are working if:** diffs contain fewer unnecessary changes, fewer rewrites are caused by overcomplication, and clarifying questions come before implementation rather than after mistakes.

## 5. Project Structure & Module Organization

This repository is split into two apps:

- `backend/music`: Spring Boot backend. Java source lives in `src/main/java/com/musicapp/backend` with `config`, `controller`, `dto`, `entity`, `mapper`, `repository`, and `service` packages. Resources are in `src/main/resources`; forward database migrations live in `db/migration`, rollback scripts for the local migration tool live in `db/undo`, and legacy SQL snapshots stay under `db/reference`. Tests live in `src/test/java`.
- `frontend/music/music-streaming-app`: React + TypeScript frontend. Main UI code is in `src`, shared assets are in `src/assets`, and static public files are in `public`.
- Root-level SQL files such as `seed_data.sql` are helper scripts and are not part of the active backend startup path.

## 6. Build, Test, and Development Commands

- Backend run: `cd backend/music && .\mvnw.cmd spring-boot:run`
- Backend compile: `cd backend/music && .\mvnw.cmd compile`
- Backend format: `cd backend/music && .\mvnw.cmd spotless:apply`
- Backend format check: `cd backend/music && .\mvnw.cmd spotless:check`
- Backend test: `cd backend/music && .\mvnw.cmd test`
- Frontend dev server: `cd frontend/music/music-streaming-app && bun run dev`
- Frontend build: `cd frontend/music/music-streaming-app && bun run build`
- Frontend lint: `cd frontend/music/music-streaming-app && bun run lint`

Use `bun` for frontend package scripts.

## 7. Coding Style & Naming Conventions

- Backend Java must follow Google Java Format and should be formatted with `.\mvnw.cmd spotless:apply` before commit. Keep Java package names lowercase and class names `PascalCase` (`SongController`, `SongService`). Use `camelCase` for Java fields and methods. Frontend uses 2 spaces in TypeScript/TSX; component files should stay in `src/components` and use `PascalCase.tsx`. Frontend linting is enforced with ESLint via `eslint.config.js`.

## 8. Commit Conventions

**Conventional Commits, atomic, no bundling.**

**Format**

```
<type>(<scope>): <subject>

<body, optional>

<footer, optional>
```

A blank line between the subject and body is required; without it, git tooling can parse the message incorrectly.

**Types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`, `build`, `ci`.

**Scope**
- Top-level: use `front-end` or `back-end`, spelled out fully; do not use `fe` or `be`.
- Sub-scope: use the specific module, component, or layer name, separated by `/`. Examples: `front-end/expense-editor`, `back-end/handlers`, `back-end/repository/expense`.
- Cross-cutting: use a single scope such as `deps`, `ci`, `docs`, or `config`.

**Subject**
- Use the imperative mood: "add", "fix", "remove"; not "added" or "fixes".
- Use lowercase text and no trailing period.
- Keep a hard limit of 120 characters, including `type(scope):`. Shorter is better.
- If the subject is close to 120 characters, split the commit instead of adding "and", "with", or "also".

**Body** (optional)
- Explain *why*, not *what*. The diff already shows *what* changed.
- Wrap each line at about 72 characters so `git log` stays readable. Leave long URLs and paths as-is.
- Include a body for bug fixes, breaking changes, non-obvious decisions that need justification, and issue or PR references.
- Skip the body when the diff is self-explanatory, such as a variable rename, formatting-only change, or simple field addition.

**Atomic commits: splitting is required**

One commit equals one logical change. Do not bundle multiple changes into one commit, even when they support the same feature.

Split commits by these axes:
- **By layer:** model -> repository -> service -> handler -> route should be five separate commits.
- **By domain:** backend and frontend must never be in the same commit.
- **By intent:** separate refactors from features. Separate formatting or renames from logic changes. Separate adding a dependency from using it.
- **By supporting file operation:** file renames get their own commit. File moves get their own commit before content changes.

Test: if the subject needs "and", "with", or "also" to describe the change, the commit is doing too much and should be split.

**Example: adding a `note` field to Expense**

```
feat(back-end/models): add Note field to Expense
feat(back-end/repository): persist Note in Create and Update
feat(back-end/handlers): accept note in expense request DTO
feat(front-end/lib): include note in expense API payloads
feat(front-end/expense-editor): add note textarea to form
```

That is five commits, not one.

**Example commit with a body**

```
fix(back-end/repository): return ErrExpenseNotFound for missing rows

GORM's First() returns gorm.ErrRecordNotFound which leaks
ORM details to the service layer. Wrap it in a domain error
so handlers can map to 404 without importing gorm.

Closes #47
```

**When splitting is not required**
- Renaming one symbol and updating its callers is one change.
- Fixing a typo in one file is one change.
- Fixing an issue introduced by the immediately previous commit in the same PR can use `--amend` if it has not been pushed.

**Before committing**
- Backend: `go fmt ./... && go test ./...`
- Frontend: `bun run lint && bun run build`
- The diff should be readable in 60 seconds. If not, split it further.

## 9. Testing Guidelines

Backend tests use JUnit 5 with Spring Boot test support. Name test classes `*Tests.java` and place them under `backend/music/src/test/java`. Run them with `.\mvnw.cmd test`. There is no frontend test runner configured yet; at minimum, contributors should run `bun run build` and `bun run lint` before opening a PR.

## 10. Security & Configuration Tips

Backend defaults to PostgreSQL on `localhost:5432/music_db`. Prefer environment variables such as `DB_USERNAME` and `DB_PASSWORD` over hardcoding credentials. Spring SQL bootstrap is disabled; schema changes and seed evolution should go through Flyway versioned migrations such as `V1__create_core_tables.sql`, with matching rollback scripts in `db/undo` such as `U1__create_core_tables.sql`. Do not commit real secrets or production connection strings.
