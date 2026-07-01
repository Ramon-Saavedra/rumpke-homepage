# Rumpke Immobilien — Project Handover Document

**Delivery Date:** July 1, 2026
**Client:** Rumpke Immobilien
**Status:** Handover / Pending onOffice API integration

---

## 1. Project Overview

This document covers the complete delivery of the **Rumpke Immobilien** web project. The system consists of two separate repositories:

| Repository | Role | URL |
|------------|------|-----|
| `rumpke-homepage` | Public-facing frontend (Next.js) | https://github.com/Ramon-Saavedra/rumpke-homepage |
| `rumpke-backend` | REST API server (NestJS + PostgreSQL) | https://github.com/Ramon-Saavedra/rumpke-backend |

### What Was Planned

A professional real estate website for Rumpke Immobilien (Bawinkel, Emsland, Lower Saxony, Germany), covering:

- Public property browsing (buy and rent), filtered by category
- Property detail pages with full information
- Contact form with lead management
- Client review system with admin moderation
- Integration with the **onOffice** CRM platform, so that properties managed inside onOffice would appear automatically on the website

### Why the Project Is Not Delivered as a Complete Product

The central feature — fetching real property listings from onOffice — could not be implemented because the required **API credentials and access to the onOffice platform were not provided by the client** during the development period.

This delivery includes:
- A fully structured frontend with all pages, layout, design, routing, SEO, CI/CD, and contact form
- A fully structured backend API with lead persistence, review management, and the database schema prepared for onOffice sync
- Property listings currently operating on **placeholder mock data** — not real client data
- The onOffice integration layer architecturally prepared but not connected

---

## 2. System Architecture

```
Browser
  │
  ▼
Next.js Frontend (rumpke-homepage)
  │  Server Components + Client Components
  │  Pages, routing, SEO, forms
  │
  ▼  HTTP  (NEXT_PUBLIC_API_URL)
NestJS Backend (rumpke-backend)
  │  REST API at /api/v1
  │  Contact leads, reviews, health probes
  │  onOffice sync stub (not yet connected)
  │
  ▼
PostgreSQL Database
  │  Leads, Reviews, OnOfficeSyncLog
  │
  ▼  (NOT YET IMPLEMENTED)
onOffice CRM API
     Real property listings + lead sync
```

---

## 3. Frontend — `rumpke-homepage`

### Tech Stack

| Technology | Version |
|-----------|---------|
| Next.js (App Router) | ^16.2.9 |
| TypeScript (strict) | ^6.x |
| Tailwind CSS | ^4.x |
| Zustand | ^5.x |
| TanStack React Query | ^5.x |
| React Hook Form + Zod | ^7.x / ^4.x |
| Framer Motion | ^12.x |
| Swiper | ^12.x |
| @vis.gl/react-google-maps | ^1.8.3 |
| Node.js | ≥24.14.0 |

### Pages and Routing

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ | Full homepage: hero video, process flow, properties grid, services, contact form |
| `/kauf` | ✅ | Buy category grid |
| `/kauf/[type]` | ⚠️ Partial | Structure done. Placeholder pending real backend data |
| `/miete` | ✅ | Rent category grid |
| `/miete/[type]` | ⚠️ Partial | Structure done. Placeholder pending real backend data |
| `/kategorie/[type]` | ✅ | Category browsing |
| `/object/[slug]` | ⚠️ Mock only | Works with mock slugs only. Requires real onOffice data |
| `/dienstleistungen` | ✅ | Services landing page |
| `/dienstleistungen/immobilien-kauf` | ✅ | |
| `/dienstleistungen/verkauf-vermietung` | ✅ | |
| `/dienstleistungen/immobilienbewertung` | ✅ | |
| `/ueber-uns` | ✅ | |
| `/kontakt` | ✅ | Contact info + functional form |
| `/impressum` | ✅ | |
| `/datenschutz` | ✅ | |

### Areas Implemented and Verifiable

