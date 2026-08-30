# Vendored browser dependency

`chart.umd.js` is Chart.js 4.4.1, copied byte-for-byte from the pinned npm package.
The adjacent license file is retained. Legacy static pages load this local copy so a slow or
unavailable CDN cannot race their stage initialization. New React experiments do not depend on it.
