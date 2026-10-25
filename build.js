// Builds index.html from src/index.tpl.html and the store list below.
// Usage: node build.js
const fs = require('fs'), path = require('path');
const PAGES = 'https://stymrj.github.io/';

const STORES = [
  { name: 'Flipkart Minutes', repo: 'Flipkart-Minute-Deals', open: 'https://www.flipkart.com/', host: 'flipkart.com', tag: 'FKM', hd: '#2874f0', ac: '#ffe500', on: '#111', bot: true,
    desc: 'Scans every Minutes department in seconds and ranks deals by real savings.', points: ['14 departments', 'Pincode aware', 'Telegram bot on GitHub Actions'] },
  { name: 'Blinkit', repo: 'Blinkit-Deals', open: 'https://blinkit.com/', host: 'blinkit.com', tag: 'BDS', hd: '#0c831f', ac: '#f8cb46', on: '#111', bot: true,
    desc: 'Sweeps dozens of keywords and collections for your delivery address.', points: ['45+ keywords and collections', 'Reads your location automatically', 'Telegram bot on GitHub Actions'] },
  { name: 'Amazon Now', repo: 'Amazon-Now-Deals', open: 'https://www.amazon.in/tez/browse/home', host: 'amazon.in', tag: 'ANR', hd: '#232f3e', ac: '#ff9900', on: '#111', bot: true,
    desc: 'Scans Amazon Now categories and keyword searches, with rate-limit back-off.', points: ['35+ keywords and categories', 'Brand ID detected for you', 'Telegram bot on GitHub Actions'] },
  { name: 'Swiggy Instamart', repo: 'Swiggy-Instamart-Deals', open: 'https://www.swiggy.com/instamart', host: 'swiggy.com', tag: 'IMS', hd: '#e8650a', ac: '#2b1d16', on: '#fff', bot: false,
    desc: 'Collects deals as you browse Instamart, with an auto-scroll helper.', points: ['Captures as you browse', 'Auto-scroll to load more', 'Telegram alerts from the browser'] },
  { name: 'BigBasket', repo: 'BigBasket-Deals', open: 'https://www.bigbasket.com/', host: 'bigbasket.com', tag: 'BBD', hd: '#4a7c14', ac: '#ffd23f', on: '#111', bot: true,
    desc: 'Scans BigBasket categories slowly and politely to avoid blocks.', points: ['13 categories', 'Gentle, steady scanning', 'Telegram bot on GitHub Actions'] }
];

const ARROW = '<svg class="ic" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path d="M8 2.5v8M4.5 7.2 8 11l3.5-3.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 13.8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const icon = d => `<svg class="ic" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const CHECK = icon('<path d="M20 6 9 17l-5-5"/>'), NEXT = icon('<path d="M5 12h14M13 6l6 6-6 6"/>'), EXT = icon('<path d="M14 3h7v7M10 14 21 3M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>'), CODE = icon('<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'), BOT = icon('<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>');
const page = s => PAGES + s.repo + '/';

// Universal bookmark: picks the store from the hostname and loads that tool's latest build.
const map = STORES.map(s => `'${s.host}':['${s.repo}','${s.tag}']`).join(',');
const universalJs = `(function(){var m={${map}},h=location.hostname,k=Object.keys(m).filter(function(d){return h===d||h.slice(-d.length-1)==='.'+d})[0];if(!k){alert('Open Flipkart Minutes, Blinkit, Amazon Now, Swiggy Instamart or BigBasket, then use PriceDrop Hunter again.');return}var g=window['__'+m[k][1]+'__'];if(g)return g.toggle();fetch('${PAGES}'+m[k][0]+'/dist/deals.js?'+Date.now()).then(function(r){if(!r.ok)throw Error('HTTP '+r.status);return r.text()}).then(function(t){(0,eval)(t)}).catch(function(e){alert('PriceDrop Hunter could not load: '+e.message)})})()`;
const universal = 'javascript:' + universalJs.replace(/%/g, '%25').replace(/#/g, '%23');

const chips = STORES.map(s => `<a class="chip" href="${page(s)}" style="background:${s.hd}"><span class="dot" style="background:${s.ac};color:${s.on}">${ARROW}</span><span>${s.name}<small>${s.host}</small></span><span class="go">${NEXT}</span></a>`).join('\n      ');
const stores = STORES.map(s => `<div class="store">
      <div class="top" style="background:${s.hd}"><i style="background:${s.ac};color:${s.on}">${ARROW}</i><b>${s.name}</b></div>
      <div class="bd"><p>${s.desc}</p><ul>${s.points.map(p => `<li>${CHECK}${p}</li>`).join('')}</ul>
        <div class="acts"><a class="sb fill" href="${page(s)}" style="background:${s.hd}">Install page ${NEXT}</a><a class="sb" href="${s.open}" target="_blank" rel="noopener">${EXT}Open ${s.name}</a><a class="sb" href="https://github.com/stymrj/${s.repo}" target="_blank" rel="noopener">${CODE}Code</a></div></div>
    </div>`).join('\n    ');
const botLinks = STORES.filter(s => s.bot).map(s => `<a class="sb" href="https://github.com/stymrj/${s.repo}#telegram-bot-github-actions" target="_blank" rel="noopener">${BOT}${s.name}</a>`).join('');

const attr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const tpl = fs.readFileSync(path.join(__dirname, 'src/index.tpl.html'), 'utf8');
const out = tpl.replace('__UNIVERSAL__', () => attr(universal)).replace('__CHIPS__', () => chips).replace('__STORES__', () => stores).replace('__BOTLINKS__', () => botLinks);
fs.writeFileSync(path.join(__dirname, 'index.html'), out);
fs.writeFileSync(path.join(__dirname, 'universal-bookmark.txt'), universal);
console.log('index.html built · universal bookmark:', universal.length, 'chars');