- All pages, layout, design system, responsive behaviour
- Dark/light theme (persisted via `localStorage`)
- TopMenu, mobile Sidebar, CategoryNav, Footer, ScrollToTop, floating contact tooltip
- Contact form with Zod validation and German error messages
- Google Maps embed (requires valid API key)
- SEO: dynamic `sitemap.xml`, `robots.txt`, JSON-LD structured data (RealEstateAgent schema), OpenGraph, Twitter metadata, canonical URLs
- Docker multi-stage production build
- GitHub Actions CI/CD (install, security audit, ESLint, TypeScript, Jest, build, Lighthouse CI)
- 53 test suites, 514 tests passing

### Property Data — Current State

Property data is sourced from `src/data/mock-properties.ts` — **9 hardcoded fictional properties**. These are not real client properties. They are placeholders used during development while the onOffice integration is pending.

Current mock data uses Bavarian city names. Real properties for Rumpke Immobilien are in the **Emsland and Grafschaft Bentheim region of Lower Saxony**.

### Frontend Prepared for onOffice (Not Yet Connected)

| File | Purpose |
|------|---------|
| `src/lib/api-client.ts` | Defines `API_ENDPOINTS.PROPERTIES` and `API_ENDPOINTS.PROPERTY_DETAILS` |
| `src/hooks/useProperties.ts` | React Query hook ready to fetch `/properties` — not wired to any page yet |
| `/kauf/[type]`, `/miete/[type]` | Show explicit placeholder text pending backend integration |

### Frontend Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL (e.g. `https://api.rumpke-immobilien.de/api`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Yes | Google Maps JavaScript API key (billing must be enabled) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL — used for sitemap and canonical metadata |
| `NODE_ENV` | Yes | `production` for production builds |
| `ONOFFICE_API_KEY` | Future | onOffice API key — pending integration |
| `ONOFFICE_API_SECRET` | Future | onOffice API secret — pending integration |

### Frontend Installation

```bash
npm install
npm run dev        # http://localhost:3000

npm run build      # Production build
npm start          # Production server

docker build -t rumpke-frontend .
docker run -p 3000:3000 rumpke-frontend
```

---

## 4. Backend — `rumpke-backend`

### Tech Stack

| Technology | Version |
|-----------|---------|
| NestJS | ^11.x |
| TypeScript | ^5.7 |
| PostgreSQL + Prisma ORM | ^7.x |
| class-validator / class-transformer | ^0.15.x |
| helmet | ^8.x |
| @nestjs/throttler | ^6.x |
| @nestjs/terminus | ^11.x |
| Node.js | 22 |

### API Endpoints

All endpoints prefixed with `/api/v1`.

| Method | Path | Status | Notes |
|--------|------|--------|-------|
| `GET` | `/api/v1/health` | ✅ | Liveness probe |
| `GET` | `/api/v1/ready` | ✅ | Readiness — pings PostgreSQL |
| `POST` | `/api/v1/leads/contact` | ✅ | Saves lead to DB. Honeypot protection. Rate limit: 5/min |
| `POST` | `/api/v1/reviews` | ✅ | Submit review pending moderation. Rate limit: 3/min |
| `GET` | `/api/v1/reviews` | ✅ | List approved reviews |
| `GET` | `/api/v1/reviews/featured` | ✅ | List featured reviews |
| `PATCH` | `/api/v1/admin/reviews/:id/approve` | ✅ | Requires `X-Admin-Key` |
| `PATCH` | `/api/v1/admin/reviews/:id/feature` | ✅ | Requires `X-Admin-Key` |
| `DELETE` | `/api/v1/admin/reviews/:id` | ✅ | Requires `X-Admin-Key` |
| `GET` | `/api/v1/properties` | ❌ | Not implemented — requires onOffice API |
| `GET` | `/api/v1/property/:id` | ❌ | Not implemented — requires onOffice API |

### Database Models

| Model | Purpose | Notes |
|-------|---------|-------|
| `Lead` | Contact form submissions | Includes `onOfficeSyncStatus`, `onOfficeAddressId`, `onOfficeActivityId` — prepared for sync |
| `Review` | Client reviews | Approval and featured flags for moderation |
| `OnOfficeSyncLog` | Sync attempt log | Infrastructure ready, not yet populated |

### onOffice Sync — Current State

The leads service contains an explicit stub:

