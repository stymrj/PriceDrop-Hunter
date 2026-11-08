# Changelog

## v2.1.0 — 2026-11-08

- New compare page (`compare.html`, built from `src/compare.tpl.html`): the same product/keyword across all nine stores in one table, ranked by discount. Ships with a 9-row sample table (boAt Airdopes 141, illustrative prices, labelled as sample) with a keyword filter; a working paste-CSV mode that merges each store's Hunter CSV export into one ranked table (browser-only, localStorage, per-store+product de-dupe); and six live-test steps for a real comparison. Linked from the hub nav and the stores section. Tested with `node test-compare.js` (PASS).
- JioMart v2.1 (see that repo's CHANGELOG): empty-state diagnostics, built-in self-test, retry with backoff, deeper scans, cross-category best-value row, multi-keyword search, bot multi-pincode + CSV/JSON export.

## v2.0.0 — 2026-11-08

- Hub page now lists all nine v2 repos with live pages, GitHub repo links and per-store install pages, plus a jsDelivr loader example for the `v2` branch.
- JioMart entry updated: it now has a Python Telegram bot (`bot-v2/` in JioMart-Deals); the "alerts around the clock" section says so instead of listing only the four GitHub Actions bots.
- README added (this repo previously had none): the nine-store table, install guide, Telegram setup, troubleshooting and testing notes. Install video links verified against the `media/` files in this repo.
- All nine store tools updated to their current fetch layers with the blank-results fix and a per-store regression test (see each store repo's CHANGELOG).

## v1.0.0 — 2026-10-25

- Initial PriceDrop Hunter hub: one universal bookmark for nine stores, per-store install pages, install walkthrough video, Telegram alerts.
