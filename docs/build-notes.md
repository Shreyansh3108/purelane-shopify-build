# Build Notes: Purelane on Dawn

## 1. Fixing the Prototype's Architecture
The original HTML/CSS prototype looked great, but it wasn't built for a dynamic Shopify environment. Here’s what I changed to make it production-ready:

* **Scoping the CSS:** The original file used global utility classes (like `.card` and `.btn`). Since Shopify merchants can add, move, or duplicate sections on the fly, global classes almost always lead to CSS leaking and breaking layouts. I rewrote the styling to use strict BEM scoping (e.g., `.section-shop__item`). Each section only loads its own CSS.
* **No Hardcoded Strings:** The brief asked for nothing to be hardcoded, so I routed all static UI text ("Add to cart", "% off", "Sold out") through Shopify's locale engine (`en.default.json`). 
* **Accessibility (A11y):** I cleaned up the markup. The hero carousel now uses proper `role="tablist"` ARIA attributes. I swapped decorative div-clicks for actual `<button type="submit">` tags in the forms, and added `aria-disabled="true"` to the sold-out states.

## 2. Handling the Edge Cases
I built a single `snippets/product-card.liquid` file to handle the product grid so I wouldn't repeat code. It handles the edge cases dynamically:
* **No Image:** Falls back to Shopify's native `placeholder_svg_tag`.
* **Out of Stock:** Checks `product.available` and flips the button to a disabled "Sold out" state.
* **Long Titles:** Uses `-webkit-line-clamp: 2` in the CSS. This prevents the grid from breaking visually while keeping the full title in the DOM for SEO.
* **Price Math:** The "% off" badge isn't typed out; it's calculated in Liquid using the `compare_at_price` and `price`.

## 3. Rewriting the Marquee
The prototype faked the infinite scrolling review marquee by hardcoding a duplicated set of reviews and applying a static `translate3d(-50%, 0, 0)`. Because merchants can add anywhere from 3 to 12 reviews in the theme editor, that static -50% math breaks immediately in production.

**How I fixed it:** I wrote a script (`section-reviews.js`) that checks the track's `scrollWidth`. It dynamically clones the review nodes until the track is safely 2.2x wider than the viewport, then passes the exact pixel width to a CSS variable (`--marquee-distance`). It loops perfectly no matter how many blocks the merchant adds. I also added a `prefers-reduced-motion` check to degrade it to a standard swipeable rail for accessibility.

## 4. Why I Skipped the Parallax Water Background
I explicitly cut the scroll-driven, full-page water background effect. The prototype relied on absolute `offsetTop` document math to trigger the background changes. Because Shopify sections have to survive being reordered in the theme editor, relying on fixed document heights is a bad idea. I opted for static section backgrounds instead to keep the sections perfectly modular. 

**If I had more time:** I'd rebuild that ambient background using isolated `IntersectionObserver` instances per section. I'd also probably swap my Liquid math in the Combos section for a proper integration with the Shopify Bundles API.