# Wayfare — Tour Booking App

A tour/experience booking app in the same spirit as GetYourGuide (search
activities, view a detail page, pick a date and number of people, check
out, get a confirmation) — with its own color palette (deep plum + gold)
and its own sample data.

Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma.
Locally it uses SQLite (zero setup); in production on Vercel it uses
Postgres.

## 1. Run it locally

```bash
npm install
npx prisma migrate dev --name init   # creates dev.db and the tables
npm run seed                          # loads sample tours
npm run dev
```

Open http://localhost:3000.

## 2. Push it to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Wayfare tour booking app"
gh repo create wayfare-tours --public --source=. --remote=origin --push
```

(No `gh` CLI? Create an empty repo on github.com first, then:)

```bash
git remote add origin https://github.com/<your-username>/wayfare-tours.git
git branch -M main
git push -u origin main
```

## 3. Deploy to Vercel

Vercel's serverless functions have no persistent disk, so SQLite won't
work in production — you need a real Postgres database. The free tier of
either of these takes about 2 minutes to set up:

- **Vercel Postgres** (from the Vercel dashboard: Storage → Create
  Database → Postgres) — it auto-fills the `DATABASE_URL` env var for you.
- **Supabase** (supabase.com) or **Neon** (neon.tech) — copy the
  connection string they give you.

Steps:

1. Change the datasource in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Go to vercel.com → **Add New Project** → import your GitHub repo.
3. In the project's **Environment Variables**, set `DATABASE_URL` to your
   Postgres connection string (skip this if you used Vercel Postgres —
   it's already set).
4. Deploy. On the first deploy, run the migration and seed once against
   the production database from your machine:
   ```bash
   DATABASE_URL="<your production connection string>" npx prisma migrate deploy
   DATABASE_URL="<your production connection string>" npm run seed
   ```
5. Visit the URL Vercel gives you (`your-project.vercel.app`).

Every future `git push` to `main` redeploys automatically.

## Project structure

```
app/
  page.tsx                    Home page (hero + featured tours)
  activities/page.tsx         Search & filter listing
  activities/[slug]/page.tsx  Tour detail + booking widget
  booking/new/page.tsx        Checkout (date/people already chosen)
  confirmation/[id]/page.tsx  Booking confirmation
  api/activities/route.ts     GET  /api/activities?q=&category=
  api/bookings/route.ts       POST /api/bookings
components/
  BookingWidget.tsx           Date + participant picker (detail page)
  CheckoutForm.tsx            Name/email form that creates the booking
prisma/
  schema.prisma               Activity + Booking models
  seed.js                     Sample tours (Accra, Cape Coast, Kyoto…)
```

## Customizing further

- **Colors**: edit the `plum`, `gold`, `sand` values in
  `tailwind.config.js`.
- **Sample tours**: edit `prisma/seed.js`, then re-run `npm run seed`.
- **Real payments**: swap the "Confirm booking" step in
  `components/CheckoutForm.tsx` for a Stripe Checkout session — ask if
  you want that wired in.
- **Accounts / guide dashboard / reviews**: not included in this MVP;
  the data model and API routes are structured so they're
  straightforward to add on top.
