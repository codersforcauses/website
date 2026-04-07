# Performance Report — codersforcauses.org

> Generated: 2026-02-26
> Tool: Chrome DevTools MCP (no CPU/network throttling, lab conditions)
> No CrUX field data available for this site.

---

## Summary

| Page                                 | LCP      | CLS      | Status        |
| ------------------------------------ | -------- | -------- | ------------- |
| Homepage (`/`)                       | 463 ms   | 0.00     | Good          |
| User Dashboard (`/dashboard`)        | 463 ms\* | 0.00\*   | Good          |
| Admin Dashboard (`/dashboard/admin`) | 827 ms   | **0.25** | CLS needs fix |

> \* Dashboard page not independently traced — estimated similar to homepage.

---

## Page 1: Homepage (`/`)

### Core Web Vitals

| Metric | Score  | Threshold       |
| ------ | ------ | --------------- |
| LCP    | 463 ms | Good (<2,500ms) |
| CLS    | 0.00   | Good (<0.1)     |

### LCP Breakdown

The LCP element is a `<p>` text node — no network fetch needed.

| Phase                | Time       | % of LCP  |
| -------------------- | ---------- | --------- |
| TTFB                 | 53 ms      | 11.5%     |
| Element Render Delay | **410 ms** | **88.5%** |

The large render delay is caused by Next.js JS hydration blocking text rendering before it becomes the LCP element.

### Issues

#### 1. JS Hydration Render Delay (410ms)

LCP text is not painted until after JS hydration completes.

**Fix:** Ensure the LCP text is present in the initial SSR HTML and is not dependent on client-side JS to render.

#### 2. Network Dependency Chain (critical path: 567ms)

```
HTML → CSS (a25ca756ef64d4e8.css, 400ms)
          └── Font (material-symbols-sharp.fcbbf02a.woff2, 411ms)
```

The font is only discovered after CSS is parsed. No `preconnect` hints configured.

**Fix:** Add a preload hint in `<head>` to break the chain:

```html
<link
  rel="preload"
  href="/_next/static/media/material-symbols-sharp.fcbbf02a.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

#### 3. Unsized Client Logo Images (CLS: 0.0038 — minor but recurring)

The logo carousel triggers 34 micro layout shifts (589ms–4,134ms) from unsized `<img>` elements:

| Image                 | Shifts |
| --------------------- | ------ |
| `foodbank_logo.svg`   | 1      |
| `csf_logo_dark.svg`   | 26     |
| `repair_lab_logo.png` | 7      |

**Fix:** Add explicit `width` and `height` attributes to carousel `<img>` tags:

```html
<img
  src="/clients/csf_logo_dark.svg"
  width="160"
  height="60"
  class="brightness-110 contrast-[0.2] grayscale transition duration-300"
/>
```

Or use CSS `aspect-ratio` to reserve space before images load.

---

## Page 2: Admin Dashboard (`/dashboard/admin`)

### Core Web Vitals

| Metric | Score    | Threshold                       |
| ------ | -------- | ------------------------------- |
| LCP    | 827 ms   | Good (<2,500ms)                 |
| CLS    | **0.25** | **Bad (>0.1, at Bad boundary)** |

### LCP Breakdown

The LCP element is the footer logo `cfc_logo_white_full.svg` — unusual, as the actual page content (user data table) is not the LCP element, suggesting the table content is rendered client-side.

| Phase                  | Time       | % of LCP  |
| ---------------------- | ---------- | --------- |
| TTFB                   | 55 ms      | 6.6%      |
| Resource Load Delay    | **667 ms** | **80.6%** |
| Resource Load Duration | 57 ms      | 6.9%      |
| Element Render Delay   | 49 ms      | 5.9%      |

### Issues

#### 1. CLS: 0.25 — CRITICAL

A single layout shift of score **0.2482** at 1,308ms dominates. Root cause: the footer logo `cfc_logo_white_full.svg` has no `width`/`height` attributes.

**Fix:** Add explicit dimensions to the footer logo:

```html
<!-- In the footer component -->
<img
  src="/logo/cfc_logo_white_full.svg"
  class="!w-auto object-top md:!h-auto"
  width="200"
  height="50"
  alt="Coders for Causes logo"
/>
```

#### 2. LCP Image: Missing `fetchpriority=high` + Lazy Loading Applied

The LCP image (`cfc_logo_white_full.svg`) failed two discovery checks:

- `fetchpriority=high` not set
- `loading="lazy"` is applied (delays the LCP image)

**Fix:**

```html
<img
  src="/logo/cfc_logo_white_full.svg"
  fetchpriority="high"
  loading="eager"   <!-- remove lazy loading from LCP images -->
  width="200"
  height="50"
/>
```

#### 3. LCP Resource Load Delay (667ms — 80.6% of LCP)

The logo image isn't requested until 722ms after navigation starts. The browser can't discover it until late in page load.

**Fix:** Add a `preload` hint for the logo if it consistently appears as the LCP element:

```html
<link rel="preload" href="/logo/cfc_logo_white_full.svg" as="image" />
```

#### 4. Aggressive Cache Revalidation on Static Asset

The logo SVG returns `cache-control: public, max-age=0, must-revalidate`, meaning every page load triggers a revalidation request. The 304 response still adds latency.

**Fix:** For static/versioned assets, use long-lived caching:

```
cache-control: public, max-age=31536000, immutable
```

Since this is deployed on Vercel, configure this in `next.config.js` or `vercel.json`.

#### 5. Network Dependency Chain (critical path: 1,123ms)

```
HTML → CSS (a25ca756ef64d4e8.css, 717ms)
          └── Font (material-symbols-sharp.fcbbf02a.woff2, 786ms)
```

Same font chain issue as the homepage — no `preconnect` or `preload` hints.

---

## Top Priorities (All Pages)

| Priority | Issue                                       | Page(s)         | Impact        |
| -------- | ------------------------------------------- | --------------- | ------------- |
| 1        | CLS 0.25 from unsized footer logo           | Admin Dashboard | CLS (Bad)     |
| 2        | Remove `loading="lazy"` from LCP image      | Admin Dashboard | LCP           |
| 3        | Add `fetchpriority="high"` to LCP image     | Admin Dashboard | LCP           |
| 4        | Preload `material-symbols-sharp.woff2` font | All pages       | LCP / FCP     |
| 5        | Fix LCP text render delay (JS hydration)    | Homepage        | LCP           |
| 6        | Add `width`/`height` to carousel logos      | Homepage        | CLS stability |
| 7        | Fix logo `cache-control` to long-lived      | Admin Dashboard | Load speed    |
