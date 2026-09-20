---
name: Nutritional Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#703a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#934e00'
  on-tertiary-container: '#ffd2b1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-kpi:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-num:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers a clinical, high-precision health analytics experience inspired by modern engineering tools and top-tier clinical interfaces. Built strictly for light mode, it eliminates clutter in favor of high visual contrast, structured modular density, and absolute data clarity. 

The aesthetic is grounded in modern corporate minimalism with an analytical precision edge: crisp white cards, hairline borders, muted functional tints, and systematic data visualization. The emotional response is one of control, clinical reliability, and quiet encouragement—transforming complex metabolic metrics and nutrition logs into actionable, calm insights.

## Colors

The palette is engineered for cognitive clarity, separating navigation and primary execution from nutritional status metrics:

- **Primary (`#4F46E5` / Deep Indigo):** Dedicated strictly to primary user actions, high-level interactive states, active tab triggers, and key system commands.
- **Secondary (`#059669` / Muted Emerald):** Anchors success states, macro target completions, positive caloric balance, and affirmative status indicators.
- **Tertiary (`#D97706` / Warm Amber):** Reserved for nearing thresholds, maintenance warnings, micronutrient anomalies, and cautionary states.
- **Critical / Negative (`#DC2626` / Crimson):** Applied exclusively to calorie/macro overages, missed critical logs, or bio-metric risk boundaries.
- **Canvas & Card Structure:** The page background sits on `#F8FAFC` (Slate-50) transitioning to `#F1F5F9` (Slate-100) for structural wells and control panels, while active content cards use `#FFFFFF`.
- **Text & Neutral Contrast:**
  - Primary text and metrics: `#0F172A` (Slate-900)
  - Secondary text and descriptive copy: `#475569` (Slate-600)
  - Captions, meta tags, and inactive labels: `#94A3B8` (Slate-400)
  - Structural hairline borders: `#E2E8F0` (Slate-200)

## Typography

Typographic discipline relies entirely on Geist, selected for its technical precision, neutral geometry, and superior tabular rendering of numerics.

- **KPI Numbers & Macro Metrics:** Use `title-kpi` with font-variant-numeric set to `tabular-nums` so numbers align seamlessly across rows and columns.
- **Hierarchy:** High visual contrast is established via size and weight rather than decorative shifts. Headlines are tightly tracked with negative letter spacing to project modern utility.
- **Microcopy & Metadata:** Labels and captions use `label-sm` in all-caps or title case with slight positive letter tracking to maximize legibility against subtle badge fills and slate borders.

## Layout & Spacing

The layout is built around an analytical 12-column grid that shifts gracefully between dashboard density and focused analytical workflows:

- **Canvas & Containers:** Mobile uses fluid full-width blocks with `margin` (16px). Desktop standardizes on a max-width layout of 1440px with a responsive sidebar and a primary canvas framed by `margin-desktop` (32px).
- **Column Grids:** Desktop layout splits into standard analytical blocks: 4-column metric cards (3-card row), 6-column meal breakdown panels (2-column split), or an 8/4 split for primary analytics versus daily summary streams.
- **Component Padding Scale:** 
  - Standard card interior: `space-lg` (24px) for desktop, `space-md` (16px) for mobile.
  - Condensed KPI / Macro summary tiles: `space-md` (16px).
  - Compact inputs and segmented controls: `space-xs` (4px) to `space-sm` (8px).

## Elevation & Depth

Depth is established through low-contrast physical layers rather than heavy drop shadows:

- **The Baseline Layer:** The page background `#F8FAFC` sits at the floor. Recessed utility panels (e.g., filter wells, metric bars) use `#F1F5F9`.
- **Card Surfaces:** Active interactive content cards use pure `#FFFFFF`, bounded by a sharp 1px border of `#E2E8F0`. 
- **Shadow Profile:** Elevation is feather-light (`shadow-sm`): `0px 1px 2px 0px rgba(15, 23, 42, 0.05)`. This creates crisp, tactile separation without introducing dark or muddy blurs.
- **Hover & Active States:** On hover, interactive analytical cards shift their border to `#CBD5E1` and transition their shadow to `0px 4px 6px -1px rgba(15, 23, 42, 0.07), 0px 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Modals & Overlays:** Floating popovers and meal-logging drawers utilize `#FFFFFF` with a crisp border and elevated shadow: `0px 20px 25px -5px rgba(15, 23, 42, 0.08), 0px 8px 10px -6px rgba(15, 23, 42, 0.04)`.

## Shapes

The design system maintains a balanced geometry (`roundedness: 2`):

- **Cards & Data Panels:** Standard radius of `0.5rem` (8px). Larger parent containers or overview modules step up to `0.75rem` (12px) to frame nested items cleanly.
- **Buttons & Text Inputs:** `0.5rem` (8px) ensures cohesion with card geometry.
- **Micro Badges & Tills:** Macro pill badges, status indicator chips, and segmented progress bars use full rounded pills (`9999px`) to visually separate continuous status data from structured card containers.

## Components

### Buttons
- **Primary:** Background `#4F46E5`, foreground `#FFFFFF`, border none, 8px radius. Hover: `#4338CA`. Active: `#3730A3`.
- **Secondary / Outline:** Background `#FFFFFF`, foreground `#0F172A`, 1px solid border `#E2E8F0`, 8px radius. Hover: `#F8FAFC` and border `#CBD5E1`.
- **Ghost:** Background transparent, foreground `#475569`. Hover: `#F1F5F9` and foreground `#0F172A`.

### Status Badges & Pill Tints
Badges use 10% opacity soft-tinted backgrounds matched with high-contrast text:
- **Success / Target Hit:** Background `#ECFDF5` (Emerald-50), text `#047857` (Emerald-700), border `1px solid #A7F3D0`.
- **Warning / Approaching:** Background `#FFFBEB` (Amber-50), text `#B45309` (Amber-700), border `1px solid #FDE68A`.
- **Alert / Over Limit:** Background `#FEF2F2` (Red-50), text `#B91C1C` (Red-700), border `1px solid #FECACA`.
- **Neutral / Meta:** Background `#F1F5F9` (Slate-100), text `#475569` (Slate-600), border `1px solid #E2E8F0`.

### KPI & Macro Progress Tiles
- White surface `#FFFFFF`, 1px border `#E2E8F0`, 16px padding.
- Displays label in `label-sm` (`#94A3B8`), metric total in `title-kpi` (`#0F172A`), followed by target limit metadata.
- Integrated mini progress tracks: 6px track height, `#F1F5F9` background, `#059669` fill for protein/carbs/fats up to 100%, transitioning immediately to `#DC2626` upon overshoot.

### Segmented Progress Bars
- Multi-nutrient distributed bars use an 8px track height with rounded pill ends.
- Segments divide calories across meals or macros (e.g., Protein `#4F46E5`, Carbs `#059669`, Fats `#D97706`).
- Include a 2px vertical white separator between contiguous values.

### Form Inputs & Selectors
- Height 40px, background `#FFFFFF`, border 1px solid `#E2E8F0`, padding 0 12px, font size 14px.
- Focus state: border-color `#4F46E5`, box-shadow `0 0 0 3px rgba(79, 70, 229, 0.12)`.
- Placeholder text: `#94A3B8`.

### Lists & Meal Logs
- Borderless rows separated by `1px solid #F1F5F9` dividers.
- Hover row background: `#F8FAFC`.
- Left: Meal title and timestamp (`body-md` bold, subtext in `body-sm` `#94A3B8`).
- Right: Numerical macro badges aligned with `code-num` formatting.