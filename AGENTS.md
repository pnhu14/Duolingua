# AGENTS.md

# Repository Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

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
- Backend migration create: `cd backend/music && .\artisan.ps1 make:migration add_table_name`
- Backend migrate: `cd backend/music && .\artisan.ps1 migrate`
- Backend rollback: `cd backend/music && .\artisan.ps1 rollback [steps]` or `.\artisan.ps1 migrate:rollback [steps]`
- Backend migration info: `cd backend/music && .\artisan.ps1 info` or `.\artisan.ps1 migrate:status`
- Frontend dev server: `cd frontend/music/music-streaming-app && npm.cmd run dev`
- Frontend build: `cd frontend/music/music-streaming-app && npm.cmd run build`
- Frontend lint: `cd frontend/music/music-streaming-app && npm.cmd run lint`

Use `npm.cmd` in PowerShell on Windows if `npm.ps1` is blocked by execution policy.

## 7. Coding Style & Naming Conventions
- Backend Java must follow Google Java Format and should be formatted with `.\mvnw.cmd spotless:apply` before commit. Keep Java package names lowercase and class names `PascalCase` (`SongController`, `SongService`). Use `camelCase` for Java fields and methods. Frontend uses 2 spaces in TypeScript/TSX; component files should stay in `src/components` and use `PascalCase.tsx`. Frontend linting is enforced with ESLint via `eslint.config.js`.


## 8. Commit Conventions

**Conventional Commits, atomic, KHÔNG gộp.**

**Format**
```
<type>(<scope>): <subject>

<body, optional>

<footer, optional>
```

Blank line giữa subject và body **bắt buộc** — thiếu thì git tool đọc sai.

**Types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`, `build`, `ci`.

**Scope**
- Top-level: `front-end` hoặc `back-end`, **viết đầy đủ — không `fe` / `be`**.
- Sub-scope: tên module / component / layer cụ thể, ngăn cách bằng `/`. Ví dụ: `front-end/expense-editor`, `back-end/handlers`, `back-end/repository/expense`.
- Cross-cutting: scope đơn — `deps`, `ci`, `docs`, `config`.

**Subject**
- Imperative: "add", "fix", "remove" — không "added", "fixes".
- Viết thường, không dấu chấm cuối.
- **Hard limit 100 ký tự**, bao gồm cả `type(scope):`. Càng ngắn càng tốt.
- Subject sắp chạm 100 → **tách commit**, không nhồi thêm "and" / "with" / "also".

**Body** (optional)
- Giải thích *why*, không *what*. *What* đọc diff là thấy.
- Wrap mỗi dòng ~72 ký tự cho `git log` đọc được. URL / path dài để nguyên.
- **Nên có** khi: fix bug (giải thích nguyên nhân), có breaking change, có quyết định non-obvious cần biện minh, reference issue/PR.
- **Không cần** khi: thay đổi tự giải thích qua diff (rename biến, format, thêm field đơn giản).

**Atomic commits — bắt buộc tách nhỏ**

Một commit = một thay đổi logic. KHÔNG gom nhiều thay đổi vào một commit kể cả khi cùng phục vụ một feature.

Tách theo các trục:
- **Theo layer:** model → repository → service → handler → route là 5 commit riêng.
- **Theo domain:** backend và frontend KHÔNG BAO GIỜ chung một commit.
- **Theo intent:** refactor và feature tách. Format/rename và logic change tách. Thêm dep và dùng dep tách.
- **Theo file phụ:** rename file commit riêng. Move file commit riêng trước khi sửa nội dung.

Test: nếu subject cần "and" / "with" / "also" để mô tả → commit đang làm quá nhiều, tách ra.

**Ví dụ — thêm field `note` cho Expense:**

```
feat(back-end/models): add Note field to Expense
feat(back-end/repository): persist Note in Create and Update
feat(back-end/handlers): accept note in expense request DTO
feat(front-end/lib): include note in expense API payloads
feat(front-end/expense-editor): add note textarea to form
```

5 commit, không phải 1.

**Ví dụ commit có body:**

```
fix(back-end/repository): return ErrExpenseNotFound for missing rows

GORM's First() returns gorm.ErrRecordNotFound which leaks
ORM details to the service layer. Wrap it in a domain error
so handlers can map to 404 without importing gorm.

Closes #47
```

**Khi nào KHÔNG cần tách**
- Đổi tên 1 symbol và cập nhật caller — đây là 1 thay đổi.
- Sửa typo trong 1 file.
- Fix lỗi do commit ngay trước trong cùng PR — `--amend` nếu chưa push.

**Trước khi commit**
- Backend: `go fmt ./... && go test ./...`
- Frontend: `bun run lint && bun run build`
- Diff phải đọc được trong 60 giây. Nếu không, tách nhỏ nữa.

## 9. Testing Guidelines
Backend tests use JUnit 5 with Spring Boot test support. Name test classes `*Tests.java` and place them under `backend/music/src/test/java`. Run them with `.\mvnw.cmd test`. There is no frontend test runner configured yet; at minimum, contributors should run `npm.cmd run build` and `npm.cmd run lint` before opening a PR.

## 10. Security & Configuration Tips
Backend defaults to PostgreSQL on `localhost:5432/music_db`. Prefer environment variables such as `DB_USERNAME` and `DB_PASSWORD` over hardcoding credentials. Spring SQL bootstrap is disabled; schema changes and seed evolution should go through Flyway versioned migrations such as `V1__create_core_tables.sql`, with matching rollback scripts in `db/undo` such as `U1__create_core_tables.sql`. Do not commit real secrets or production connection strings.
