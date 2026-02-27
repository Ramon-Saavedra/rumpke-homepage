# Rumpke Immobilien - Professional Real Estate Platform

Modern, professional real estate platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏗️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Package Manager**: npm
- **Node Version**: 18.x - 20.x (tested in CI)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd rumpke-homepage-web

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npx tsc --noEmit    # TypeScript type checking
```

## 🎨 Styling Guidelines

This project uses **Tailwind CSS** with strict custom variable usage:

### ✅ Correct Usage
- Use variables defined in `src/app/globals.css`
- Examples: `bg-primary`, `text-secondary`, `border-accent`
- Use `rounded` (not `rounded-md`, `rounded-lg`)
- Use only `mb-*` for margins (margin-bottom)

### ❌ Avoid
- Direct color classes (`bg-red-500`, `text-blue-600`)
- Inline values
- Transition/transform/duration utilities
- Margin-top (`mt-*`) or combined margins
- `var(--variable)` syntax

## 🏗️ Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── immobilien/        # Property routes
├── components/            # React components
│   ├── ui/               # UI components
│   ├── form/             # Form components
│   └── properties/       # Property-specific components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── interfaces/           # TypeScript interfaces
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── store/                # State management
```

### Architecture Principles

- **Clean Architecture**: Strict separation of concerns
- **Type Safety**: TypeScript strict mode enabled
- **No `any` types**: Explicit typing required
- **Component Separation**: UI, logic, and data layers separated
- **Professional Standards**: Production-ready code quality

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Automated CI/CD pipeline runs on every push and pull request:

#### Phase 1: Basic Pipeline ✅

1. **Install Dependencies**
   - Uses `npm ci` for deterministic builds
   - Node.js 20.x on Ubuntu
   - Caches `node_modules` for faster subsequent runs

2. **Security Audit**
   - Runs `npm audit` for vulnerability scan
   - Checks all dependencies for security issues
   - Fails on high/critical vulnerabilities
   - Blocks unsafe code from production

3. **Lint Code**
   - Runs ESLint checks
   - Enforces code quality standards
   - Fails pipeline on errors

4. **TypeScript Type Check**
   - Runs `tsc --noEmit`
   - Validates type safety
   - Ensures strict TypeScript compliance

5. **Build Application**
   - Produces production build
   - **Matrix Strategy**: Tests on Node 18.x and 20.x
   - Ensures compatibility across versions
   - Validates build success
   - Stores artifacts for 7 days

#### Phase 2: Optimizations ✅

1. **Dependency Caching**
   - Caches `node_modules`
   - ~90% faster installations
   - Key: `package-lock.json` hash

2. **Build Cache**
   - Caches `.next/cache`
   - ~50-70% faster builds
   - Incremental compilation

3. **Artifacts Storage**
   - Uploads build output
   - 7-day retention
   - Available for debugging

4. **Matrix Strategy**
   - Tests on Node 18.x and 20.x
   - Ensures cross-version compatibility
   - Parallel execution per version
   - Early detection of incompatibilities

#### Phase 4: Advanced Quality 🚧

1. **NPM Audit Security Scan** ✅
   - Scans dependencies for vulnerabilities
   - Fails on high/critical severity issues
   - Runs on every push and PR
   - Prevents vulnerable code from merging

2. **Dependabot** ✅
   - Automated dependency updates
   - Weekly security and version updates
   - Pull requests for outdated packages
   - Keeps dependencies current and secure

3. **Lighthouse CI** ✅
   - Performance monitoring on PRs
   - Performance score > 90
   - Accessibility > 95
   - SEO > 90
   - Automatic performance regression detection

4. **Bundle Size Analysis** ✅
   - Monitors JavaScript bundle size
   - Tracks build artifacts
   - Reports on every build
   - Prevents bundle bloat

### Branch Protection Rules

The `main` branch is protected with:
- ✅ Required status checks before merge
- ✅ CI pipeline must pass
- ✅ No direct pushes allowed
- ✅ Pull request reviews required

### Performance Metrics

**Without Optimizations:**
- Install: ~2m 30s
- Security: 15s
- Lint: 18s
- Type Check: 19s
- Build: ~1m 45s
- **Total: ~5 minutes**

**With Optimizations:**
- Install: ~25s ⚡
- Security: 10s ⚡
- Lint: 18s
- Type Check: 19s
- Build: ~45s ⚡
- **Total: ~2 minutes**

## 🔒 Security

