# PGOS Premium UI (React + Vite)

A working PG management SaaS frontend MVP with three portals:
- Company Admin (Master Control)
- PG Owner / Manager / Staff
- Tenant Portal

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Demo login credentials

- Owner/Manager/Staff: `owner@demo.com` / `owner123`
- Tenant: `tenant@demo.com` / `tenant123`
- Company Admin: `admin@demo.com` / `admin123`

## Environment variables

Copy `.env.example` to `.env` and fill with your own values:

```bash
cp .env.example .env
```

Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_MASTER_CONTROL_EMAIL`
- `VITE_MASTER_CONTROL_PHONE`
- `VITE_MASTER_CONTROL_PASSWORD`

The app runs in mock-data mode when Supabase is not configured.

## Implemented product scope

- Clickable side navigation and dashboard cards
- Owner pages: dashboard, properties, rooms, tenants, payments, expenses, food, complaints, notices, visitors, checkout, documents, agreements, staff, white-label site, reports, settings
- Tenant pages: home, rent, food, issues, notices, profile
- Company admin pages: overview, owners, active PGs, revenue, support, onboardings, plans, payments, employees, settings
- CRUD modal flow with search, empty state, status/update handling via local state
- Toast feedback and logout flow

## Notes

- Uploaded reference file is preserved at `src/App.from-upload.incomplete.jsx`.
- Secrets are not hard-coded in source code.
