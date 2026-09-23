# JayKlo personal website

A terminal-style personal website built with Next.js Pages Router and React.

## Requirements

- Node.js **24.21.0** (current LTS at the time of this update).
- npm **11.19.0**, bundled with that Node release. npm 12 is also allowed.
- Optional: Docker Desktop with its engine running, for container testing.

The project uses npm exclusively. Commit `package-lock.json`; use `npm ci` to
reproduce it. Do not commit `node_modules`, `.next`, local environment files, or
editor artifacts. `.gitignore` and `.dockerignore` exclude these files.

## Install and verify locally

If you use nvm:

```sh
nvm install
nvm use
node --version
npm --version
npm ci
npm run check
npm audit
```

Without nvm, install Node 24.21.0 using your preferred Node version manager first,
then run the same commands starting with `node --version`.

`npm run check` runs ESLint, TypeScript checking, and a production build. A clean
install removes any stale dependency tree left by older versions of this project.
`npm audit` checks both production and development dependencies against current
advisories and requires registry access.

## Test in a browser

```sh
npm run dev -- --hostname 127.0.0.1
```

Open <http://localhost:3000>. Check:

- The banner, border, prompt, font, and light/dark colors render correctly.
- `help`, `about`, `sumfetch`, `date`, and `echo hello` produce output.
- Arrow Up/Down recall history; Tab completes a unique command prefix.
- `clear` and Ctrl+L clear the terminal, and another command still works.
- `projects`, `quote`, and `weather Denver` work when their external APIs are
  reachable. API outages and rate limits can affect these existing commands.
- Existing GitHub, LinkedIn, and résumé links open the configured destinations.
- Check a narrow mobile viewport and the browser console for rendering errors.

Stop the development server with Ctrl+C. Test the production build separately:

```sh
npm run build
HOSTNAME=127.0.0.1 npm start
```

`npm run build` also copies public/static assets into the standalone output.
`npm start` runs that standalone server, matching the Docker runtime.
Repeat the browser checks, then stop with Ctrl+C. Do not run the development and
production servers on port 3000 simultaneously.

## Test the production container

Start Docker Desktop, stop any local server on port 3000, then run:

```sh
docker compose config --quiet
docker compose build liveterm-prod
docker compose up -d liveterm-prod
docker compose ps
docker compose logs liveterm-prod
curl --fail http://localhost:3000/ > /dev/null
```

Repeat the browser checks at <http://localhost:3000>. The production image runs
as the non-root `nextjs` user and contains the standalone Next.js output, not the
source checkout or development dependency tree.

```sh
docker compose exec liveterm-prod id
docker compose down
```

For development inside Docker instead:

```sh
docker compose up --build --renew-anon-volumes liveterm-dev
```

Select a service explicitly: both services use port 3000. `--renew-anon-volumes`
refreshes the development dependency volume after dependency upgrades.

## Before committing and deploying

```sh
git diff --check
git diff --stat
git diff --cached --stat
git ls-files node_modules
```

The final command should print nothing. The first cleanup commit intentionally
contains thousands of staged dependency-file deletions; installed local files
remain available but are ignored. Review and include the new lockfile, ignore
files, Node version files, and configuration changes in the same commit.

On Vercel, confirm the project uses Node **24.x**, install command `npm ci`, and
build command `npm run check`. `package.json` declares the runtime; the obsolete
Node 18 environment hint has been removed. For Docker deployments, rebuild the
image from this checkout rather than reusing an old image.

## Dependency compatibility notes

Next.js 16.3.5, React 19.3.0, Axios 1.20.0, and Tailwind CSS 4.3.3 are pinned, along
with the development tools, in `package.json` and `package-lock.json`. Tailwind 4
uses `@tailwindcss/postcss` and explicitly loads the existing theme configuration.
Next.js 16 uses ESLint's CLI/flat configuration instead of `next lint`.
Development and production builds explicitly retain Webpack, the project's
previous bundler; upgrading the framework does not require moving to Turbopack.

TypeScript **6.0.3** and ESLint **9.39.5** are compatibility exceptions to the latest
major versions: Next.js's current lint stack rejects TypeScript 7 and fails with
ESLint 10. ESLint 9 is deprecated upstream; revisit this pin when the Next.js lint
stack supports ESLint 10. The current dependency audit is a point-in-time check,
so rerun it before deploying.

Unused React Icons, Husky (no project hooks were configured), and redundant lint
and PostCSS packages were removed. These changes cover the dependency/runtime
upgrade and repository/build hygiene; other findings from the security review,
including raw HTML terminal output, require separate fixes.
