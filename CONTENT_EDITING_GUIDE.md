# Content Editing Guide (Phase 1)

Use this guide to replace placeholder content quickly without editing page components.

## Primary Files to Edit

- `src/data/siteContent.ts` — live website content
- `CLASSES_INFORMATION.md` — class source of truth (pricing, syllabus, locations); update here first, then mirror into `siteContent.ts`
- `NEXT_STEPS.md` — living checklist; check off items when done

## What to Replace First

- `siteIdentity`
  - `brandName` (navbar brand text)
  - `siteTitle` and `siteDescription` (SEO metadata)
- `homeContent`
  - hero title/description/CTA labels
- `aboutContent`
  - bio paragraphs
  - skills and achievements
- `projects`
  - title, summary, stack, and links
- `classes`
  - title, category, format, level, status, summary
- `testimonials`
  - real learner/parent quotes (name can be first name or anonymized)

## Class Status Rules

- `status: "Open"` shows a direct `Register Interest` button.
- `status: "Coming Soon"` shows a non-clickable availability badge.

## Link Quality Checklist

- Ensure every external URL starts with `https://`
- Use real GitHub/YouTube/WCA links where available
- Remove `example.com` placeholders before production

## After Editing

Run:

```bash
npm run lint
npm run build
```

If both pass, content changes are safe.
