# Phase 1 Implementation Plan

Last updated: 2026-06-30  
Owner: Bhargava Gumpula

Phase 1 build plan, payments/cart, and Google Calendar scheduling. **Source-of-truth content:** `WEBSITE_REQUIREMENTS.md`, `CLASSES_INFORMATION.md`, `PERSONAL_DETAILS.md`. **How to edit:** `CONTENT_EDITING_GUIDE.md`. **Living checklist:** `NEXT_STEPS.md`. **Locked architecture (Phase 2+):** `DESIGN_ARCHITECTURE_BASELINE.md`. **Deploy:** `PI_AND_DEPLOYMENT_COMMANDS.md`.

---

## Goal

Deliver the public-facing site with core pages, class listings, contact flow, cart + Stripe payments (test mode first), **Google Calendar–driven class slots**, and accurate content.

---

## Scope (Phase 1)

### Built

- Public pages: Home, About, Projects, Classes, Contact
- Shared layout: navbar (with cart icon), footer
- Class cards with **Add** button, price badge, side cart panel, add-to-cart modal
- Contact form with email notifications
- Responsive UI (mobile + desktop)
- Hosting on Raspberry Pi via Cloudflare Tunnel

### In progress

- Stripe checkout + confirmation emails (test mode locally)
- Testimonials (hidden until quotes exist)

### Not started (Phase 1)

- Google Calendar slot sync (replaces manual `classSchedule.ts` — see below)
- Pi Stripe + production webhook deploy

### Phase 2+ (not Phase 1)

See `DESIGN_ARCHITECTURE_BASELINE.md`: auth, blog, admin dashboard, restricted resources, AI chatbot, membership.

---

## Tech

- Frontend: Next.js + TypeScript + Tailwind CSS
- Content: `src/data/siteContent.ts`
- Schedule: **Google Calendar API** (private teaching calendar + service account)
- API routes: contact, checkout, Stripe webhook, calendar slots (planned)
- Payments: Stripe Checkout (test mode first)
- Cart: React context + localStorage
- Secrets: `.env` on Pi (see Stripe setup below) — never commit

---

## Site map

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects |
| `/classes` | Classes |
| `/contact` | Contact |
| `/checkout/success` | After payment (planned) |
| `/checkout/cancel` | Cancelled payment (planned) |

---

## Content editing

### Primary file

`src/data/siteContent.ts` — live website content. Update class/pricing details here first, then mirror any long-form notes in this doc if needed.

### Key fields

- `siteIdentity` — brand, SEO title/description
- `homeContent`, `aboutContent`, `projects`, `classes`, `testimonials`
- Class `status`: `"Open"` → **Add** button · `"Coming Soon"` → disabled Add

### After editing

```bash
npm run build:webpack
```

---

## Personal & profile content

### Links

- GitHub: https://github.com/bhargava-gumpula
- WCA: https://www.worldcubeassociation.org/persons/2019GUMP01
- YouTube: https://www.youtube.com/@BhargavaGumpula

### Skills (summary)

Python, C, C++, SQL, HTML, CSS, JavaScript, Flask · USACO Bronze · Harvard CS50x, CS50P · Codio C++ · competitive cubing (7.8s best, ~11s avg, 8+ competitions)

### Projects (summary)

- **LED Controller (CS50x)** — https://www.youtube.com/watch?v=UnIvxDrQVKg · https://github.com/bhargava-gumpula/cs50/tree/main/project
- **Grocery Store (CS50P)** — https://www.youtube.com/watch?v=BkqTLnhLsCg

---

## Classes

### Overview

| Class | Formats | Delivery | Status |
|-------|---------|----------|--------|
| Rubik's Cubing | 1-on-1, Group (5–8) | 1-on-1: in person or online · Group: in person only | Open |
| Python | 1-on-1, Group (5–8) | Same | Open |
| DSA | Group | TBD | Coming Soon |
| Intro to C++ | Group | TBD | Coming Soon |

**Session length:** 45 minutes · **Online 1-on-1:** Zoom (site says "online" only)

### Pricing

| Class | Price |
|-------|--------|
| Rubik's 1-on-1 | $20 |
| Rubik's group | $10 |
| Python 1-on-1 | $25 |
| Python group | $15 |

Rubik's beginner track: about **4–6 classes** to learn the cube.

### Locations (internal — not on website until calendar page)

- **Evergreen Branch Library** (primary)
- **Garage** (backup)

### Audience (cart + calendar)

| Preference | Age |
|------------|-----|
| Young | Below high school |
| Adult | High school and above |

Young/adult is selected in the Add modal. Calendar event titles use the class name only (audience is not in the title for now).

---

## Google Calendar scheduling

### Decisions

| Topic | Decision |
|--------|----------|
| Source of truth | **Private** Google Calendar (teaching schedule) |
| Auth | **Service account** (read + write) — calendar shared with service account |
| Event titles | Must **exactly match** class registration title (see table below) |
| Group capacity | **8** max per event |
| 1-on-1 capacity | **1** max per event |
| When full | Append **`(BOOKED)`** to event title; hide from picker |
| Slot UI | Show **X slots remaining** per time option |
| Time display | **Visitor's local time** (browser converts from event UTC) |
| Manual schedule file | `classSchedule.ts` replaced once G2–G3 ship |

