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
| `/` | ✅ | Full homepage: hero video, process flow, real properties grid (server-fetched), services, contact form |
| `/kauf` | ✅ | Category grid. Full listings pending backend category filters |
| `/kauf/[type]` | ⚠️ Partial | Navigation structure ready. Categorized listings pending backend category filters |
| `/miete` | ✅ | Category grid. Full listings pending backend category filters |
| `/miete/[type]` | ⚠️ Partial | Navigation structure ready. Categorized listings pending backend category filters |
| `/kategorie/[type]` | ✅ | Category browsing |
| `/objekt` | ✅ | Paginated property listing with real backend data. Server-rendered with URL search params |
| `/objekt/[objektnrExtern]` | ✅ | Real property detail with full metadata, BreadcrumbList JSON-LD, structured data |
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
- SEO: dynamic `sitemap.xml`, `robots.txt`, JSON-LD structured data (RealEstateAgent, BreadcrumbList, Residence schemas), OpenGraph, Twitter metadata, canonical URLs
- Docker multi-stage production build
- GitHub Actions CI/CD (install, security audit, ESLint, TypeScript, Jest, build, Lighthouse CI)
- 56 test suites, 552 tests passing

### Property Data — Current State

Property data is fetched live from the backend via `GET /api/v1/properties` and `GET /api/v1/properties/{objektnrExtern}`. The backend forwards onOffice data through its REST API. The public property identifier is `objektnr_extern`, exposed as `id` in the DTOs.

Mock data (`src/data/mock-properties.ts`) and related components (`TripleSlider`, `useProperties`) have been removed. The homepage, listing page, and detail page all consume real API data.

### Property Image Contract

Images are returned as `PropertyImageDto[]`:
```typescript
interface PropertyImageDto {
  readonly id: string;
  readonly url: string;
  readonly title: string | null;
  readonly type: string | null;
  readonly position: number;
}
```

Currently the backend returns `images: []` pending the onOffice image endpoint implementation. The frontend renders an accessible placeholder (ImageOff icon) with skeleton loading and error fallback via `PropertyImage`. Once backend returns real URLs, no frontend changes are required.

### Frontend Prepared for onOffice (Not Yet Connected)

| File | Purpose |
|------|---------|
| `src/lib/api-client.ts` | Centralized URL builder with `getApiUrl()`. Defines `API_ENDPOINTS.PROPERTIES` pointing to `/v1/properties` |
| `src/lib/property-client.ts` | Typed fetch functions `getProperties()` and `getProperty()` with runtime response validation and `PropertyFetchError` mapping |
| `src/types/property-api.ts` | Full `PropertyCardDto`, `PropertyDetailDto`, `PropertyImageDto`, `Pagination`, `PublicErrorBody`, `PropertyFetchError` contracts with strict validation |
| `/kauf/[type]`, `/miete/[type]` | Navigation structure ready. Show neutral state — backend category filters are the remaining blocker |

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
| Property listings | ✅ Connected | Frontend fetches from `/v1/properties` with pagination. Backend returns real onOffice data when `ONOFFICE_ENABLED=true`. |
| Property detail | ✅ Connected | Frontend fetches from `/v1/properties/{objektnrExtern}` with full detail rendering, metadata, JSON-LD. |
| Property images | ❌ Pending | Backend returns `images: []`. OnOffice image endpoint not yet implemented. Frontend renders accessible placeholder. |
| Category filters | ❌ Pending | Backend currently supports only `page` and `limit`. `/kauf/[type]` and `/miete/[type]` show neutral state until backend category filters are added. |
| Reviews UI | ❌ Backend ready, frontend missing | Backend reviews API is complete. Frontend has no reviews display or submission UI. |

---

## 6. What Is Done vs. What Is Pending

### Done

- Complete frontend: all pages, layout, design system, dark/light theme, SEO, Docker, CI/CD, 552 tests
- Backend: lead persistence, full reviews system with admin moderation, health probes, rate limiting, Prisma migrations, CI/CD
- Property integration: live data flow from backend to frontend via typed API client with runtime validation
- Property detail: full rendering, metadata, canonical URLs, BreadcrumbList + Residence JSON-LD
- Property list: server-side pagination with accessible navigation
- Image handling: accessible placeholder, skeleton loading, error fallback

### Pending

- **onOffice image endpoint** in the backend — currently returns `images: []`
- **Backend category filters** — required for `/kauf/[type]` and `/miete/[type]` to show correct categorized results
- **Lead sync to onOffice** (stub in place)
- **Email notifications for leads** (schema field exists, logic missing)
- **Reviews UI** in the frontend
- **Google Maps billing** — must be enabled on Google Cloud
- **Dynamic property URLs in sitemap** — pending safe paginated fetch strategy or dedicated sitemap endpoint
- **Production environment variables** — must be configured before deployment
- **`next.config.ts` image remotePatterns** — must add the onOffice image hostname once confirmed

---

## 7. Security Notes

- All `.env` files are excluded from both repositories via `.gitignore` — not included in this delivery
- Both `.env.example` files contain only empty or commented placeholder values — no real credentials
- No API keys, tokens, or secrets are present in source code of either repository
- CI/CD pipelines use GitHub Actions encrypted secrets for sensitive values
- Automated security dependency scanning runs on every push in both repositories

---

## 8. Recommendations for a Continuing Developer

1. **Implement the onOffice image endpoint** in the backend. Once real image URLs are returned, no frontend changes are required — `PropertyImage` already handles the `PropertyImageDto` contract with loading, error, and fallback states. Add the image hostname to `next.config.ts` `images.remotePatterns`.

2. **Add backend category filters** (`propertyType`, `marketingType`) to `GET /api/v1/properties`. Once available, wire them to `/kauf/[type]` and `/miete/[type]` by adding query parameters to `getProperties()`.

3. **Complete the lead sync** — inject the onOffice adapter into `triggerOnOfficeSync()` in `leads.service.ts`. DB fields are already in place.

4. **Configure Google Maps** — enable billing on Google Cloud and set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

5. **Build the reviews UI** in the frontend — the backend API is complete and ready.

6. **Set up PostgreSQL** for the backend and apply migrations with `npm run prisma:migrate:deploy`.

7. **Configure all production environment variables** in your hosting platform before going live.

8. **Add dynamic property URLs to sitemap** once a safe paginated fetch strategy or dedicated sitemap endpoint is available.

9. **Add the onOffice image hostname** to `images.remotePatterns` in `next.config.ts` once confirmed.

---

*This document describes the state of the project as delivered on July 1, 2026. All work was completed to the extent possible without access to onOffice API credentials.*
