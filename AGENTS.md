# Repository Guidelines

## Project Structure & Modules
- Monorepo managed by pnpm workspaces.
- `packages/components`: Vue 3 components (e.g., `Alert`, `Button`); tests live next to components.
- `packages/core`: library entry, build configs, and bundling.
- `packages/theme`: global CSS (`index.css`, `reset.css`).
- `packages/utils`, `packages/hooks`: shared TS utilities and composables.
- `packages/play`: Vite + Storybook playground for local dev.
- `packages/docs`: VitePress docs site.
- `libs/vitepress-preview-component`: docs demo helper.

## Build, Test, and Dev
- Install: `pnpm install`
- Run playground: `pnpm play` (Vite dev server for `@liu-element/play`).
- Dev (build then run playground): `pnpm dev`
- Storybook: `pnpm storybook`
- Test (vitest + coverage): `pnpm test` or `pnpm --filter @liu-element/components test`
- Docs: `pnpm docs:dev`, build with `pnpm docs:build`
- Build library: `pnpm build` (ES + UMD via Vite in `packages/core`)

## Coding Style & Naming
- Language: TypeScript + Vue 3 SFC; ESM modules.
- Indentation: 4 spaces; single quotes preferred; avoid trailing semicolons.
- Components: PascalCase directories/files; public names start with `Liu...` (e.g., `LiuAlert`).
- CSS: prefix classes with `liu-` (e.g., `liu-alert__title`).
- Imports: prefer workspace packages (`@liu-element/*`) over relative deep paths.

## Testing Guidelines
- Frameworks: vitest, jsdom, @vue/test-utils.
- Naming: `*.test.tsx` colocated with the component (e.g., `packages/components/Alert/Alert.test.tsx`).
- Run a single test: `pnpm --filter @liu-element/components vitest -t "Alert"`
- Aim for meaningful coverage; generated reports: `packages/components/coverage`.

## Commit & Pull Requests
- Commits: concise, present tense; suggested convention `type(scope): subject`.
- Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`.
- Scope example: `feat(components/Alert): add close event`.
- PRs: include summary, linked issues, screenshots for UI changes, test updates, and docs/playground updates if applicable.
- CI (GitHub Actions) runs tests and builds docs on `master` pushes; keep Node 20 and pnpm parity.

## Tips
- Local dev flow: implement in `packages/components/*` -> export via `packages/core` -> verify in `packages/play` -> document in `packages/docs`.
