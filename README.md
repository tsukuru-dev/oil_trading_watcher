# Oil Trading Watcher

Monorepo for a real-time oil market intelligence platform.

## Apps

- `apps/web` - Next.js, TypeScript, and Tailwind dashboard.
- `apps/mobile` - React Native app built with Expo.
- `apps/api` - FastAPI backend with PostgreSQL, Redis, Redis Streams, workers, and AI scoring.

## Packages

- `packages/shared` - Shared TypeScript types, constants, and utilities.
- `packages/api-client` - Typed API client for web and mobile.
- `packages/ui` - Shared design tokens and reusable UI building blocks.

## Local Infrastructure

Docker Compose files and service config live in `infra/`.

