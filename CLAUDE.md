# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Marketing site for **Prefersite** (https://www.prefersite.hu), a Hungarian freelance web-dev business. All user-facing copy, route slugs, SEO metadata, validation messages and most code comments are in **Hungarian** — keep new content in Hungarian and match the existing tone.

Stack: Next.js 16 (App Router), React 19, TypeScript (strict, `allowJs` — several data files are plain `.js`), Tailwind CSS v4, `motion` (`motion/react`) for animation, Lenis for smooth scrolling, `react-icons`, Resend for email.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint     # eslint (flat config: next core-web-vitals + typescript)
npx tsc --noEmit # type-check only
```

There is no test suite.

## Architecture

- **Root layout** ([app/layout.tsx](app/layout.tsx)) holds the site-wide SEO: `metadataBase`, title template `"%s | Prefersite"`, OpenGraph/Twitter, JSON-LD `ProfessionalService` schema, Google site verification. It wraps everything in [lib/site/Providers.tsx](lib/site/Providers.tsx) (Lenis root → `SoundProvider` → `TransitionProvider`) and renders `Cursor`, `Header`, `Footer` and `CookieBanner` globally.
- **Page transitions** ([lib/site/transition.tsx](lib/site/transition.tsx)): internal links must use `TransitionLink` (or `ArrowButton`, which wraps it). It plays a curtain (cover → `router.push` → reveal on pathname change) and handles same-page hash links (`/#arazas`) by scrolling through Lenis. A plain `next/link` skips the curtain.
- **Section themes**: every full-width section sets `data-theme="light"` (paper) or `"dark"` (ink). The header reads the section under it to switch its text/backdrop colour, so new sections need the attribute.
- **Sound** ([lib/site/sound.tsx](lib/site/sound.tsx)): Web Audio–synthesised hover/click tones, muted by default, toggled in the header and persisted in `localStorage` via `useSyncExternalStore`. Listeners are delegated on `document` for all `a`/`button` elements.
- **Cursor** ([lib/site/Cursor.tsx](lib/site/Cursor.tsx)): only on fine pointers; adds `has-cursor` to `<html>` (which hides the native cursor via CSS). Add `data-cursor="Label"` to an element to show a labelled pill on hover.
- **Home page** ([app/page.tsx](app/page.tsx)) stacks section components from `components/`. Nav targets `#szolgaltatasok`, `#referenciak`, `#arazas`, `#folyamat` — keep those ids stable.
- **Service pages** are data-driven: [app/szolgaltatasok/szolgaltatasData.js](app/szolgaltatasok/szolgaltatasData.js) exports `szolgaltatasokData` (one object per service: `slug`, `seoTitle`, `hero`, `importance`, `benefits`, `midCta`, `features`, `footerCta`). [app/szolgaltatasok/[id]/page.tsx](app/szolgaltatasok/[id]/page.tsx) uses it for `generateStaticParams` + `generateMetadata` and renders `ServicePageContent`. Feature icons are looked up by name in an explicit map there — a new icon name must be added to that map. Adding a service = data entry + link in [lib/navItems.js](lib/navItems.js) + mapping in [components/ServicesSection/Services.tsx](components/ServicesSection/Services.tsx) (`MyServices.js` uses different `path` keys than the page slugs).
- **Navigation & sitemap**: [lib/navItems.js](lib/navItems.js) drives header, footer and mobile menus and [app/sitemap.ts](app/sitemap.ts) (paths containing `#` are skipped). [public/llms.txt](public/llms.txt) and [app/robots.txt](app/robots.txt) are maintained by hand.
- **Shared content data**: references in [lib/referencies/refs.js](lib/referencies/refs.js) (rendered by `components/References`, also on service pages), pricing in `components/PricingDatas/pricing.ts`, process steps in `components/customerSteps/customerStepsData.js`, benefits in `components/BenefitSection/benefits.js`.
- **Contact form**: [components/Contact/ContacForm.tsx](components/Contact/ContacForm.tsx) validates client-side with [components/Contact/validate.ts](components/Contact/validate.ts) (includes a `fax_number` honeypot that returns `{ _bot: true }`), then POSTs JSON to [app/api/formSubmit/route.ts](app/api/formSubmit/route.ts), which sends an inline-HTML email via Resend. The route does no server-side validation. Requires `RESEND_KEY` in `.env`.
- **Cookie consent** is client-only (`document.cookie` in `CookieBanner`); `lib/cookies/setCookie.ts` is an unused server action.
- Files prefixed with `_` (`app/_loading.tsx`, `lib/_PageRevealWrapper.tsx`) are fully commented out / disabled — the underscore also keeps `_loading` from becoming a route file.

## Styling

- Tailwind v4 with CSS-first config: tokens live in the `@theme` block of [app/globals.css](app/globals.css) — `paper`, `paper-deep`, `ink`, `ink-card`, `stone`, `stone-light`, `green` (green is used only as a fill: primary CTA, active markers, cursor). There is no `tailwind.config.js`.
- Type scale is defined as plain classes in `globals.css`: `.type-display`, `.type-h1`, `.type-h2`, `.type-h3`, `.type-lead` (Archivo with the `wdth` axis via `font-variation-settings`). Mono (`font-mono`, JetBrains Mono) is reserved for technical data: stack names, years, prices.
- `.grain` adds the paper noise texture; `.site-gutter` is the horizontal page padding.
- Fonts come from `next/font/google` as CSS variables (`--font-archivo`, `--font-jetbrains`) mapped to `--font-sans` / `--font-mono` in an `@theme inline` block. Keep the `latin-ext` subset (Hungarian ő/ű).
- Animations respect `prefers-reduced-motion` (`useReducedMotion` in components plus a global CSS override). Use `RevealText` (word-by-word mask reveal) and `ScrollWords` (scroll-linked word highlight) from `lib/ui/` rather than ad-hoc fade-ups.

## Gotchas

- Use `motion/react` for animation, never `framer-motion` or GSAP (only the disabled `_`-prefixed files still import `framer-motion`).
- Don't read browser-only values (`localStorage`, `matchMedia`, `document.cookie`, the clock) with `setState` inside `useEffect` — the lint config (`react-hooks/set-state-in-effect`) rejects it. Use `useSyncExternalStore` with a server snapshot, as in `sound.tsx`, `Cursor.tsx`, `Footer.tsx` and `CookieBanner.tsx`.
- `npm run lint` currently reports one pre-existing error (`any` in `validate.ts`).
- Route `params` are a `Promise` and must be awaited (see the service page).
