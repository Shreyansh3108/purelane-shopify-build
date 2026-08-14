# Purelane — Shopify Section Architecture

This repository contains the production-ready Shopify sections built from the Purelane static HTML/CSS prototype. The build was executed on a clean installation of Shopify's Dawn theme, transforming rapid design prototypes into modular, merchant-editable, and performant Liquid architecture.

## 🔗 Live Preview
* **Dev Store URL:** [https://purelane-dev-shreyansh.myshopify.com/](https://purelane-dev-shreyansh.myshopify.com/)
* **Store Password:** `skawsh`

## 🏗️ Scope of Work
The following five custom sections were engineered to the exact visual specifications of the prototype, optimized for Core Web Vitals, and made fully editable via the Shopify Theme Editor:
1. **Hero** (`hero.liquid`) - Featuring a block-count-agnostic, accessible JS carousel.
2. **Shop Grid** (`shop.liquid`) - Supports both manual product picking and automated collection routing.
3. **Best-Selling Combos** (`combos.liquid`) - Utilizes Liquid arithmetic to dynamically calculate bundled savings, featuring a native, keyboard-accessible scroll rail.
4. **Bundles** (`bundles.liquid`) - Overlapping UI features driven by standard textareas and newline string splitting.
5. **Reviews Rail** (`reviews.liquid`) - Powered by Metaobjects and a custom DOM-cloning JavaScript loop to ensure a seamless CSS marquee animation regardless of how many blocks a merchant adds.

## 🛠️ Engineering Highlights
* **Strict BEM Scoping:** All global prototype CSS was rewritten into strictly scoped BEM namespaces to prevent collision and ensure section modularity.
* **Dynamic Edge Case Handling:** The reusable `product-card.liquid` snippet actively handles zero-inventory states (`aria-disabled`), missing media (SVG fallbacks), and extreme title lengths (CSS line-clamping).
* **Native Localization:** All static UI text (e.g., "Add to cart", "% off") is routed through Shopify's native translation engine via `locales/en.default.json`.
* **Accessibility:** Integrated `prefers-reduced-motion` degrades, `role="tablist"` attributes, and focus-visible states across all custom widgets.

## 📚 Deliverable Documentation
Please refer to the `docs/` directory for an in-depth breakdown of architectural decisions, scope cuts, and AI pair-programming workflows:
* [`docs/build-notes.md`](./docs/build-notes.md) - Explains architectural fixes, the marquee loop rewrite, and deferred features.
* [`docs/ai-workflow.md`](./docs/ai-workflow.md) - Details prompt strategies, AI scaffolding, and manual interventions.

---
*Developed by Shreyansh Dwivedi*