- **Automated Security Scanning**: `npm audit` runs on every push
  - Blocks high/critical vulnerabilities
  - Prevents insecure dependencies from reaching production
  - Regular dependency vulnerability checks
- **Dependabot**: Automated dependency updates
  - Weekly checks for outdated packages
  - Automatic PR creation for security updates
  - Keeps project dependencies current
- HTTPS enforced in production
- No sensitive data in frontend
- Backend integration via secure API layer
- XSS protection (no `dangerouslySetInnerHTML`)
- Environment variables for configuration
- Regular dependency audits via GitHub Actions

## 🌐 Deployment

This project is designed for professional deployment:

- **Platform**: Vercel, AWS, or custom hosting
- **Build Output**: Static + Server-Side Rendering
- **Environment**: Production-ready configuration
- **Domain**: Custom domain support
- **SSL**: Automatic HTTPS

## 📋 Development Rules

### Code Quality Standards

1. **No Shortcuts**: Professional architecture required
2. **One File Per Generation**: Focused, deliberate changes
3. **Type Safety**: No `any` types allowed
4. **Clean Code**: SOLID principles enforced

### Git Workflow

1. Create feature branch from `develop`
2. Make changes
3. Push and create Pull Request
4. CI pipeline runs automatically
5. Merge only after CI passes and code review

## 🧪 Testing & Quality

### Implemented ✅

- **Lighthouse CI**: Performance monitoring
  - Runs on pull requests
  - Performance score > 90
  - Accessibility > 95
  - SEO > 90
- **Bundle Size Analysis**: Tracks JavaScript bundle size
  - Prevents bundle bloat
  - Reports on every build
  - Alerts on size increases

### Planned 📋

- Unit testing framework (Vitest/Jest)
- E2E testing (Playwright)
- Code coverage reports

## 🐳 Docker Configuration

### Production Dockerfile

Multi-stage optimized Docker build:

```bash
# Build Docker image
docker build -t rumpke-frontend .

# Run container
docker run -p 3000:3000 rumpke-frontend
```

### Docker Compose

Complete stack orchestration (frontend + backend + database):

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NODE_ENV`: Environment (production/development)

## ☁️ AWS Deployment

### Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI configured
3. Docker installed locally

### Deployment Options

#### Option 1: AWS ECS (Elastic Container Service)

```bash
# Build and tag image
docker build -t rumpke-frontend .
docker tag rumpke-frontend:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/rumpke-frontend:latest

# Push to ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/rumpke-frontend:latest

# Deploy to ECS (via task definition)
aws ecs update-service --cluster rumpke-cluster --service rumpke-frontend --force-new-deployment
```

#### Option 2: AWS App Runner

- Direct GitHub integration
- Automatic deployments
- Managed scaling
- Built-in load balancing

#### Option 3: AWS EC2 with Docker

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance

# Clone repository
git clone <repo-url>
cd rumpke-homepage-web

# Run with docker-compose
docker-compose up -d
```

### AWS Architecture (Recommended)

```
┌─────────────────────────────────────────────┐
│  CloudFront CDN (Global Distribution)       │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Application Load Balancer (ALB)            │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌────────▼────────┐
│  ECS Frontend  │   │  ECS Backend    │
│  (Next.js)     │   │  (Node.js API)  │
└────────────────┘   └────────┬────────┘
                              │
                     ┌────────▼────────┐
                     │  RDS PostgreSQL │
                     │  (Database)     │
                     └─────────────────┘
```

### Cost Optimization

- Use AWS Free Tier when possible
- ECS Fargate Spot for cost savings
- CloudFront caching to reduce origin hits
- RDS instance sizing based on actual load

## 🌐 Production Deployment Checklist

- [ ] Environment variables configured in AWS
- [ ] Database migrations completed
- [ ] HTTPS/SSL certificates configured
- [ ] Domain DNS pointing to AWS resources
- [ ] CloudWatch logging enabled
- [ ] Auto-scaling policies configured
- [ ] Backup strategy implemented
- [ ] Monitoring and alerts setup

## 📦 Backend Integration (Planned)

This frontend will integrate with:
- **onOffice API**: Property management system
- **Lead Management**: Form submissions and inquiries
- **Content Management**: Dynamic property listings

All backend integration handled via secure API layer.

## 📄 License

Private - Rumpke Immobilien

## 👥 Contributing

Internal project. Follow strict development rules in `.github/copilot-instructions.md`.

---

**Quality Level**: Professional production-ready code
**Last Updated**: February 2026
**Status**: Active Development
