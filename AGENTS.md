# Repository Guidelines

## Project Structure & Module Organization
This repository is split into two apps:

- `backend/music`: Spring Boot backend. Java source lives in `src/main/java/com/musicapp/backend` with `config`, `controller`, `dto`, `entity`, `mapper`, `repository`, and `service` packages. Resources are in `src/main/resources`; forward database migrations live in `db/migration`, rollback scripts for the local migration tool live in `db/undo`, and legacy SQL snapshots stay under `db/reference`. Tests live in `src/test/java`.
- `frontend/music/music-streaming-app`: React + TypeScript frontend. Main UI code is in `src`, shared assets are in `src/assets`, and static public files are in `public`.
- Root-level SQL files such as `seed_data.sql` are helper scripts and are not part of the active backend startup path.

## Build, Test, and Development Commands
- Backend run: `cd backend/music && .\mvnw.cmd spring-boot:run`
- Backend compile: `cd backend/music && .\mvnw.cmd compile`
- Backend format: `cd backend/music && .\mvnw.cmd spotless:apply`
- Backend format check: `cd backend/music && .\mvnw.cmd spotless:check`
- Backend test: `cd backend/music && .\mvnw.cmd test`
- Backend migration create: `cd backend/music && .\artisan.ps1 make:migration add_table_name`
- Backend migrate: `cd backend/music && .\artisan.ps1 migrate`
- Backend rollback: `cd backend/music && .\artisan.ps1 rollback [steps]` or `.\artisan.ps1 migrate:rollback [steps]`
- Backend migration info: `cd backend/music && .\artisan.ps1 info` or `.\artisan.ps1 migrate:status`
- Frontend dev server: `cd frontend/music/music-streaming-app && npm.cmd run dev`
- Frontend build: `cd frontend/music/music-streaming-app && npm.cmd run build`
- Frontend lint: `cd frontend/music/music-streaming-app && npm.cmd run lint`

Use `npm.cmd` in PowerShell on Windows if `npm.ps1` is blocked by execution policy.

## Coding Style & Naming Conventions
Backend Java must follow Google Java Format and should be formatted with `.\mvnw.cmd spotless:apply` before commit. Keep Java package names lowercase and class names `PascalCase` (`SongController`, `SongService`). Use `camelCase` for Java fields and methods. Frontend uses 2 spaces in TypeScript/TSX; component files should stay in `src/components` and use `PascalCase.tsx`. Frontend linting is enforced with ESLint via `eslint.config.js`.

## Testing Guidelines
Backend tests use JUnit 5 with Spring Boot test support. Name test classes `*Tests.java` and place them under `backend/music/src/test/java`. Run them with `.\mvnw.cmd test`. There is no frontend test runner configured yet; at minimum, contributors should run `npm.cmd run build` and `npm.cmd run lint` before opening a PR.

## Commit & Pull Request Guidelines
Recent history uses Conventional Commit-style prefixes such as `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, and `chore:`. Keep commit messages short and imperative, for example: `feat: add playlist search endpoint`.

PRs should include a concise description, the affected module (`backend` or `frontend`), manual test steps, and screenshots for UI changes. Call out database or configuration changes explicitly.

## Security & Configuration Tips
Backend defaults to PostgreSQL on `localhost:5432/music_db`. Prefer environment variables such as `DB_USERNAME` and `DB_PASSWORD` over hardcoding credentials. Spring SQL bootstrap is disabled; schema changes and seed evolution should go through Flyway versioned migrations such as `V1__create_core_tables.sql`, with matching rollback scripts in `db/undo` such as `U1__create_core_tables.sql`. Do not commit real secrets or production connection strings.
