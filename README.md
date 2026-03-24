# Shopify Horizon Product Card Assessment

## Overview
This is a custom product card built from scratch for a Shopify Horizon theme using Liquid, TailwindCSS, and vanilla JavaScript.

The implementation is intentionally separated from Horizon's default product card so it can be reviewed as an isolated component and dropped into a collection grid or demo section.

## Features
- sale badge when compare-at price is higher than price
- markdown pricing with compare-at price and current sale price
- brand / vendor label
- product title
- variant color swatches
- swatch-driven primary image switching
- secondary hover image for the selected variant
- lightweight vanilla JavaScript for interaction
- TailwindCSS compiled into a Shopify theme asset

## Files
```text
assets/
  custom-product-card.js
  tailwind-output.css      # generated after build
sections/
  custom-product-card-demo.liquid
snippets/
  custom-product-card.liquid
src/
  styles/tailwind.css
package.json
postcss.config.js
tailwind.config.js
README.md
```

## Setup
### 1. Install dependencies
```bash
npm install
```

### 2. Build TailwindCSS
```bash
npm run build:css
```

This generates:
- `assets/tailwind-output.css`

### 3. Add files to your Shopify Horizon theme
Copy these into your theme:
- `snippets/custom-product-card.liquid`
- `sections/custom-product-card-demo.liquid`
- `assets/custom-product-card.js`
- `assets/tailwind-output.css`

## Quick test inside Theme Editor
Add the `Custom product card demo` section to a page or template, choose a product, and verify:
- sale badge visibility
- compare-at and sale pricing
- swatch switching
- hover image behavior

## Integration into Horizon product grids
Replace the default product card render in the product loop with:

```liquid
{% render 'custom-product-card', product: product, section: section %}
```

## Variant image assumptions
### Primary image
The card uses:
- `variant.featured_media`
- fallback to `product.featured_media`

### Secondary hover image
The preferred source is:
- `variant.metafields.custom.secondary_image`

If that metafield is not present, the initial card load falls back to the product's second image when available.

## Swatch color mapping
The current build includes a simple mapping for the color names visible in the design reference:
- orange
- green
- blue
- yellow
- pink
- navy
- light green

If the store uses custom option names such as `Ocean Blue` or `Sunset Orange`, update the Liquid swatch mapping block accordingly.

## Accessibility notes
- color swatches use buttons
- active state is exposed through `aria-pressed`
- product links remain clickable for media and title

## Notes for reviewers
- built from scratch for Horizon
- TailwindCSS is compiled into `assets/tailwind-output.css`
- interaction logic is isolated in `assets/custom-product-card.js`
- the component is intentionally not tied to the default Horizon product card implementation

## Suggested next improvements
- use Shopify swatch objects if the catalog already supports them
- move color mapping to metafields or theme settings for easier maintenance
- support quick-add if the assessment later requires it
- extract shared image logic if used across multiple custom cards
