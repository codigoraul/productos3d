import { transform } from '@astrojs/compiler';
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
const files = globSync('src/**/*.astro');
let bad = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  try {
    const r = await transform(src, { filename: f });
    const errs = (r.diagnostics || []).filter(d => d.severity === 1);
    if (errs.length) { bad++; console.log('ERR', f, JSON.stringify(errs.map(e=>e.text+' @'+e.location?.line))); }
    else console.log('ok ', f);
  } catch (e) { bad++; console.log('FAIL', f, e.message); }
}
console.log('bad:', bad);
