# Sammy's Grill — Website Redesign Concept

An unsolicited, single-page redesign concept for **Sammy's Grill**, a hometown Louisiana bar & grill
serving fresh Gulf seafood, scratch-made po'boys, burgers and Cajun favorites since **1988**. Two
locations: **Highland Rd, Baton Rouge** (8635 Highland Road · (225) 766-9600) and **Prairieville**
(37306 Perkins Road · (225) 402-0606).

## Why this redesign

The current site (sammy-s-grill.com) is a dated WordPress template. The main issues:

- **Dated, generic template look** — small square item photos on a plain page; nothing that makes the
  food look worth driving in for.
- **Thin sense of place & story** — the 1988 heritage and Louisiana personality barely come through.
- **Locations blur together** — hard to see, at a glance, what's where, what's open, and how to reach
  each store.

This concept is an objective upgrade:

- **Full-bleed hero** on a real seafood photo, warm bayou-green / Cajun-red / cane-gold palette, and a
  hand-built editorial type pairing (Bitter + Archivo) — appetizing and clearly current.
- **Varied editorial layouts** — an alternating story split, a photo-led signature "bento" spread, a
  proper dot-leader **full menu** with real categories & prices, a full-bleed po'boy band, and a
  horizontal gallery. No repetitive icon/toast cards.
- **The complete real menu with real prices** — appetizers through desserts, po'boys, steak & seafood,
  kids and sides — transcribed from the business's published menu.
- **Per-location clarity** — dedicated address, phone (click-to-call), hours, and an honest status note
  (Highland open; Prairieville temporarily closed for repairs).
- **Catering inquiry** — a real `mailto:` form that opens the customer's email addressed to the
  catering team. No fake ordering, cart, or checkout.
- **Polished, tasteful motion** — sticky shrink-on-scroll nav with animated underlines, a real animated
  mobile menu, and `IntersectionObserver` scroll-reveal. Respects `prefers-reduced-motion`.

## Contact & ordering

The site uses the business's real public contact details and a **"Call to order"** action per location.
There is intentionally **no online-ordering / cart / checkout UI** — Sammy's does not offer real online
ordering, so none is faked. Catering routes through a real `mailto:` inquiry form.

## How to view

- **Locally:** double-click `index.html` (no build step, no dependencies — fully static).
- A live URL can be enabled later by making the repository public.

## Tech

Plain, self-contained static site: `index.html` + `styles.css` + `script.js` + `assets/photos/`.
Responsive and mobile-first, accessible semantics, one Google Fonts link. Photography is optimized
(all images < 400 KB) from the business's own published site.

---

*Unsolicited redesign concept. Not affiliated with or endorsed by Sammy's Grill. Contact details and
photos are the business's real public info; menu/prices reflect their published menu and may vary.*