### Calendar event titles (must match exactly)

Use the same names as `getClassRegistrationTitle()` in `siteContent.ts`:

| Class on website | Google Calendar event title |
|------------------|----------------------------|
| Rubik's 1-on-1 | `Rubik's Cubing (1-on-1)` |
| Rubik's group | `Rubik's Cubing (Group)` |
| Python 1-on-1 | `Python Fundamentals (1-on-1)` |
| Python group | `Python Fundamentals (Group)` |

- Do **not** put `(BOOKED)` in the title when creating a slot — the site adds it when full.
- Events with `(BOOKED)` in the title are hidden from registration.

### User flow

1. You create a future calendar event with the class title above.
2. **Add** modal fetches slots from `/api/calendar/slots?classSlug=...`.
3. Each slot shows date/time (visitor local) + **slots remaining**.
4. Customer pays → webhook counts paid orders for that event → at cap, title becomes `… (BOOKED)`.

### Implementation phases

Track in `NEXT_STEPS.md` section D.

| Phase | What |
|-------|------|
| G1 | Teaching calendar + Google Cloud + service account + `.env` |
| G2 | Slots API — list events, count orders, return remaining |
| G3 | Add modal — live slots, local time, remaining count |
| G4 | Webhook — append `(BOOKED)` when cap reached |
| G5 | Checkout validation — reject if no spots left |

### Google Calendar setup

See **setup walkthrough** below. Env vars in `.env.example` (never commit keys).

```text
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@....iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

On the Pi, use the same vars in `~/Work/Website/.env`. Store the service account JSON outside Git; paste email + private key into `.env`.

### Architecture

```
Google Calendar (events by class title)
  → GET /api/calendar/slots → Add modal (local time, remaining)
  → Cart → Stripe Checkout
  → Webhook → orders.json + emails + (BOOKED) on calendar when full
```

---

### Card display rules

- Short teaser summaries only — no session length or full pricing in summary text
- **Price badge** on card (e.g. `$20`, `$10`) — remove `$` from group cards when summer discount goes live
- **Add** opens modal · Contact page separate for questions
- Detail pages / clickable cards: on hold
- Testimonials: no section until real quotes exist
- Summer promo: after payments live

### Card order on site

1. Rubik's 1-on-1 · 2. Rubik's group · 3. Python 1-on-1 · 4. Python group · 5. DSA · 6. C++

### Rubik's syllabus (reference)

**Levels:** sub-90s (beginner's method), sub-60s, sub-45s, sub-30s, sub-20s

**Sub-90s steps:** daisy → cross → white side → second layer → yellow cross (`F (R U R' U') F'`) → yellow edges (`R U R' U R U2 R'`) → orient corners → solve corners (`R U R' U'`)

**Sub-45s:** finger tricks, 2-look OLL/PLL · **Sub-20s:** cross, F2L, OLL (max 2 algs), PLL

**TBD:** sub-60s step 3, sub-30s outline, layer time distribution

### Python syllabus (reference)

Basics, variables, loops, conditionals, functions, classes — full lesson plan TBD

### Promotions (later)

Summer free group classes with promo code — Stripe promo codes after checkout works

---

## Payments & cart

### Decisions

| Topic | Decision |
|--------|----------|
| Provider | Stripe |
| Cart item | One session at one time slot |
| Add flow | Center **modal**: delivery → young/adult → time → add |
| Cart UI | **Side panel** from right · navbar icon + count |
| Cart storage | localStorage |
| Contact | Contact page only — not on class cards |
| Emails | Customer + admin confirmation after payment |
| Mode | Test first → live when slots ready + explicit approval |

### User flow

1. **Add** on class card → modal
2. Item in **side cart** (when slots available)
3. **Checkout** → Stripe → success/cancel pages
4. Webhook → save order → confirmation emails

**Blocked until G3:** time slots come from Google Calendar, not `classSchedule.ts`.

### Implementation phases

Track detail in `NEXT_STEPS.md` section C.

| Phase | Status |
|-------|--------|
| P1 Stripe account + products | Done (you) |
| P1 Pi `.env` keys | Pending (you) |
| P2 Cart + side panel | Done |
| P3 Add modal | Done |
| P4 ~~Manual schedule~~ | Superseded by **Google Calendar (G1–G5)** |
| P5 Stripe Checkout API + webhook | Done |
| P6 Enable add + checkout | Pending **G3** (calendar slots) |
| P7 Confirmation emails | Done |
| P8 Go live (live keys) | Pending approval |

### Stripe setup

**Test keys on Pi** — edit `~/Work/Website/.env` (never commit):

```text
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_RUBIKS_1_ON_1=price_...
STRIPE_PRICE_RUBIKS_GROUP=price_...
STRIPE_PRICE_PYTHON_1_ON_1=price_...
STRIPE_PRICE_PYTHON_GROUP=price_...
```

