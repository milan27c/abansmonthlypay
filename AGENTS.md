# Abans Tiken Tika Pay — Prototype

An affordability-first device shopping prototype for Abans (Sri Lanka). The user tells us
what they can pay **per month**, and we surface the phones they can actually get. After
picking a device they complete a short application, and the request is routed to their
nearest Abans showroom.

This is a **design prototype**. No real backend, no real payments, no real email delivery.
Fidelity of look, motion, and flow matters more than production robustness.

---

## Stack

- **Astro 7** — pages, layouts, static shell
- **React islands** (`@astrojs/react`) — anything stateful: affordability input, filters,
  device modal, application stepper
- **Tailwind CSS v4** with design tokens as CSS custom properties
- **Node >= 22.12**

### Dev server

Always start in background mode:

```
astro dev --background
```

Manage with `astro dev stop`, `astro dev status`, `astro dev logs`.

---

## Product flow

```
Landing (/)
  └─ Nav + Hero banner
  └─ "What can you pay each month?" input          ← the hook of the whole product
  └─ Brand filter chips (derived from affordable set)
  └─ Product grid (filters live, no page reload)
        └─ Device detail modal — front view, key specs, monthly plan breakdown
              └─ "Apply for this device"
                    └─ Application stepper (/apply)
                          1. Personal      name, email, phone, NIC
                          2. Location      address, province → district
                          3. Showroom      showrooms filtered by district
                          4. Review        summary of everything above
                    └─ Confirmation screen
```

### Behaviour rules

- **Affordability is the primary filter.** Everything below the input reacts to it.
  Products above budget are hidden by default, but offer a "show slightly over budget"
  escape hatch rather than a dead end.
- **Monthly price is the headline number** on every card — the total device price is
  secondary, smaller, muted.
- **Device card anatomy is fixed**: 3:2 product shot on white → name (up to two lines,
  then an ellipsis) → monthly figure, tenure and cash price, with a "View" button beside
  them. Prices are pinned to a common baseline by `mt-auto`, not by reserving height under
  the name. The whole card is clickable, but the button is the only tab stop, so the card
  itself is a `div` rather than a nested button.
- **Province → District → Showroom is a strict cascade.** Changing province clears
  district and showroom. Changing district clears showroom.
- **The stepper preserves state** when moving backwards. Never wipe entered data.
- **Validate on blur, not on keystroke.** Errors appear below the field, in red, and the
  field gets a subtle red ring — no layout shift when the message appears.
- **The confirmation is honest about what happens next**: the branch has been notified and
  will contact the user. Do not imply the device is reserved or approved.
- **No email is actually sent.** Simulate with a short delay, then show the confirmation.

---

## Design system

### Colors

Defined once as CSS custom properties, consumed through Tailwind. Never hardcode a hex in
a component.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#F6F6F6` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, modals, sheets, inputs |
| `--color-primary` | `#791F7F` | Primary buttons, active states, accents |
| `--color-primary-hover` | `#631968` | Primary hover — darkened primary |
| `--color-primary-soft` | `rgba(121,31,127,0.08)` | Selected chip / row tint |
| `--color-primary-softer` | `rgba(121,31,127,0.04)` | Hover tint on an unselected row |
| `--color-text` | `#1A1A1A` | Headings, primary text |
| `--color-text-muted` | `#6B6B6B` | Secondary text, labels, captions |
| `--color-text-subtle` | `#9A9A9A` | Placeholder, meta, disabled |
| `--color-divider` | `#E8E8E8` | Separators only (see borders rule) |
| `--color-error` | `#C1121F` | Validation errors |
| `--color-error-soft` | `rgba(193,18,31,0.08)` | Error field tint |
| `--color-warning` | `#B85C00` | "Slightly over" budget tag |
| `--color-warning-soft` | `rgba(184,92,0,0.10)` | Warning tag backing |
| `--color-success` | `#1E8E5A` | Confirmation state |
| `--color-success-soft` | `rgba(30,142,90,0.10)` | Confirmation icon backing |

