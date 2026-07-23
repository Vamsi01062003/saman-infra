# SAMAN INFRA & CORPORATE SOLUTIONS — Website

## Status: Phase 1 — Engineering Scaffold Complete (TypeScript)

React + Vite + TypeScript + Tailwind, token-driven design system,
typed component inventory, typed Content Model. **No business content
has been added.** Every factual field in `src/content/site.ts` is a
`Fact<T>` starting as `pendingFact()` until the client supplies real data.

## Stack

Vite · React · TypeScript · Tailwind CSS

No Bootstrap. No jQuery. No Framer Motion. No Redux. No Material UI /
Chakra. No React Router (single page — not needed).

## Structure

```
src/
  types/content.ts       — Fact<T>, CompanyInfo, Service, Project, etc.
  content/site.ts         — the single typed content source of truth
  assets/registry.ts      — ImageId -> imported asset map
  assets/{projects,services,company,logos}/  — organized by content model
  components/
    ui/        — Button, Container, Section, Card (generic primitives)
    layout/    — Navbar, Footer (page chrome)
    blocks/    — Hero, Services, Projects, Evidence, Contact (business sections)
```

`Projects.tsx` contains a local `ProjectCard` that is deliberately NOT
in `ui/` — the problem/solution/evidence layout is structurally
different from the generic `Card`, not just a density variant, so it
stays scoped to the block that owns it (Component Contract).

## Definition of Done — Phase 1 (this scaffold)

- [x] Typed end-to-end; invalid content shapes fail to compile
- [x] Displays complete page structure with honest pending states
- [x] Contains no fabricated business content
- [x] Lint config in place (`@typescript-eslint` + `jsx-a11y` as errors)
- [x] Responsive per agreed Layout Contract
- [x] Accessible by default (focus states, labels, alt text required,
      touch targets, `prefers-reduced-motion` respected)
- [x] Ready to accept audited client content without changing component code

## Phase 1.5 — Post-verification fixes (applied)

Following the architecture/QA review of the verified repository, six
fixes were applied:

1. **`Hero` now owns its own `Section`** — previously relied on
   `App.tsx` to wrap it, breaking the "every block owns its landmark"
   consistency the other blocks already had.
2. **Contact form has real validation** — was using `noValidate`
   with no custom validation to replace native browser checks,
   meaning empty submissions weren't actually blocked. Fixed with a
   `validate()` function and field-level error messages wired via
   `aria-invalid`/`aria-describedby`.
3. **`Card`'s `imageAlt` is now required** (via a `decorative`
   discriminated union) instead of silently defaulting to `''` —
   removes the accessibility footgun where a future caller could
   forget to pass alt text for a content image.
4. **Skip-to-content link** added ahead of the nav.
5. **`ErrorBoundary`** added around `<App />` so a failing block
   doesn't blank the whole page.
6. **Dev/build-time content validation** (`scripts/validate-site.ts`,
   using Zod) runs via `predev`/`prebuild` — lives outside `src/` so
   it never ships in the production bundle. Catches `Fact<T>`
   internal inconsistency, duplicate IDs, malformed URLs, and
   `imageId`s that don't resolve in the registry, before React ever
   renders.

Also added: `--color-danger` token (for form error text — kept
token-based rather than reaching for a raw Tailwind color).

**Not yet verified:** none of this has been run through a real
`npm install`/`tsc`/`vite build` — see "Engineering Notes" below.
Hero.tsx's indentation drifted slightly during editing (cosmetic
only); run `npm run format` to normalize it.

## Phase 2 — Content Integration (blocked on client)

1. Run the **Asset Audit** (Type A/B/C model) against the 9 supplied
   images. Sort into extracted photography (use directly), needs
   crop/color-grade, or replacement-needed.
2. Import real files in `src/assets/registry.ts` and map them to
   `ImageId`s, e.g.:
   ```ts
   import warehouseHyd from './projects/warehouse-hyd.jpg';
   export const images: Record<ImageId, string> = { 'warehouse-hyd': warehouseHyd };
   ```
3. Fill in `src/content/site.ts` using `confirmedFact(value)` in place
   of `pendingFact()` for each verified field, and populate the
   `services` / `projects` / `evidence` arrays with real data only.
4. Replace the placeholder accent color in `src/styles/tokens.css`
   (`--color-accent`) with the audited brand color; swap the font
   stack if a brand typeface is supplied.
5. Reconsider whether `assets/registry.ts`'s indirection still earns
   its place once every image is a real file — direct Vite imports
   give compile-time checking on their own at that point.

## Open Decisions (need agreement before Phase 2 ships)

- **Form submission target.** `ContactSubmission` (typed) is defined
  and the form UI works; nothing is wired to a backend yet. Needs a
  decision: form service (Formspree/EmailJS/Resend), a small
  serverless function, or a WhatsApp deep link. Static hosts
  (Cloudflare Pages, Netlify, Vercel) all need one of these — none
  handle form submission natively without add-on config.
- **Hosting**: Cloudflare Pages is the current recommendation (fast
  global CDN, free tier, simple GitHub-based deploys) — not yet
  provisioned.
- **Domain** — not yet specified.

## Engineering Notes

- No animation library. Motion is CSS transitions only (one duration,
  one easing, per the Motion Contract) — sufficient for this
  project's scope and lighter under the performance budget.
- All styling values resolve to `src/styles/tokens.css`. Tailwind
  exposes only semantic token names (see `tailwind.config.js`) —
  arbitrary values are unavailable by design.
- `npm install` has not been run in this environment (no network
  access in the sandbox that generated this scaffold). Run
  `npm install && npm run typecheck && npm run dev` in a normal
  environment to verify before continuing.
