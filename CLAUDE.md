# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (vinxi dev)
npm run build     # production build (vinxi build)
npm run start     # run production build (vinxi start)
npm run preview   # preview production build
```

No test suite is configured. Node >= 22 required.

## Environment Variables

Copy `.env` and fill in real values before running:

| Variable | Purpose |
|---|---|
| `AUTH_SALT_KEY` | Salt used by `encryptAuthVerify`/`decryptAuthVerify` in `src/lib/server/encryption.ts` |
| `APP_ENV` | Set to `development`, `local`, or `test` to skip email sending in contact form |
| `APP_MAIL_SYSTEM` | `smtp` (default) or `web3form` |
| `SMTP_HOST/PORT/USER/PASS` | SMTP credentials when `APP_MAIL_SYSTEM=smtp` |
| `WEB3FORMS_FORM_URL/ACCESS_KEY` | Web3Forms credentials when `APP_MAIL_SYSTEM=web3form` |

## Architecture Overview

This is a **SolidStart 1.3.x SSR** app (powered by Vinxi) that parses Safe Exam Browser (`.seb`) config files and generates HTTP bypass headers (RequestHash, ConfigKeyHash, Referer, User-Agent) compatible with the ModHeader browser extension.

### Entry Points

- `src/entry-server.tsx` — SSR handler via `createHandler`/`StartServer`; injects noscript fallback HTML
- `src/entry-client.tsx` — hydrates the SSR output via `mount`/`StartClient`
- `src/app.tsx` — root router; switches between `HomeLayout` (normal routes) and `ErrorLayout` (404) based on `location.pathname`

### Routing

File-based routing in `src/routes/`. Valid routes (checked in `src/app.tsx`):
```
/   /tutorial   /contact   /upload (redirects → /services/seb)
/services       (layout shell — Outlet only)
/services/index (services listing)
/services/seb   (SEB upload form)
```
`services.tsx` is a transparent `<Outlet>` layout; the listing lives in `services/index.tsx` and the upload form in `services/seb.tsx`. Any path not matching these renders `[...404].tsx` inside `ErrorLayout`.

### Path Aliases

Configured in both `app.config.ts` (Vite) and `tsconfig.json`:

| Alias | Resolves to |
|---|---|
| `~/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@lib/*` | `src/lib/*` |
| `@server/*` | `src/server/*` |
| `@constants/*` | `src/constants/*` |
| `@config/*` | `src/config/*` |
| `@features/*` | `src/features/*` |
| `@layouts/*` | `src/layouts/*` |

### Server-only Code (`src/lib/server/`)

All files here run exclusively on the server and must not be imported from client components directly:

- **`parse.ts`** — parses `.seb` XML plist files (via `@xmldom/xmldom`) into `XMLDictionary`; also serializes the dictionary to a canonical JSON string used for hashing
- **`seb.ts`** — `SebFile` class: wraps a parsed dictionary, computes `ConfigHash` (SHA-256 of serialized JSON) and `RequestHash` (SHA-256 of `examKeySalt`), and produces `ConfigKeyHash` via `sha256(url + ConfigHash)`
- **`encryption.ts`** — `sha256`, `base64`, and a custom XOR-based `encryptAuthVerify`/`decryptAuthVerify` keyed by `AUTH_SALT_KEY`
- **`dom.ts`** — re-exports JSDOM's `Node` class for use in `parse.ts`
- **`userAgent.ts`** — `UserAgentGenerator` class that generates random Chrome user-agent strings across Windows/Mac/Linux/Android

### Server Actions and Services (`src/server/`)

- **`action/upload.action.ts`** — validates the uploaded `.seb` file, checks a client-generated `web_token` via `decryptAuthVerify`, parses the file, creates a `SebFile`, caches the result to disk, and redirects to `/upload?id=<hash>`
- **`action/contact.action.ts`** — validates the contact form and sends email (skipped when `APP_ENV` is `development`/`local`/`test`)
- **`db/seb.service.ts`** — filesystem cache layer: results are stored as JSON at `./storage/app/seb/results/<hash>.json`; also builds the final header array returned to the UI
- **`email/mail.ts`** — `Mail` class supporting SMTP (nodemailer) and Web3Forms (axios) backends, selected by `APP_MAIL_SYSTEM`

### Upload Flow

1. `getSebWebToken` cache function in `services/seb.tsx` generates the `web_token` **server-side** via `encryptAuthVerify` (uses `AUTH_SALT_KEY` env var). The form receives it as a hidden field — the salt never reaches the client.
2. Server validates the token via `decryptAuthVerify`; a mismatch returns `{ error: "Unauthorized request" }`
3. `.seb` file is parsed → `SebFile` instantiated → result cached to disk
4. Redirect to `/upload?id=<hash>&file_name=<name>` — the `loadCachedHeaders` cache function (`"use server"`) reads the cached file and builds the header list

### Data Fetching Pattern

Routes use the SolidStart `cache` + `createAsync` pattern:
```ts
const getData = cache(async () => { "use server"; return ...; }, "cache-key");
const data = createAsync(() => getData());
```

Mutations use `action()` + `useSubmission()` (see `src/routes/upload.tsx`).

### Styling

Tailwind CSS v4 via `@tailwindcss/vite`. Global styles in `src/app.css`. The primary brand color is `primary-*` (orange `#ff4f00`).
