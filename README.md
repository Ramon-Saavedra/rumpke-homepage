# Rumpke Immobilien

[![CI Pipeline](https://img.shields.io/github/actions/workflow/status/Papyrus-Saa/rumpke-homepage/ci.yml?branch=main&label=CI&logo=github)](https://github.com/Papyrus-Saa/rumpke-homepage/actions)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.9.0-brightgreen?logo=node.js)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Private-red)](LICENSE)

Professional real estate platform built with modern web technologies and enterprise-grade architecture.

## Tech Stack

- **Next.js 16.1.6** - React framework with App Router and Server Components
- **TypeScript 5.x** - Strict mode, no `any` types
- **Tailwind CSS 4.x** - Utility-first CSS with custom design system
- **ESLint 9.x** - Code quality enforcement
- **Node.js ≥20.9.0** - Runtime environment
- **GitHub Actions** - CI/CD with 2026 standards

## Quick Start

**Prerequisites:** Node.js ≥20.9.0, npm ≥10.0.0

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
```

## Project Structure

```
src/
├── app/              # Next.js App Router (routes + layouts)
├── components/       # React components (ui, features, sections)
├── context/          # React Context providers
├── hooks/            # Custom hooks
├── store/            # State management (Zustand)
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

## Development Workflow

### Branch Protection

Main branch is protected with:
- ✅ Pull request required before merge
- ✅ 5 required status checks must pass
- ✅ Branches must be up to date
- ✅ No direct pushes allowed
- ✅ Force push blocked

### CI/CD Pipeline

Automated pipeline runs on every push and PR (**~1m 37s** total):

| Job | Status | Duration | Description |
|-----|--------|----------|-------------|
| Install Dependencies | Required | ~15s | `npm ci` with caching |
| Security Audit | Required | ~12s | Blocks high/critical vulnerabilities |
| Lint Code | Required | ~20s | ESLint enforcement |
| TypeScript Check | Required | ~20s | Strict type validation |
| Build Application | Required | ~45s | Production build with bundle analysis |
| Lighthouse Audit | Optional | ~1m | Performance/accessibility monitoring |

**Pipeline Features:**
- ✅ GitHub Actions v6 (2026 standards)
- ✅ Node.js 20.20.0 runtime
- ✅ Automated dependency caching
- ✅ Build artifact storage (7 days)
- ✅ Bundle size analysis
- ✅ Performance monitoring via Lighthouse CI

### Dependabot Auto-Merge

Automated dependency updates with intelligent merging:
- ✅ Auto-approve patch/minor updates
- ✅ Auto-merge after CI passes
- ✅ Manual review required for major versions
- ✅ Weekly security updates
- ✅ Keeps dependencies current

Configuration: `.github/workflows/dependabot-auto-merge.yml`

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

**Clean Architecture** with clear separation:
- UI Layer (components)
- Feature Layer (domain logic)
- Service Layer (API calls)
- No hardcoded values
- TypeScript strict mode

## Security

- Automated security scanning on every push
- Dependabot weekly updates
- Blocks high/critical vulnerabilities
- HTTPS enforced in production
- XSS protection (no `dangerouslySetInnerHTML`)

## Deployment

Multi-stage Docker build with production optimizations. Supports:
- **Docker**: `docker build -t rumpke-frontend . && docker run -p 3000:3000 rumpke-frontend`
- **Docker Compose**: `docker-compose up -d`
- **Cloud**: Vercel, AWS ECS, AWS App Runner

## Quality Standards

- TypeScript strict mode, no `any` types
- ESLint enforcement
- SOLID principles
- One responsibility per file
- Lighthouse CI monitoring

## License

Private - Rumpke Immobilien

---

**Last Updated**: February 2026 | **Status**: Active Development