`STRIPE_WEBHOOK_SECRET` added in P5. See `.env.example` for full list.

**Local Mac:** copy to `.env.local`

**Live mode:** only at P8 with your approval (`pk_live_`, `sk_live_`).

**Local webhook testing (after P5):**

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` secret into `.env.local` as `STRIPE_WEBHOOK_SECRET`, then restart the dev server.

Paid orders are saved to `data/orders.json` (same pattern as contact submissions).

### Architecture

```
Google Calendar → GET /api/calendar/slots
Add → Modal → CartContext/localStorage → Side panel
  → POST /api/checkout/create-session → Stripe Checkout
  → POST /api/webhooks/stripe → orders.json + emails + (BOOKED) if full
```

Card data never stored on Pi. Validate prices server-side.

---

## Future features (post–Phase 1)

From original requirements — implement in later phases:

- Auth, restricted algorithms, blog, admin dashboard, AI chatbot
- Class detail pages, calendar page with Evergreen Branch Library
- Summer promo banner, membership
- Security hardening (see `NEXT_STEPS.md` section G)

---

## Deliverables checklist

- [x] Next.js + Tailwind scaffold
- [x] All public pages + contact API
- [x] Real content in `siteContent.ts`
- [x] Class cards, price badges, Add modal, cart side panel
- [x] Profile photo on Home/About
- [x] Stripe checkout + webhook (test mode, local)
- [x] Confirmation emails on purchase
- [ ] Google Calendar slots (G1–G5)
- [ ] Go live on Stripe (explicit approval)

---

## Acceptance criteria

- All public pages work on phone and desktop
- Classes page shows offerings, pricing badges, Add flow
- Contact form submits and notifies by email
- Cart + checkout work when calendar has open slots (G3+)
- No secrets in Git

---

## Google Calendar setup walkthrough (G1)

Do this once on your Google account. **No code until G1 is done and you approve G2.**

### Step 1 — Create a teaching calendar

1. Open [Google Calendar](https://calendar.google.com).
2. Left sidebar → **+** next to **Other calendars** → **Create new calendar**.
3. Name: e.g. `Bhargava — Class Schedule`.
4. Time zone: **Pacific Time** (recommended — visitors still see local time on the site).
5. **Create calendar**.

### Step 2 — Copy the Calendar ID

1. Click the **gear** → **Settings**.
2. Under **Settings for my calendars**, select your new teaching calendar.
3. Scroll to **Integrate calendar** → copy **Calendar ID** (looks like `abc123...@group.calendar.google.com`).
4. Save for `.env` as `GOOGLE_CALENDAR_ID`.

### Step 3 — Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com).
2. Create a project (e.g. `bhargava-website`) or pick an existing one.
3. **APIs & Services** → **Library** → search **Google Calendar API** → **Enable**.

### Step 4 — Service account

1. **APIs & Services** → **Credentials** → **Create credentials** → **Service account**.
2. Name: e.g. `website-calendar`.
3. Create → skip optional role steps → **Done**.
4. Click the new service account → **Keys** → **Add key** → **JSON** → download the file.
5. **Keep this JSON private** — do not commit to Git.

From the JSON file you need:

- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

### Step 5 — Share the calendar with the service account

1. Back in Google Calendar **Settings** → your teaching calendar.
2. **Share with specific people** → add the **service account email** (`...@....iam.gserviceaccount.com`).
3. Permission: **Make changes to events** (required for `(BOOKED)` updates).
4. **Send** (ignore the “no Google account” warning for service accounts).

### Step 6 — Add to `.env.local` (Mac) and Pi `.env` later

```text
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=website-calendar@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

- Paste the private key as **one line** with `\n` for line breaks, wrapped in quotes.
- Restart the dev server after saving.

### Step 7 — Create a test event

1. On your teaching calendar, **Create event**.
2. Title: **`Python Fundamentals (1-on-1)`** (must match exactly).
3. Pick a **future** date/time, duration **45 minutes**.
4. Save.

When G2–G3 are built, that event should appear in the Add modal with **1 slot remaining**.

### Troubleshooting

| Problem | Fix |
|---------|-----|
| No slots on site | Event title must match table above; event must be in the future; no `(BOOKED)` in title |
| API errors | Calendar shared with service account; Calendar API enabled; check `.env` |
| Wrong times | You create events in your calendar TZ; site shows visitor local time |

---

## Related docs

| Doc | Purpose |
|-----|---------|
| `WEBSITE_REQUIREMENTS.md` | Full requirements (source of truth) |
| `CLASSES_INFORMATION.md` | Class pricing, syllabus, locations |
| `PERSONAL_DETAILS.md` | Links, skills, projects |
| `CONTENT_EDITING_GUIDE.md` | How to edit `siteContent.ts` |
| `NEXT_STEPS.md` | Living checklist — update when steps complete |
| `DESIGN_ARCHITECTURE_BASELINE.md` | Locked stack & Phase 2+ plan |
| `PI_AND_DEPLOYMENT_COMMANDS.md` | Pi deploy commands |
| `NETWORKING_AND_TRAFFIC_FLOW.md` | How traffic reaches the Pi |