#### Primary scale

Shades and tints of `#791F7F`, all held at hue 296° so the ramp reads as one
colour. `--color-primary` is an alias of `600`, `--color-primary-hover` of `700`.

| Token | Value | Use |
|---|---|---|
| `--color-primary-50` | `#FBF3FC` | Product image panels, lightest wash |
| `--color-primary-100` | `#F6E3F8` | Progress track, badge fill, chip hover |
| `--color-primary-200` | `#EBC4EE` | Completed step marker, hero gradient stop |
| `--color-primary-300` | `#D996DE` | Muted text on `900` backgrounds |
| `--color-primary-400` | `#C34DCB` | Reserved — decorative accents |
| `--color-primary-500` | `#A42AAC` | Secondary text inside primary blocks |
| `--color-primary-600` | `#791F7F` | **Base primary** |
| `--color-primary-700` | `#631968` | Hover; text on light primary tints |
| `--color-primary-800` | `#4A134E` | Reserved — pressed states |
| `--color-primary-900` | `#320E34` | Footer, dark section backgrounds |

Reach for a step on this scale before inventing a value. Anything not listed
above must be a neutral gray tint or shade. No new hues — the three status
colours (error, warning, success) are the whole exception, and they only ever
carry status.

### Typography

**SF Pro** is the primary typeface, with a system fallback stack:

```css
font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, sans-serif;
```

- Display / hero: 48–64px, weight 700, tight tracking (`-0.02em`)
- Section heading: 28–32px, weight 600
- Card title: 16–18px, weight 500 — the monthly figure carries the card, not the name
- Body: 15–16px, weight 400, line-height 1.6
- Monthly price: 24–28px, weight 700, primary color
- Label / meta: 13px, weight 500, muted, `+0.01em` tracking

### Shape & elevation

- **No borders.** Separate elements with background contrast, spacing, or shadow. Only
  exceptions: form input focus rings, explicit `--color-divider` hairlines when a visual
  break is genuinely required, and the outlined hero button — which uses a `ring`
  (box-shadow) rather than a real border, so it still adds no layout.
- **Buttons are fully rounded** — `border-radius: 9999px`. All of them, every size.
- **Cards / modals / inputs**: `border-radius: 16px` (cards, modals), `12px` (inputs,
  chips). Chips may also be fully rounded where they read as pills.
- **Shadows are very simple and soft.** Two levels only:
  - rest: `0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)`
  - raised (hover / modal): `0 4px 16px rgba(0,0,0,0.08)`
  - No colored shadows, no multi-layer glow, no inner shadows.

### Aspect ratios

Fixed so nothing shifts as images load. The switch is at `sm` (640px), not at the
`lg` layout flip — a portrait ratio at tablet width would be absurdly tall.

| Surface | Mobile (<640) | 640px and up |
|---|---|---|
| Hero banner | `971 / 1619` (0.6:1) | `1983 / 793` (2.5:1) |
| Device card image | `3 / 2` | `3 / 2` |
| Device modal image | `4 / 3` | `4 / 5`, free height from `md` |

The hero ratios are the banners' own native dimensions, carried by intrinsic
`width`/`height` attributes rather than an `aspect-*` class — the artwork is never
cropped or distorted, and the box is reserved before the image loads.

### Spacing

8px base scale. Section vertical padding 96–120px on desktop, 56–64px on mobile. Grid
gutter 24px. Content max-width 1200px.

---

## Motion

Motion is a requirement, not a garnish — but it should feel calm and expensive, never
bouncy or attention-seeking.

- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` for entrances, `cubic-bezier(0.4, 0, 0.2, 1)`
  for state changes.
- **Durations**: micro-interactions 150–200ms, element entrances 400–500ms, page/step
  transitions 300ms.
- **Hover**: cards lift `translateY(-4px)` and step up one shadow level. Buttons darken
  and scale `1.02`. Images inside cards scale `1.04` under `overflow: hidden`.
- **Scroll reveal**: fade + `translateY(24px)` via `IntersectionObserver`, triggering once,
  with a 60–80ms stagger across grid items. Never re-animate on scroll back up.
- **Number transitions**: the monthly affordability figure and price counts animate between
  values rather than snapping.
- **Stepper**: horizontal slide between steps (forward = in from right, back = in from
  left), with the progress indicator animating its fill.
- **Filtering**: products fade/scale out and in — never an instant hard swap.
- **Hero headline** carries a slow 4s breathing glow (`.text-glow`). Its resting
  `text-shadow` is on the class, not only in the keyframes, so reduced motion stops the
  movement without losing the glow.
- **Always respect `prefers-reduced-motion: reduce`** — collapse to opacity-only or none.
  The global rule neutralises every animation, so anything whose *look* depends on a
  keyframe needs that look declared as a base value too.

---

## Data

All prototype data lives in `src/data/` as plain `.ts` / `.json` modules, imported
directly. No CMS, no content collections, no fetch.

```
src/data/
  brands.ts       id, name, logo?
  devices.ts      id, brand, name, price, image, monthlyPlans[], specs{}
  locations.ts    provinces → districts
  showrooms.ts    id, name, district, address, phone
```

Keep shapes flat and obvious so they could be swapped for an API response later. All
currency is **LKR**, formatted as `Rs. 12,500` (thousands separators, no decimals).

`devices.name` holds the model only — the brand name is joined in at display time, so
"Reno 15F" renders as "Oppo Reno 15F". Brand names are title case, not each maker's own
styling (`vivo`, `realme` and `itel` all lowercase their wordmarks), so the filter chips
and card titles read as one list.

Devices carry the real Abans catalogue: model, cash price and `products/<n>/` image
number all follow that listing, and the specs are the headline figures from each maker's
public sheet.

Monthly plan model: each device carries plans for common tenures (e.g. 6 / 12 / 18 / 24
months). A device is "affordable" if **any** of its plans has a monthly value at or below
the user's stated budget — surface the shortest tenure that fits. Plans are generated
from the cash price by a per-tenure markup in `devices.ts` and rounded up to the nearest
Rs. 50, but the module exports fully materialised plan objects.

### Images

All imagery is placeholder and lives in `public/`, referenced by path string from the
data modules — not `src/assets`, so plain `<img>` rather than Astro's `<Image>`.

```
public/
  logos/          brand wordmarks — one per brand id, except Xiaomi, which has
                  none yet: `logo` is optional and the modal falls back to text
  products/<n>/   front.png — the only shot used; there is no gallery
  hero.png        1983 x 793  — hero banner, 640px and up
  mobilehero.png   971 x 1619 — hero banner, below 640px
  banner2.png     2439 x 936  — showroom strip background; the artwork is only
                  the 2172 x 724 block flush to its top-right corner
