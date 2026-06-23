# Phase 1 Implementation Plan

Goal: deliver the public-facing first release with core pages and inquiry flows.

## Scope (Phase 1)

- Public pages:
  - Home
  - About
  - Projects
  - Classes (listing only)
  - Contact
- Shared layout:
  - Top navigation
  - Footer with social/external links
- Initial CTA flow:
  - Home -> Classes -> Contact/Register interest
- Responsive UI:
  - Mobile and desktop support from day one

## Out of Scope (Phase 1)

- Authentication (sign in/sign up)
- Restricted resource gating
- Admin dashboard editor
- Blog CMS/editor
- AI chatbot integration

## Proposed Tech for Phase 1

- Frontend: Next.js + TypeScript
- Styling: Tailwind CSS
- Backend API (minimal): Node.js + Express
- Data storage for v1 pages:
  - Option A: static JSON content
  - Option B: PostgreSQL-backed API (can be added in Phase 2)

## Information Architecture

- `/` Home
- `/about` About
- `/projects` Projects
- `/classes` Classes
- `/contact` Contact

## Page Content Blueprint

### Home

- Hero: identity + primary CTAs (`View Classes`, `See Projects`)
- Highlight strip: projects, students, achievements
- Featured section: selected projects/classes
- Testimonials preview (2-3 cards)

### About

- Bio and profile image
- Skills and achievements
- Journey/timeline summary

### Projects

- Project cards with:
  - title
  - description
  - stack tags
  - external links (GitHub/YouTube/demo)

### Classes

- Category cards:
  - Rubik's Cubing
  - Python
  - C++
- Class metadata:
  - 1-on-1 or Group
  - level
  - status (`Open`, `Coming Soon`)
- CTA: `Register Interest`

### Contact

- Contact form fields:
  - name
  - email
  - inquiry type
  - message
- Confirmation state after submit

## Core Components

- `Navbar`
- `Footer`
- `HeroSection`
- `SectionHeader`
- `ProjectCard`
- `ClassCard`
- `TestimonialCard`
- `ContactForm`

## Phase 1 Deliverables Checklist

- [x] Next.js TypeScript app scaffolded
- [x] Tailwind configured
- [x] Shared layout (navbar/footer)
- [x] Home page built
- [x] About page built
- [x] Projects page built
- [x] Classes page built
- [x] Contact page + submit handler built
- [x] Mobile + desktop responsive pass completed
- [x] Content placeholders wired for easy replacement

## Acceptance Criteria

- Users can navigate all public pages without dead links
- Classes page clearly presents offerings and class status
- Contact form submits successfully and shows feedback
- UI is usable and visually clean on phone and desktop
- Testimonials are visible on at least one public page

## Next Immediate Step

Replace placeholder content in `src/data/siteContent.ts` with real project/class/testimonial/profile data and perform device QA on phone + desktop.
