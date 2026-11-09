# PriceDrop Hunter

One bookmark for nine Indian quick-commerce and shopping stores. Find the biggest discounts, track price drops, and get Telegram alerts. It runs in your own browser: nothing to sign up for, nothing uploaded.

**Live page:** https://stymrj.github.io/PriceDrop-Hunter/

**Version:** 2.1.0 (8 November 2026) — see [CHANGELOG.md](CHANGELOG.md).

## Compare across all nine stores

New in v2.1: the **[compare page](https://stymrj.github.io/PriceDrop-Hunter/compare.html)** puts the same product or keyword across all nine stores in one table, ranked by discount.

- **Sample table** — one product (boAt Airdopes 141) across all nine stores, ranked by discount, with a keyword filter. The prices are illustrative, not live; the page says so.
- **Paste CSV exports** — the working part. Every store's Hunter exports the same CSV columns, so paste each store's export (one store at a time, pick the store first) and the page merges them into one ranked table, saved in your browser only. Rows de-dupe per store + product, keeping the best discount.
- **Live-test steps** — a six-step check to run a real comparison for any keyword: same variant and pack size, same pincode, in-stock only, and re-check the winning price on the store before buying.

## The nine stores (v2)

Every store has a v2 release on the `v2` branch of its repo: the current fetch layer for that store, the blank-results fix, and a Telegram bot where listed. Install from the store's live page.

| Store | Live page | Repo | Install |
| --- | --- | --- | --- |
| Amazon Now | https://stymrj.github.io/Amazon-Now-Deals/ | https://github.com/stymrj/Amazon-Now-Deals | [Install page](https://stymrj.github.io/Amazon-Now-Deals/) |
| Blinkit | https://stymrj.github.io/Blinkit-Deals/ | https://github.com/stymrj/Blinkit-Deals | [Install page](https://stymrj.github.io/Blinkit-Deals/) |
| Flipkart Minutes | https://stymrj.github.io/Flipkart-Minute-Deals/ | https://github.com/stymrj/Flipkart-Minute-Deals | [Install page](https://stymrj.github.io/Flipkart-Minute-Deals/) |
| BigBasket | https://stymrj.github.io/BigBasket-Deals/ | https://github.com/stymrj/BigBasket-Deals | [Install page](https://stymrj.github.io/BigBasket-Deals/) |
| Zepto | https://stymrj.github.io/Zepto-Deals/ | https://github.com/stymrj/Zepto-Deals | [Install page](https://stymrj.github.io/Zepto-Deals/) |
| Swiggy Instamart | https://stymrj.github.io/Swiggy-Instamart-Deals/ | https://github.com/stymrj/Swiggy-Instamart-Deals | [Install page](https://stymrj.github.io/Swiggy-Instamart-Deals/) |
| Myntra | https://stymrj.github.io/Myntra-Deals/ | https://github.com/stymrj/Myntra-Deals | [Install page](https://stymrj.github.io/Myntra-Deals/) |
| Croma | https://stymrj.github.io/Croma-Deals/ | https://github.com/stymrj/Croma-Deals | [Install page](https://stymrj.github.io/Croma-Deals/) |
| JioMart | https://stymrj.github.io/JioMart-Deals/ | https://github.com/stymrj/JioMart-Deals | [Install page](https://stymrj.github.io/JioMart-Deals/) |

jsDelivr loader for the v2 branch of any store (replace the repo name as needed):

```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/stymrj/JioMart-Deals@v2/dist/deals.js?t='+Date.now();document.body.appendChild(s);})()
```

## What changed in v2 (8 November 2026)

- All nine store tools updated to their current fetch layers, with the blank-results fix (fetched items must actually render as cards in the results tab) and a regression test per store that parses a sample payload and checks the rendered card count.
- JioMart gains a standalone Python Telegram bot (`bot-v2/` in the JioMart-Deals repo) — fetcher + SQLite history + deal differ + notifier — for alerts around the clock without a browser.
- This hub page now lists all nine v2 repos with live pages, repo links and install pages, and the install guide below covers the universal bookmark.
- Install video: [watch the walkthrough (MP4)](https://stymrj.github.io/PriceDrop-Hunter/media/install-demo.mp4) · [GIF](https://stymrj.github.io/PriceDrop-Hunter/media/install-demo.gif) · [poster](https://stymrj.github.io/PriceDrop-Hunter/media/install-demo-poster.jpg)

## What changed in v2.1 (8 November 2026)

- **Compare page** ([compare.html](https://stymrj.github.io/PriceDrop-Hunter/compare.html)): same product/keyword across all nine stores in one table, ranked by discount — a sample table with illustrative prices, a working paste-CSV mode that merges each store's Hunter export into one ranked table (browser-only), and six live-test steps for a real comparison. Tested with `node test-compare.js`.
- **JioMart v2.1** (see that repo's CHANGELOG): empty-state diagnostics that name the cause of 0 results, a built-in self-test button, retry with exponential backoff, deeper scans with per-page progress, a cross-category best-value row, multi-keyword search, and bot multi-pincode scans + CSV/JSON export.
- **Bookmark name fixed (2026-11-09):** the universal install button now reads **PriceDrop Hunter — All Stores** instead of the generic “PriceDrop Hunter”, so it no longer collides with the nine per-store bookmarks.

## Install (universal bookmark)

**Desktop.** Drag the yellow **PriceDrop Hunter — All Stores** button on the live page to your bookmarks bar.

**Mobile.** Tap **Copy for mobile** on the live page, bookmark any page, name it **PriceDrop Hunter — All Stores**, and paste the code as the bookmark's address. Then open any of the nine stores and use it from the address bar — the bookmark sees which store you are on and opens that store's tool.

**Per store.** Each store's live page also has its own full bookmarklet and a userscript (`dist/<store>-deals.user.js` in that repo). Use the per-store bookmark or userscript for BigBasket and Croma, which block tools loaded from other sites.

The universal bookmark code is also in [universal-bookmark.txt](universal-bookmark.txt). It loads the latest build from GitHub Pages each time you run it.

## Use

1. Add the bookmark (above).
2. Open any supported store and set your delivery address or pincode where it asks.
3. Click the bookmark. The right store tool opens by itself.
4. Press **Scan**, pick categories, and the biggest discounts appear first.
5. Save deals with the heart, build a shopping list, export CSV, or connect Telegram for alerts.

Every tool has the same workspace: best-deal ranking, price history, saved items, unit prices, presets, CSV export and Telegram alerts.

## Telegram alerts

**In the browser.** After each scan, Hunter sends new deals, price drops and cheaper saved items to your own Telegram bot. Create a bot with `@BotFather` (`/newbot`), press **Start** in it, get your chat ID from `@userinfobot`, then paste both into Hunter (press **Telegram** in the top bar) and send a test. Your token stays in your browser.

**Around the clock.** GitHub Actions bots scan every 30 minutes for Flipkart Minutes, Blinkit, Amazon Now and BigBasket. JioMart uses its own Python bot (`bot-v2/` in the JioMart-Deals repo) — run it on your own machine or a free host; it needs your own Telegram bot token and pincode, and no token is shipped in the repo.

## Troubleshooting

- **Nothing happens on your phone.** Make sure you pasted the whole code as the bookmark's address, then open the store and pick the bookmark from the address-bar suggestions instead of the bookmarks menu.
- **Blank results on a store.** Set your delivery address/pincode on that store first, then scan again. If you are signed out, the store returns a login page instead of data — sign in and retry.
- **Deals differ from a friend's.** Quick-commerce prices and stock depend on the dark store near your delivery address, so everyone sees their own local deals.
- **BigBasket / Croma won't load from the universal bookmark.** Those stores block tools loaded from other sites — use the per-store bookmark or userscript from the store's own install page.

## Testing

```bash
node --check build.js
node build.js   # rebuilds index.html, compare.html and universal-bookmark.txt
node test-compare.js   # PASS: compare page — sample table, CSV-paste compare, live-test steps, hub links
```

Each store repo carries its own regression test (`node test-results-tab.js`); this hub has no parser of its own — its test (`node test-compare.js`) checks the built compare page instead. Live store APIs were not verified from this machine — please do one manual browser test per store after publishing v2.

## Project layout

```
src/index.tpl.html   hub page template (store list is generated from build.js)
src/compare.tpl.html   compare page template (sample rows generated from build.js)
build.js             builds index.html, compare.html and universal-bookmark.txt
test-compare.js      checks the built compare page (sample table, CSV-paste compare, live-test steps, hub links)
universal-bookmark.txt   the universal bookmark code
media/               install-demo.mp4, install-demo.gif, install-demo-poster.jpg
favicon.svg
```

Run `node build.js` after any change.

## License

MIT — see [LICENSE](LICENSE).

---

Made with ♥ by [Satyam Raj](https://www.linkedin.com/in/satyamraj1)
