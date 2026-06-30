# Next Steps

Last updated: 2026-06-30  
Owner: Bhargava Gumpula

Living checklist. Details live in **`PHASE_1_IMPLEMENTATION_PLAN.md`**.

---

## A. Content gaps

- [ ] Rubik's Cube — Sub 60s Step 3, Sub 30s outline, layer time distribution
- [ ] Python — full lesson plan, projects, session count
- [ ] Summer promo — code, terms, expiry

---

## B. Phase 1 site sync (done)

- [x] Class content in `siteContent.ts`
- [x] Class cards, price badges, Classes page intro
- [x] Build QA + device QA
- [x] Profile photo on Home/About
- [ ] Testimonials — when quotes available
- [ ] Class / teaching photos

---

## C. Payments & cart

See **Payments & cart** in `PHASE_1_IMPLEMENTATION_PLAN.md`.

- [x] P1 — Stripe test account + products (you)
- [ ] P1 — Copy test keys + Price IDs to Pi `.env`
- [x] P2 — Cart side panel + navbar icon
- [x] P3 — Add modal, Register → Add
- [x] P5 — Stripe Checkout API + webhook + success/cancel pages
- [x] P7 — Confirmation emails (customer + admin)
- [ ] P6 — Full checkout on live site (Pi deploy + production webhook)
- [ ] P8 — Go live (live Stripe keys — explicit approval)
- [ ] Summer promo · class detail pages · public calendar page (later)

---

## D. Google Calendar scheduling

See **Google Calendar scheduling** + **setup walkthrough** in `PHASE_1_IMPLEMENTATION_PLAN.md`.

- [x] G1 — Teaching calendar + Cloud project + service account + `.env`
- [x] G2 — Slots API (events, remaining count)
- [x] G3 — Add modal (local time, slots remaining)
- [x] G4 — Webhook → `(BOOKED)` when cap reached (group 8, 1-on-1 1)
- [x] G5 — Checkout validation (no overbooking)

---

## E. Platform (Phase 2+)

- [ ] Auth · restricted resources · blog · admin · AI chatbot

See `DESIGN_ARCHITECTURE_BASELINE.md`.

---

## F. Operations

- [ ] Class photos · testimonials

---

## G. Deploy

- [x] Commit + Pi deploy (2026-06-29 price update)
- [ ] Commit cart + payments + calendar when approved

---

## H. Security (later)

- [ ] Rate limit contact form · max field lengths · security headers · honeypot · email subject sanitize · npm audit

---

## Current focus

**Pi deploy** when cart + calendar + payments are approved for production.