```

The showroom banner puts the storefront on the left and the pinned map on the right, and
the copy sits left. It ships pre-darkened, so the strip lays no scrim or gradient over it
— any replacement artwork has to carry its own wash or the white copy will not hold.

It also carries a feathered transparent margin, so it is not drawn `inset-0`: the image
is sized to `2439/2172` x `936/724` of the panel and anchored top-right, which lands the
opaque block exactly on the box. A replacement cropped to its own artwork can go back to
plain `inset-0` + `object-cover`.

The two hero banners are real campaign artwork: they already carry the Abans Tiken Tika
Pay lockup, the talent and the devices. Serve them through `<picture>` with a `media`
source so only the matching one is fetched — they are ~2MB each.

**Nothing may be overlaid on the centre of either banner.** The lockup sits dead centre
on desktop and the podium of phones sits mid-frame on mobile; both banners leave a clear
band at the bottom, and that is where the headline and buttons go. The desktop strip is
short, so the headline runs as a single line sized in `vw` (clamped) to track the banner,
which is a fixed 2.5:1 of the viewport width.

Both the product shots and the brand logos ship on a **white background rather than
transparency**. Anywhere one sits on a tinted surface, apply `mix-blend-multiply` so the
white drops away. Brand logos carry a lot of internal whitespace, so they need ~20px of
height to stay legible — that is why the brand filter chips are text-only. A logo would
also fight the selected chip's solid primary fill, which `multiply` turns black.

The site logo (`components/layout/Logo.astro`) and `favicon.svg` are stand-ins too.

---

## Structure

```
src/
  components/
    layout/      Logo, Nav, Footer
    home/        Hero, Shop, AffordabilityInput, BrandFilter, DeviceGrid, DeviceCard,
                 HowItWorks, ShowroomStrip
    device/      DeviceModal, SpecList, PlanBreakdown
    apply/       ApplyFlow, Stepper, StepPersonal, StepLocation, StepShowroom,
                 StepReview, Confirmation
    ui/          Button, Input, Select, Chip, Card, Modal, Reveal
  data/
  layouts/
  lib/           cn, format, affordability, validation, hooks
  pages/         index.astro, apply.astro
  styles/        global.css (tokens + base)
```

- `.astro` for anything static. React (`.tsx`) only where state or event handling is
  actually needed — keep islands small and use `client:visible` unless the component is
  above the fold (`client:load`).
- Shared primitives live in `components/ui/`. If a button, input, or card is being styled
  inline in a feature component, it belongs in `ui/` instead.
- `lib/` holds anything shared but not visual: class merging, LKR formatting, the
  affordability rules, the validators, and the React hooks (animated numbers, scroll
  reveal, debounce, focus trap).

### Island boundaries

There are exactly two islands, because each owns state its children share:

- **`home/Shop.tsx`** (`client:load`) — budget, brand filter, over-budget toggle and the
  open device. Wraps `AffordabilityInput`, `BrandFilter`, `DeviceGrid` and `DeviceModal`.
- **`apply/ApplyFlow.tsx`** (`client:only="react"`) — the whole stepper. Client-only
  because the chosen device arrives on the query string (`/apply?device=&months=&budget=`),
  so there is nothing meaningful to prerender and no hydration mismatch to reconcile.

Everything else on the page is static `.astro`.

### Scroll reveal

One CSS contract, two drivers. `.reveal` → `.reveal-in` is defined in `global.css`;
`Layout.astro` runs the observer for static markup, and `lib/hooks.ts#useReveal` covers
React trees, which hydrate after that sweep has run. Use `ui/Reveal.astro` to wrap static
blocks, or put `class="reveal"` directly on an element where a wrapper `div` would break
semantics (list items, table rows).

The site stays fully static — do not add `prerender = false` without also adding an
adapter.

---

## Conventions

- TypeScript everywhere. Type the data modules; no `any`.
- Mobile-first responsive. Breakpoints: `640 / 768 / 1024 / 1280`. Product grid goes
  1 → 2 → 3 → 4 columns.
- Every interactive element needs a visible focus state and a real accessible label.
  Modals trap focus and close on `Escape`.
- Images: use Astro's `<Image>` for anything imported from `src/assets`, always with
  `alt`. Prototype imagery lives in `public/` and is referenced by path, so it uses plain
  `<img>` — see the Images note under Data. Cards reserve their aspect ratio so nothing
  shifts on load.
- Copy is plain and direct — Sri Lankan English, no marketing filler, no exclamation marks.
- Prefer editing existing components over adding near-duplicates.

---

## Out of scope

Auth, real payment processing, actual email dispatch, admin/branch dashboard, inventory or
stock levels, credit checks, multi-language. If a task seems to require one of these, stub
it and flag it rather than building it.

---

## Astro reference

- [Routing & middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components / islands](https://docs.astro.build/en/guides/framework-components/)
- [Styling & Tailwind](https://docs.astro.build/en/guides/styling/)
