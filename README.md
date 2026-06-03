# Rumpke Immobilien

[![CI Pipeline](https://img.shields.io/github/actions/workflow/status/Ramon-Saavedra/rumpke-homepage/ci.yml?branch=main&label=CI&logo=github)](https://github.com/Ramon-Saavedra/rumpke-homepage/actions)
[![Node.js](https://img.shields.io/badge/node-%3E%3D24.14.0-brightgreen?logo=node.js)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/next.js-16.x-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-6.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Private-red)](LICENSE)

Professional real estate platform built with modern web technologies and enterprise-grade architecture.

## Tech Stack

- **Next.js 16.x** - React framework with App Router and Server Components
- **TypeScript 6.x** - Strict mode, no `any` types
- **Tailwind CSS 4.x** - Utility-first CSS with custom design system
- **ESLint 9.x** - Code quality enforcement
- **Node.js ≥24.14.0** - Runtime environment
- **GitHub Actions** - CI/CD pipeline

## Quick Start

**Prerequisites:** Node.js ≥24.14.0, npm ≥10.0.0

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint check
npm test         # Jest test suite
```

## Project Structure

```
src/
├── app/              # Next.js App Router (routes + layouts)
├── components/       # React components (ui, features, sections)
├── context/          # Theme management (ThemeSwitch)
├── data/             # Mock data (will be replaced by onOffice API)
├── hooks/            # Custom hooks
├── lib/              # Utilities and configuration
├── store/            # State management (Zustand)
└── types/            # TypeScript definitions
```

## Development Workflow

### Branch Protection

Main branch is protected with:
- ✅ Pull request required before merge
- ✅ Status checks must pass (CI)
- ✅ No direct pushes allowed
- ✅ Force push blocked

### CI/CD Pipeline

Automated pipeline runs on every push and PR:

| Job | Description |
|-----|-------------|
| Install Dependencies | `npm ci` with caching |
| Security Audit | Blocks high/critical vulnerabilities |
| Lint Code | ESLint enforcement |
| TypeScript Check | Strict type validation |
| Run Tests | Jest test suite |
| Build Application | Production build with bundle analysis |
| Lighthouse Audit | Performance/accessibility (PRs only) |

### Dependabot

Automated dependency PRs run weekly. All Dependabot PRs require **manual review and approval** — automatic merging is disabled per GitHub security policy.

### Git Workflow

```bash
# Create feature branch
git checkout -b feat/your-feature

# Make changes and commit
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feat/your-feature

# CI runs automatically
# Merge after approval + passing checks
```

## Architecture

**Next.js App Router** with Server Components by default:
- Server Components for data fetching and static rendering
- Client Components only where interactivity is required (`'use client'` at the leaf level)
- Zustand for global UI state (sidebar open/close)
- Mock data currently used for properties — will be replaced by onOffice API integration

## Security

- Automated security scanning on every push
- Dependabot weekly dependency updates
- Blocks high/critical vulnerabilities in production dependencies
- HTTPS enforced in production

## Deployment

Multi-stage Docker build with production optimizations. Supports:
- **Docker**: `docker build -t rumpke-frontend . && docker run -p 3000:3000 rumpke-frontend`
- **Cloud**: Vercel, AWS ECS, AWS App Runner

## Quality Standards

- TypeScript strict mode, no `any` types
- ESLint enforcement (no rule suppression without justification)
- Lighthouse CI monitoring on every PR

## License

Private — Rumpke Immobilien

---

**Last Updated**: June 2026 | **Status**: Active Development
