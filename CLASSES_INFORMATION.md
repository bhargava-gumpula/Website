# Classes Information (Source of Truth)

Last updated: 2026-06-29  
Owner: Bhargava Gumpula

This file is the single reference for class offerings, pricing, syllabus content, locations, promotions, and planned class-related website features. Use it when updating the live site (`src/data/siteContent.ts`) or building new class pages.

**Related docs:** `WEBSITE_REQUIREMENTS.md`, `CONTENT_EDITING_GUIDE.md`, `PHASE_1_IMPLEMENTATION_PLAN.md`, `NEXT_STEPS.md`

---

## Overview

| Class | Formats | Delivery | Status |
|-------|---------|----------|--------|
| Rubik's Cubing | 1-on-1, Group (5–8) | 1-on-1: in person or online · Group: in person only | Open |
| Python | 1-on-1, Group (5–8) | 1-on-1: in person or online · Group: in person only | Open |
| Data Structures and Algorithms | Group | TBD | Coming Soon |
| Introduction to C++ | Group | TBD | Coming Soon |

**Session length:** 45 minutes per class.

**Registration (current):** Contact form only — register interest, follow up by email.

**Online 1-on-1:** Hosted via Zoom; the website says "online" only (does not name Zoom).

---

## Class Locations (internal — not on website yet)

- **Evergreen Branch Library** — primary in-person location (most of the time)
- **Garage** — backup when the library isn't available

Location will appear on the website later with the class schedule/calendar. Do not show on the site in Bucket B.

---

## Audience (future — not on website yet)

Young vs adult is a **preference at registration**, not a separate class type or card.

| Preference | Age range |
|------------|-----------|
| Young | Below high school |
| Adult | High school and above |

Calendar will show separate slots (e.g. "Rubik's group (young)" vs "Rubik's group (adult)"). Add preference field when payment + registration are built.

---

## Pricing

### Rubik's Cube

| Format | In person | Online |
|--------|-----------|--------|
| 1-on-1 | $20 | $20 |
| Group (5–8 students) | $10 | — |

**Typical timeline:** about 4–6 classes to learn the cube (beginner track).

### Python

| Format | In person | Online |
|--------|-----------|--------|
| 1-on-1 | $25 | $25 |
| Group (5–8 students) | $15 | — |

---

## Live site card order (Bucket B)

1. Rubik's Cubing (1-on-1) — Open  
2. Rubik's Cubing (Group) — Open  
3. Python Fundamentals (1-on-1) — Open  
4. Python Fundamentals (Group) — Open  
5. Data Structures and Algorithms — Coming Soon  
6. Introduction to C++ — Coming Soon  

### Website display rules (Bucket B)

- **Card summaries:** Short teaser only. No pricing, session length, or other key details on cards.
- **Pricing:** Shown on card badge only (e.g. `$10`, `$15–$20`). Full breakdown on detail pages when built.
- **Future:** Remove **$** from group class cards when a group discount is offered.
- **Detail pages:** On hold until summaries are finalized. Cards are not clickable for now.
- **4–6 classes note:** On both open Rubik's cards only (for now — can move to detail page if you prefer).
- **Group size 5–8:** On detail page only (removed from card summaries).
- **Classes page intro:** Updated delivery-mode wording. Schedule note stays generic (no location name).
- **Home classes blurb:** Unchanged.
- **Testimonials:** No section until at least one real quote exists.
- **Summer promo:** Not until payment system is ready.

---

## Rubik's Cubing Class

### Levels offered

1. Sub 90 seconds — Beginner's method
2. Sub 60 seconds (1 minute)
3. Sub 45 seconds
4. Sub 30 seconds
5. Sub 20 seconds

### Sub 90 seconds — Beginner's method

- **Step 1:** Solve the daisy
- **Step 2:** Solve the cross
- **Step 3:** Solve the white side
- **Step 4:** Solve the second layer edges
- **Step 5:** Solve yellow cross with one algorithm: `F (R U R' U') F'`
- **Step 6:** Solve yellow cross edges with one algorithm: `R U R' U R U2 R'`
- **Step 7:** Orient yellow corners using a back-and-forth of `R U R' U'` and `U R U' R'`
- **Step 8:** Solve the cube using `R U R' U'` for each corner

**Time distribution:** TBD — First Layer / Second Layer / Third Layer

### Sub 60 seconds

- **Step 1:** Solve the cross
- **Step 2:** Solve white side
- **Step 3:** TBD

### Sub 45 seconds

- Learn finger tricks
- Learn 2-look OLL and 2-look PLL

### Sub 30 seconds

- TBD

### Sub 20 seconds

- Solve cross
- Solve F2L with minimal cube rotations (must learn F2L case algorithms)
- Solve OLL with max 2 algorithms
- Solve PLL with single algorithm

---

## Python Class

### Topics (current outline)

- Python basics
- Variables
- Functions
- Classes

### Syllabus detail

- TBD — expand with lesson-by-lesson breakdown, projects, and target outcomes

---

## Coming Soon Classes

- **Data Structures and Algorithms** — intermediate group track
- **Introduction to C++** — beginner group track

---

## Promotions

- **Summer banner:** Free group classes for the summer — free when you use a promo code
- **Not on website until payment system is ready**
- Promo code value and expiry: TBD

---

## Planned Website Features (Classes)

| Feature | Status | Notes |
|---------|--------|-------|
| Class detail pages | Not yet | Pricing by level/tier + syllabus per card |
| Class calendar page | Soon | Times, location (Evergreen Branch Library), schedule |
| Online payments | Planned | Connect bank account |
| Summer promo banner | Planned | After payments |
| Registration emails | Planned | Automated confirmation |
| Young/adult preference | Planned | With payment + registration |

**Out of scope:** Google Calendar instant meeting scheduling.

---

## Operations and Service Hours

- [ ] Take pictures (classes, cubing, teaching)
- [ ] Collect testimonials (student/parent quotes)
- [ ] Send registration emails

---

## Content Gaps

- [ ] Sub 60 seconds — Step 3 and full syllabus
- [ ] Sub 30 seconds — curriculum outline
- [ ] Rubik's Cube time distribution (first / second / third layer)
- [ ] Python — full lesson plan, projects, and duration estimate
- [ ] Class schedule (days, times, recurring vs one-off)
- [ ] Summer promo code and terms
- [ ] Payment provider choice (Stripe, etc.)

---

## Mapping to Live Site

1. Edit this file first.
2. Mirror summaries, pricing, and status in `src/data/siteContent.ts`.
3. Run `npm run build:webpack` before deploy.

See `CONTENT_EDITING_GUIDE.md` for `status: "Open"` vs `"Coming Soon"` rules.
