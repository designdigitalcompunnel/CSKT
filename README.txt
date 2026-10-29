CSKT Water Compact Implementation — Homepage Prototype (updated)

Files:
- index.html: homepage structure and CSKT copy
- css/base.css: palette tokens, type, header, footer, buttons, focus styles
- css/home.css: homepage section styles and responsive layout
- js/main.js: menu, header behaviour, progress bar, reveal, parallax, on-page search
- js/home.js: find-information tabs, featured projects rail (arrows + dots), bento glow
- assets/images/logo.png, favicon.png: supplied logo and favicon
- assets/images/proj-*.svg: illustrations for the six Featured Projects cards
- assets/images/hero.jpg, circle-discussion.jpg, portrait.png: supplied photos

Brand palette (from the CSKT Water Compact brand guide):
- Deep Blue #0B3D91, Sky Blue #2680C2, Light Blue #76B7E5
- Forest Green #1E5D3A, Earth Brown #8B5E3C, Warm Gold #D9A441
- Text #1A1A1A, Secondary text #5F6B7A, Surface #F5F7FA, Border #D6DCE2
- Derived shade for header top bar and footer: #072B66

Accessibility (WCAG 2.1 AA):
- All text meets 4.5:1 contrast; UI boundaries and focus rings meet 3:1.
- Skip link, landmarks, one h1, ordered headings, visible focus, keyboard tabs and carousel controls.
- Theme switcher and floating accessibility icon are decorative and not interactive (aria-hidden).

Notes:
- The hero and band photos are remote Unsplash images and need an internet connection. Replace them with CSKT-approved photography before launch.
- Privacy, Terms and Accessibility links point to cskt.org until real policy pages exist.
- Verify all project names, notices, documents, and links with CSKT before publication.
- Connect any real forms, search, GIS integrations, analytics, CMS, and submission workflows before production.

Project card photos:
- Add free-licensed photos to assets/images/projects/ using the names listed in that folder's README.txt.
- Until then, each card shows its matching illustration (assets/images/proj-*.svg).

Photos:
- assets/images/hero-waterfront.jpg is the supplied waterfront photo. It is used in the hero, the Engineering tile in Our Work, and as the background for Find Information and Contact DEWR.
- Replace or add photos per section before launch. Keep at least 1600 px on the long edge.

Hero: assets/images/hero-lake.jpg (single image; replace this file to change the hero).
Water Resource Planning card: projects/planning.jpg (lake photo). The other five project cards still use illustrations until real photos are added to projects/.


Image cleanup (2026-10-29):
- Preserved assets/images/hero-lake.jpg as the current hero image, plus the supplied logo, favicon, and footer SVG.
- Removed unused duplicate/placeholder local photos and illustrations.
- Non-hero section photos now use distinct remote Unsplash images under the Unsplash License. They require an internet connection. Image URLs are embedded in index.html and css/home.css.
- Photo source: https://unsplash.com/license. Confirm current license terms and review each image before production; replace with CSKT-approved imagery where required.

Water Rights & Use page (water-rights.html):
- Shares base.css, home.css and js/main.js with the homepage, so the header, floating bar, footer, animations and interactions match.
- Shorter hero than the homepage, using assets/images/hero-lake.jpg.
- Header shows where you are: the current page is highlighted (gold). On the homepage, the header highlights the section in view.
- Start Here cards use a minimal colour gradient.

Latest changes:
- Marquee bar below the hero (both pages): very light blue strip, grey regular text, lighter grey separators.
- Our Mission cards and Start Here cards: solid light yellow, flat (no gradient, pattern, or heavy shadow).
- Light yellow (--yellow) replaces the gold background fills: Water Stewardship tile, testimonial, selected tab, gold buttons, active header pill.
- Our Work and testimonial patterns are reduced.
- Four-colour stripe above the footer removed. Large faint "CSKT WATER" word added at the footer bottom (both pages).

Latest round:
- Our Mission and Start Here cards: dark yellow (#F0CC6E) with dark body text.
- CTA buttons and the active header pill: back to gold (#D9A441) with dark text.
- Footer "CSKT WATER": fades from top to bottom and is sized to the full content width of the grid (fitted by script on resize).

Section patterns and links:
- Our Mission and Start Here sections: minimal dot pattern in the background.
- Our Mission cards: link text with arrow, matching the Start Here cards.
- Our Work tile patterns: reduced further.
