# Design and Architecture Baseline (Locked)

Baseline version: v1.0  
Locked on: 2026-06-20  
Owner: Suresh

This file is the approved source of truth for the current website design and architecture direction.  
If any major decision changes, add a new version section instead of replacing this baseline.

## 1) Product Goal

Build a personal platform that showcases:

- Projects and achievements
- Personal profile and updates
- Teaching classes (Rubik's Cubing, Python, C++)
- Contact and conversion pathways
- Extensible architecture for future memberships, restricted resources, and personalization

## 2) Locked Tech Stack

- Frontend: `Next.js + TypeScript`
- Backend: `Node.js + Express`
- Database: `PostgreSQL`
- Auth strategy: Email/password with role-based access
- Blog management: In-site admin dashboard editor
- Hosting target: Raspberry Pi (preferred)

## 3) Information Architecture (Site Map)

- `/` Home
- `/about` About
- `/projects` Projects
- `/classes` Classes
- `/resources` Resources (public + restricted sections)
- `/blog` Blog list
- `/blog/[slug]` Blog post
- `/contact` Contact
- `/signin` Sign in
- `/signup` Sign up
- `/dashboard` Admin dashboard

## 4) UX Flow Model

Primary conversion flow:

- Home -> Classes -> Class Detail -> Register

Secondary flow:

- Home -> Projects/About/Blog (trust building) -> Contact or Classes -> Register

Trust-building elements:

- Public projects with external proof links (GitHub/YouTube/demo)
- About and achievements
- Testimonials
- Clear class details and status labels
- Active updates through blog content

## 5) Visual Direction (Locked)

- Minimalistic interface
- Fast, easy navigation
- Subtle micro-interactions (hover/focus effects)
- Responsive, cross-device behavior (mobile + desktop + larger screens)
- Graphics support for Rubik's cube / Python branding and personal profile photo

Implementation strategy note:

- Use a mobile-first CSS workflow to ensure strong phone usability and scale up cleanly for desktop/tablet.

## 6) Access and Content Rules

- Rubik's cube algorithms are restricted to authenticated users
- Public and private resources will coexist in the resources area
- Future-ready membership model is planned for premium content and personalized training

## 7) Class Management Behavior

- Classes support status states:
  - Open
  - Coming Soon
  - Closed (future-safe)
- Admin can switch classes from Coming Soon to Public/Open without code changes

## 8) Phase Plan (Locked)

Phase 1: Public foundation

- Home, About, Projects, Classes, Contact
- Shared navbar/footer and responsive layout
- Contact and class-interest flow
- Testimonials included in public pages

Phase 2: Core platform features

- Authentication and account model
- Restricted resource access
- Registration persistence and workflows

Phase 3: Admin and publishing

- Admin dashboard for classes/blog/resources
- Content publishing and visibility controls

Phase 4: Intelligent and membership features

- AI chatbot for navigation + contact support
- Membership and personalized training enhancements

## 9) Baseline Change Policy

- Minor copy/layout updates can be done without a new baseline version
- Any major stack, auth, database, or flow change requires:
  - new version header (v1.1, v2.0, etc.)
  - short "why changed" note
  - updated lock date
