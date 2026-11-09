# Changelog

## v2.1.0 — 2026-11-08
- Fixed (2026-11-09): install button now reads “PriceDrop Hunter — All Stores” instead of the generic “PriceDrop Hunter”, so the dragged bookmark is named after this store instead of colliding with every other tool.
- Fixed (2026-11-09): store-card counts corrected against the v2 code — Flipkart Minutes 12 departments (was 14), BigBasket 9 categories (was 13), Myntra 10 categories (was 35), Amazon Now 34 keywords and 12 categories (was “35+ keywords and categories”); JioMart's card now says its Python Telegram bot runs on GitHub Actions (hourly) instead of “run it on your own machine or a free host”. Hub install step 1 named the drag button “PriceDrop Hunter” (it reads “PriceDrop Hunter — All Stores”); the universal bookmark is about 1,200 characters, not “a few hundred”. The jsDelivr loader (`…@v2/dist/deals.js`) was removed from the hub page and README — jsDelivr reads `@v2` as a version range and answers 404 (verified: `@v2` 404, full commit hash 200) — with no CDN loader replacing it yet, since GitHub Pages serves `main`, not `v2`. The “On GitHub Actions” card and README now state JioMart's hourly schedule and that Zepto, Swiggy Instamart, Myntra and Croma run on the same 30-minute schedule (their workflows are created in this same fix); the “Does it see my data?” answer now notes Telegram alerts as the one exception to “nothing uploaded”.

- New compare page (`compare.html`, built from `src/compare.tpl.html`): the same product/keyword across all nine stores in one table, ranked by discount. Ships with a 9-row sample table (boAt Airdopes 141, illustrative prices, labelled as sample) with a keyword filter; a working paste-CSV mode that merges each store's Hunter CSV export into one ranked table (browser-only, localStorage, per-store+product de-dupe); and six live-test steps for a real comparison. Linked from the hub nav and the stores section. Tested with `node test-compare.js` (PASS).
- JioMart v2.1 (see that repo's CHANGELOG): empty-state diagnostics, built-in self-test, retry with backoff, deeper scans, cross-category best-value row, multi-keyword search, bot multi-pincode + CSV/JSON export.

## v2.0.0 — 2026-11-08

- Hub page now lists all nine v2 repos with live pages, GitHub repo links and per-store install pages, plus a jsDelivr loader example for the `v2` branch.
- JioMart entry updated: it now has a Python Telegram bot (`bot-v2/` in JioMart-Deals); the "alerts around the clock" section says so instead of listing only the four GitHub Actions bots.
- README added (this repo previously had none): the nine-store table, install guide, Telegram setup, troubleshooting and testing notes. Install video links verified against the `media/` files in this repo.
- All nine store tools updated to their current fetch layers with the blank-results fix and a per-store regression test (see each store repo's CHANGELOG).

## v1.0.0 — 2026-10-25

- Initial PriceDrop Hunter hub: one universal bookmark for nine stores, per-store install pages, install walkthrough video, Telegram alerts.
