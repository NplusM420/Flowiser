# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flowise is an open-source visual tool for building AI agents and LLM applications through a drag-and-drop interface. It's a monorepo with TypeScript/Node.js backend and React frontend.

## Development Commands

### Essential Commands

```bash
# Install dependencies (MUST use pnpm)
pnpm install

# Build all packages
pnpm build

# Start development servers (backend: 3000, frontend: 8080)
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint
pnpm lint-fix

# Format code
pnpm format
```

### Server-specific Commands

```bash
# Start production server
pnpm start

# Start worker (for queue mode)
pnpm start-worker

# Run server tests
cd packages/server && pnpm test

# Run specific test file
cd packages/server && pnpm jest path/to/test.ts
```

## Architecture

### Monorepo Structure

-   `/packages/server` - Express.js backend API
    -   `/src/services` - Core business logic
    -   `/src/database` - Database models and migrations
    -   `/src/routes` - API endpoints
    -   `/src/utils` - Utility functions
-   `/packages/ui` - React frontend
    -   Uses Material-UI components
    -   Vite for bundling
    -   State management with React Context
-   `/packages/components` - Node implementations
    -   `/nodes` - All flow nodes grouped by category:
        -   `/chatmodels` - LLM integrations
        -   `/documentloaders` - File/data loaders
        -   `/vectorstores` - Vector database integrations
        -   `/agents` - Agent implementations
        -   `/tools` - Tool integrations
        -   `/chains` - LangChain implementations

### Key Patterns

1. **Node Creation**: Each node in `/packages/components/nodes` follows:

    - Extends `INode` interface
    - Has `init()` and `run()` methods
    - Includes metadata for UI display
    - Handles credentials securely

2. **Database**: Supports SQLite (default), PostgreSQL, MySQL

    - TypeORM for ORM
    - Migrations in `/packages/server/src/database/migrations`

3. **Authentication**: JWT-based with optional OAuth2

    - Credentials encrypted in database
    - API key authentication for API access

4. **Queue System**: Optional Bull/Redis for background jobs
    - Enable with `QUEUE_MODE=true`
    - Separate worker process with `pnpm start-worker`

## Testing Approach

-   Unit tests with Jest in `/packages/server/test`
-   Test utilities in `/packages/server/test/utils`
-   Mock external services and databases
-   Run with `pnpm test` or specific tests with `pnpm jest <file>`

## Environment Configuration

Key `.env` variables for development:

```
# Database
DATABASE_TYPE=sqlite
DATABASE_PATH=/root/.flowise

# Server
PORT=3000
FLOWISE_SECRETKEY_OVERWRITE=your-secret-key

# Optional: Queue mode
QUEUE_MODE=false
REDIS_URL=redis://localhost:6379

# Optional: External storage
BLOB_STORAGE_TYPE=local
```

## Common Development Tasks

1. **Adding a new LLM integration**:

    - Create in `/packages/components/nodes/chatmodels/`
    - Extend `BaseChatModel` or implement `INode`
    - Add credentials in `/packages/components/credentials/`

2. **Modifying API endpoints**:

    - Routes in `/packages/server/src/routes/`
    - Controllers handle business logic
    - Use existing middleware for auth/validation

3. **UI changes**:
    - Components in `/packages/ui/src/`
    - Canvas logic in `/packages/ui/src/views/canvas/`
    - API calls through `/packages/ui/src/api/`

## Important Notes

-   Always use `pnpm` (not npm/yarn)
-   Node.js version: 18.15.0-18.x or 20.x
-   TypeScript strict mode enabled
-   ESLint/Prettier pre-commit hooks active
-   Credentials are encrypted - never log them
-   Follow existing patterns for consistency
