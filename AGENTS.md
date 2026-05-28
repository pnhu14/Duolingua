# Repository Guidelines

Behavioral and project-specific instructions for contributors and coding agents working in this repository.

These guidelines favor small, verifiable changes over speed. For trivial tasks, use judgment, but do not skip verification when behavior changes.

## 1. Working Style

Before implementing:
- State assumptions when the request is ambiguous.
- Ask before choosing between materially different interpretations.
- Prefer the simplest change that solves the requested problem.
- Push back on speculative features, broad refactors, or abstractions that are not needed.

When editing existing code:
- Touch only files required by the task.
- Match the local style, package structure, naming, and patterns.
- Do not clean up unrelated code.
- Remove only unused imports, variables, or helpers introduced by your own change.
- Keep every changed line traceable to the request.

For multi-step work, use a short goal-driven plan:

```text
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

## 2. Project Structure

This repository is split into two active apps:

- `backend/music-streaming-app`: Spring Boot backend. Java source lives in `src/main/java/com/musicapp/backend` with `config`, `controller`, `dto`, `entity`, `mapper`, `repository`, `security`, `service`, and `tool` packages. Resources live in `src/main/resources`. Tests live in `src/test/java`.
- `frontend/music-streaming-app`: React + TypeScript + Vite frontend. UI code lives in `src`, with `components`, `views`, `hooks`, `services`, `types`, `utils`, `data`, and `assets` directories. Static files live in `public`.

Backend database files:
- Forward Flyway migrations: `backend/music-streaming-app/src/main/resources/db/migration`.
- Local rollback scripts: `backend/music-streaming-app/src/main/resources/db/undo`.
- Legacy/reference SQL snapshots: `backend/music-streaming-app/src/main/resources/db/reference`.

## 3. Build, Test, and Development Commands

Use these commands from the repository root unless noted.

Backend:
- Run: `cd backend/music-streaming-app && .\mvnw.cmd spring-boot:run`
- Compile: `cd backend/music-streaming-app && .\mvnw.cmd compile`
- Format: `cd backend/music-streaming-app && .\mvnw.cmd spotless:apply`
- Format check: `cd backend/music-streaming-app && .\mvnw.cmd spotless:check`
- Test: `cd backend/music-streaming-app && .\mvnw.cmd test`

Frontend:
- Dev server: `cd frontend/music-streaming-app && bun run dev`
- Build: `cd frontend/music-streaming-app && bun run build`
- Lint: `cd frontend/music-streaming-app && bun run lint`
- Preview build: `cd frontend/music-streaming-app && bun run preview`

Use `bun` for frontend package scripts.

## 4. Backend Guidelines

- Java code must follow Google Java Format. Run `.\mvnw.cmd spotless:apply` before committing backend Java changes.
- Package names stay lowercase. Class names use `PascalCase`; fields and methods use `camelCase`.
- Keep controllers thin. Put business logic in services, persistence in repositories, mapping in mappers, and security-specific wiring in `security` or `config`.
- Public API routes currently live under `/api`, including auth, me, songs, artists, and albums.
- Authentication uses JWT access tokens, refresh tokens, and Google OAuth2 login. Keep OAuth handlers in `security` and user/session creation in `AuthService`.
- Do not let Hibernate manage schema changes. Keep `spring.jpa.hibernate.ddl-auto=none`; schema and seed changes must go through Flyway migrations.
- Every forward migration in `db/migration` should have a matching rollback script in `db/undo` when practical.

## 5. Frontend Guidelines

- Frontend code uses React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Heroicons.
- Use 2 spaces in TypeScript/TSX.
- Component files should stay in `src/components` or `src/views` and use `PascalCase.tsx`.
- API calls belong in `src/services/api.ts`; app-level state and workflows belong in hooks such as `src/hooks/useMusicApp.ts`.
- Keep route/hash parsing in navigation utilities or clearly named local helpers.
- Auth state is stored in `localStorage` using `accessToken` and `refreshToken`. Keep token persistence consistent with existing `api.ts` and `useMusicApp.ts` patterns.
- There is no frontend test runner configured yet. At minimum, run `bun run lint` and `bun run build` for frontend changes.

## 6. Configuration and Security

Backend defaults to PostgreSQL at `localhost:5432/music_db`.

Expected local environment variables are documented in `backend/music-streaming-app/.env.example`:
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `FRONTEND_URL`

JWT-related overrides:
- `JWT_SECRET`
- `JWT_ACCESS_TOKEN_MINUTES`
- `REFRESH_TOKEN_DAYS`

Do not commit real secrets, production connection strings, private keys, or real OAuth client secrets.

## 7. Testing Guidelines

Backend tests use JUnit 5 with Spring Boot test support. Name test classes `*Tests.java` and place them under `backend/music-streaming-app/src/test/java`.

Run backend tests with:

```text
cd backend/music-streaming-app && .\mvnw.cmd test
```

For database-dependent backend tests, expect a local PostgreSQL database matching the configured environment.

For frontend changes, run:

```text
cd frontend/music-streaming-app && bun run lint && bun run build
```

If a verification command cannot be run, state exactly why.

## 8. Commit Conventions

Use Conventional Commits. Keep commits atomic and do not bundle backend and frontend changes together.

Format:

```text
<type>(<scope>): <subject>

<body, optional>

<footer, optional>
```

Types:
- `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`, `build`, `ci`

Scopes:
- Use `front-end` or `back-end` for app-specific changes.
- Use sub-scopes for specific modules or layers, such as `front-end/auth`, `back-end/auth`, `back-end/repository/song`, or `back-end/migration`.
- Use cross-cutting scopes such as `deps`, `ci`, `docs`, or `config` only when the change is not owned by one app.

Subject:
- Use imperative mood: `add`, `fix`, `remove`, `update`.
- Use lowercase text and no trailing period.
- Keep the full subject under 100 characters.

Atomic commit rules:
- Split by domain: backend and frontend must be separate commits.
- Split by layer when the changes can stand alone: migration, entity, repository, service, controller, frontend API, frontend UI.
- Split by intent: dependency/config changes, refactors, behavior changes, tests, and formatting should be separate when practical.
- File moves or renames should be their own commit before content changes.

Examples:

```text
build(back-end/auth): add google oauth client config
feat(back-end/auth): authenticate google oauth users
feat(back-end/auth): wire google oauth login handlers
feat(front-end/auth): add google login redirect
feat(front-end/auth): restore google oauth session
feat(front-end/auth): connect google login button
```

Before committing:
- Backend changes: run `.\mvnw.cmd spotless:apply` when Java changed, then `.\mvnw.cmd test`.
- Frontend changes: run `bun run lint` and `bun run build`.
- Confirm `git diff --cached` contains only the intended logical change.