```typescript
// triggerOnOfficeSync() in leads.service.ts
// onOffice adapter will be injected here in the onOffice integration phase.
// Until then, the lead remains with onOfficeSyncStatus = PENDING.
```

Leads are **saved to PostgreSQL correctly** but are **never forwarded to onOffice**. They remain with `onOfficeSyncStatus = PENDING`.

### Backend Environment Variables

**The app fails to start without `DATABASE_URL` and `ADMIN_API_KEY`.**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | **Yes** | — | PostgreSQL connection string |
| `ADMIN_API_KEY` | **Yes** | — | Secret for admin endpoints (`X-Admin-Key` header) |
| `PORT` | No | `3000` | HTTP port |
| `CORS_ORIGINS` | No | `http://localhost:3001` | Allowed frontend origins |
| `SWAGGER_ENABLED` | No | — | Set `true` to enable Swagger UI |

### Backend Installation

```bash
npm install
npx prisma generate
npm run prisma:migrate:dev   # first time only
npm run start:dev
```

---

## 5. Frontend ↔ Backend Connection Status

| Integration | Status | Detail |
|-------------|--------|--------|
| Contact form → Lead persistence | ✅ Ready to connect | Frontend POSTs to `NEXT_PUBLIC_API_URL/v1/leads/contact`. Backend endpoint exists. Works when both are running and env is configured. |
| Property listings | ❌ Not connectable yet | Frontend calls `/properties` and `/property/:id` — **these endpoints do not exist in the backend**. Requires onOffice integration first. |
| Reviews UI | ❌ Backend ready, frontend missing | Backend reviews API is complete. Frontend has no reviews display or submission UI. |

---

## 6. What Is Done vs. What Is Pending

### Done

- Complete frontend: all pages, layout, design system, dark/light theme, SEO, Docker, CI/CD, 514 tests
- Backend: lead persistence, full reviews system with admin moderation, health probes, rate limiting, Prisma migrations, CI/CD

### Pending

- **onOffice API integration** — blocked: credentials were never received
- **Property listing endpoints** in the backend
- **Real property data** on `/kauf/[type]`, `/miete/[type]`, `/object/[slug]`
- **Lead sync to onOffice** (stub in place)
- **Email notifications for leads** (schema field exists, logic missing)
- **Reviews UI** in the frontend
- **Google Maps billing** — must be enabled on Google Cloud
- **Production environment variables** — must be configured before deployment

---

## 7. Security Notes

- All `.env` files are excluded from both repositories via `.gitignore` — not included in this delivery
- Both `.env.example` files contain only empty or commented placeholder values — no real credentials
- No API keys, tokens, or secrets are present in source code of either repository
- CI/CD pipelines use GitHub Actions encrypted secrets for sensitive values
- Automated security dependency scanning runs on every push in both repositories

---

## 8. Recommendations for a Continuing Developer

1. **Obtain onOffice API credentials.** This is the single blocker. Contact onOffice to get API access for the Rumpke Immobilien account.

2. **Build the onOffice property adapter** in the backend — a new NestJS module that fetches listings and exposes `GET /api/v1/properties` and `GET /api/v1/property/:id`. The frontend hook `src/hooks/useProperties.ts` is ready to consume it.

3. **Complete the lead sync** — inject the onOffice adapter into `triggerOnOfficeSync()` in `leads.service.ts`. DB fields are already in place.

4. **Wire `useProperties` to the listing pages** (`/kauf/[type]`, `/miete/[type]`) once the backend endpoint exists. Replace the placeholder content.

5. **Replace mock property data** — remove `src/data/mock-properties.ts` and update the homepage grid, TripleSlider, and `/object/[slug]` to use live API data.

6. **Configure Google Maps** — enable billing on Google Cloud and set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

7. **Build the reviews UI** in the frontend — the backend API is complete and ready.

8. **Set up PostgreSQL** for the backend and apply migrations with `npm run prisma:migrate:deploy`.

9. **Configure all production environment variables** in your hosting platform before going live.

---

*This document describes the state of the project as delivered on July 1, 2026. All work was completed to the extent possible without access to onOffice API credentials.*
