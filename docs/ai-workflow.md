# AI Workflow Notes

## How I used AI
I treated AI like a junior developer—I made the architectural decisions, and I had the AI type out the boilerplate. 

* **Writing Schema:** Shopify's JSON schemas are incredibly tedious to write by hand. I had the AI generate the nested block structures for the Combos and Bundles sections. 
* **Liquid Math:** I used it to quickly format the Liquid arithmetic for the percentage discount badges and the average star rating loops.
* **JS Scaffolding:** I had it draft the boilerplate for the `IntersectionObserver` (for the scroll reveals) and the basic Web Component structure for the carousels.

## Where AI messed up (and how I fixed it)
AI is great at writing code, but it doesn't intuitively understand Shopify's specific rules unless you force it to.
* **Fighting Global CSS:** Left to its own devices, the AI kept trying to create a `globals.css` file to share styles across components. I had to manually intervene, reject its CSS, and prompt it to strictly write scoped BEM classes per section.
* **Theme Editor Quirks:** The AI wrote decent JavaScript for the carousels, but it completely ignored the Shopify Theme Editor lifecycle. I had to go in and manually wire up the `shopify:section:load` and `shopify:block:select` event listeners so the JS wouldn't break when a merchant edits a block.

## Doing this 20 more times
If I had to convert 20 more of these prototypes, I would build a highly restrictive "Meta-Prompt" to feed the AI before writing any code. 

Instead of just asking it to "build a section," the prompt would force the AI to map out a Data Traceability Matrix first (deciding what is a Metafield vs. Metaobject vs. Block). I'd also hardcode rules into the prompt forbidding global CSS classes and requiring all UI strings to be formatted as `{{ 'namespace.key' | t }}` from step one.