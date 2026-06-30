# Next Steps

Last updated: 2026-06-29  
Owner: Bhargava Gumpula

Living checklist for website and class work. Update this file whenever a step is completed or priorities change. Class details live in `CLASSES_INFORMATION.md`.

---

## A. Content gaps (fill before detail pages)

- [ ] Rubik's Cube — Sub 60 seconds Step 3 and full syllabus
- [ ] Rubik's Cube — Sub 30 seconds curriculum outline
- [ ] Rubik's Cube — time distribution (first / second / third layer)
- [ ] Python — full lesson plan, projects, and session count
- [ ] Class schedule — days, times, recurring vs one-off
- [ ] Summer promo — promo code, terms, and expiry
- [ ] Payment provider — choose and connect (e.g. Stripe)

---

## B. Sync docs → live site (Phase 1 finish)

- [x] Create `CLASSES_INFORMATION.md` as class source of truth
- [x] Trim `PERSONAL_DETAILS.md` and cross-link docs
- [x] Update `src/data/siteContent.ts` with accurate class summaries (no pricing on cards)
- [x] Show updated class info on Classes page and class cards (no pricing)
- [x] Run `npm run build:webpack` (build QA — passed 2026-06-29)
- [x] Device QA — phone + desktop pass on all public pages (approved 2026-06-29)
- [ ] Testimonials — collect quotes and add to `testimonials[]` in `siteContent.ts`
- [x] Profile photo — wired on Home and About (`/images/bhargava-photo-v4.png`)
- [ ] Class / teaching photos — for site and social proof

---

## C. Class website features (near-term)

- [ ] Summer promo banner — site-wide with code or CTA
- [ ] Class detail pages — `/classes/[slug]` with pricing by tier + syllabus
- [ ] Class calendar page — times, location, schedule
- [ ] Registration emails — auto-reply after sign-up
- [ ] Online payments — checkout or pay link tied to registration

---

## D. Platform features (Phase 2+)

- [ ] Authentication — sign up / sign in
- [ ] Restricted resources — Rubik's algorithms behind login
- [ ] Registration persistence — real sign-up flow beyond contact form
- [ ] Blog — updates / newsletter
- [ ] Admin dashboard — edit classes, blog, visibility without code
- [ ] AI chatbot — navigation and contact help

---

## E. Operations / service hours

- [ ] Take class photos
- [ ] Collect testimonials (also tracked in B)
- [ ] Registration email workflow (manual first, then automate in C)

---

## F. Deploy and docs

- [x] Create `NEXT_STEPS.md` living checklist
- [ ] Commit doc and site updates — needs your approval
- [ ] Pi deploy after approved push — needs your approval

---

## Current focus

**Bucket B** — one step at a time with explicit approval.

| Step | Status |
|------|--------|
| B1 — Update `CLASSES_INFORMATION.md` | Done (2026-06-29) |
| B2 — Update `siteContent.ts` | Done (2026-06-29) — no pricing on cards |
| B3 — `ClassCard.tsx` $ badge | Done (2026-06-29) — review on localhost |
| B3b — Card links to detail page | On hold — add when detail page summaries are ready |
| B3c — `/classes/[slug]` detail pages | On hold — same as B3b |
| B4 — Build QA | Done (2026-06-29) — re-run passed |
| B5 — Device QA (you) | Done (2026-06-29) |
| B7 — Commit + deploy | Next — needs your approval |

**Location:** Evergreen Branch Library documented here only — **not on website** until schedule/calendar.
