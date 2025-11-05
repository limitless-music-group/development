<!-- Source: .ruler/ai.md -->

# Project Rules

## Project Structure

This is a monorepo with the following structure:

- **`apps/api`** - API for the apps
- **`apps/app`** - Main Frontend Application (Next.js)
- **`apps/docs`** -
- **`apps/email`** - React Email Server (for development purposes)
- **`apps/storybook`** -
- **`apps/studio`** - Prisma Studio for development purposes
- **`apps/web/`** - Marketing application (Next.js)

- **`packages/ai`** -
- **`packages/analytics`** -
- **`packages/auth`** -
- **`packages/collaboration`** -
- **`packages/core-service`** -
- **`packages/database`** -
- **`packages/design-system`** -
- **`packages/email`** -
- **`packages/feature-flags`** -
- **`packages/next-config`** -
- **`packages/notifications`** -
- **`packages/observability`** -
- **`packages/payments`** -
- **`packages/rate-limit`** -
- **`packages/security`** -
- **`packages/seo`** -
- **`packages/storage`** -
- **`packages/typescript-config`** -
- **`packages/webhooks`** -

## Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm dev:web` - Start only the web app
- `pnpm dev:app` - Start only the main app
- `pnpm dev:api` - Start only the api
- `pnpm dev:email` - Start only the email server
- `pnpm dev:docs` - Start only the docs
- `pnpm dev:studio` - Start only the prisma studio server
- `pnpm dev:storybook` - Start only the Storybook server

## Database Commands

All database operations should be run from the server workspace:

- `pnpm db:push` - Push schema changes to database
- `pnpm db:generate` - Generate Prisma files
- `pnpm db:migrate` - Run database migrations

Database schema is located in `packages/database/prisma/schema.prisma`

## API Structure

- oRPC endpoints are in `apps/server/src/api/`
- Client-side API utils are in `apps/web/src/utils/api.ts`

## Adding More Features

You can add additional addons or deployment options to your project using:

```bash
pnpx create-better-t-stack
add
```

Available addons you can add:

- **Documentation**: Starlight, Fumadocs
- **Linting**: Biome, Ultracite
- **Other**: Ruler, Turborepo, Husky

You can also add web deployment configurations like Cloudflare Workers support.

## Project Configuration

This project includes a `bts.jsonc` configuration file that stores your Better-T-Stack settings:

- Contains your selected stack configuration (database, ORM, backend, frontend, etc.)
- Used by the CLI to understand your project structure
- Safe to delete if not needed
- Updated automatically when using the `add` command

## Key Points

- This is a Turborepo monorepo using pnpm workspaces
- Each app has its own `package.json` and dependencies
- Run commands from the root to execute across all workspaces
- Run workspace-specific commands with `pnpm run command-name`
- Turborepo handles build caching and parallel execution
- Use `pnpx
create-better-t-stack add` to add more features later
