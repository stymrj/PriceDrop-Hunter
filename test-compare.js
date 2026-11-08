// Compare-page test for v2.1.0 — checks the built compare.html and index.html.
// Run from the repo root: `node test-compare.js`
const fs = require('fs');
const path = require('path');

const compare = fs.readFileSync(path.join(__dirname, 'compare.html'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const tpl = fs.readFileSync(path.join(__dirname, 'src', 'compare.tpl.html'), 'utf8');

let pass = 0, fail = 0;
function check(name, ok) {
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
  if (ok) pass++; else fail++;
}

const STORES = ['Amazon Now', 'Blinkit', 'Flipkart Minutes', 'BigBasket', 'Zepto',
  'Swiggy Instamart', 'Myntra', 'Croma', 'JioMart'];

// Sample table: one row per store, ranked by discount.
const sampleRows = [...compare.matchAll(/<tr data-disc="(\d+)" data-store="([^"]+)"/g)];
check('sample table: 9 rows (one per store)', sampleRows.length === 9);
check('sample table: all 9 stores present', STORES.every(s => sampleRows.some(r => r[2] === s)));
const discs = sampleRows.map(r => +r[1]);
check('sample table: discounts ranked highest first', discs.every((d, i) => i === 0 || d <= discs[i - 1]) && discs[0] > discs[discs.length - 1]);
check('sample table: labelled as sample / illustrative, not live prices', /Sample data/i.test(compare) && /illustrative/i.test(compare));
check('sample table: keyword filter input present', /id="kw"/.test(compare));
check('compare page: store links open the real stores', /amazon\.in\/tez\/browse\/home/.test(compare) && /jiomart\.com/.test(compare));

// CSV-paste mode: the working part.
check('paste mode: store selector lists all 9 stores', STORES.every(s => new RegExp('<option value="' + s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"').test(compare)));
check('paste mode: CSV textarea + Add rows + Clear present', /id="csvtext"/.test(compare) && /id="addcsv"/.test(compare) && /id="clearcsv"/.test(compare));
check('paste mode: expects Hunter CSV columns', /Title, Brand, Category, Price, MRP, Discount %/.test(compare));
check('paste mode: rows persist in this browser only (localStorage)', /localStorage/.test(compare));

// Live-test steps.
check('live test: step-by-step section present', /Live test/i.test(compare) && /Check a real price/i.test(compare));
check('live test: warns prices differ by pincode and to re-check before buying', /same pincode/i.test(compare) && /before buying/i.test(compare));

// Hub links to the compare page.
check('hub: index.html links to compare.html', /href="compare\.html"/.test(index));
check('hub: all 9 repo links still present', STORES.every(s => {
  const repo = { 'Amazon Now': 'Amazon-Now-Deals', 'Blinkit': 'Blinkit-Deals', 'Flipkart Minutes': 'Flipkart-Minute-Deals', 'BigBasket': 'BigBasket-Deals', 'Zepto': 'Zepto-Deals', 'Swiggy Instamart': 'Swiggy-Instamart-Deals', 'Myntra': 'Myntra-Deals', 'Croma': 'Croma-Deals', 'JioMart': 'JioMart-Deals' }[s];
  return index.includes('github.com/stymrj/' + repo);
}));
check('template: no unreplaced placeholders left in built compare.html', !/__COMPARE_ROWS__|__STORE_OPTIONS__/.test(compare) && !/__UNIVERSAL__|__CHIPS__|__STORES__/.test(index));

console.log('Checks passed: ' + pass + ' / ' + (pass + fail));
if (fail) {
  console.log('FAIL: compare page — ' + fail + ' check(s) failed');
  process.exit(1);
}
console.log('PASS: compare page — ' + pass + ' of ' + pass + ' checks passed (9-store sample ranked by discount, CSV-paste compare, live-test steps, hub links)');
