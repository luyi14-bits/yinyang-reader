// SPDX-FileCopyrightText: 2026 阴阳先生手记
// SPDX-License-Identifier: AGPL-3.0-only
// This file is part of the 阴阳先生手记 project.

import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

const assets = [
  'reader.html',
  'index.html',
  'manifest.json',
  'sw.js',
  '.nojekyll'
];

const dirs = [
  ['stories', ['INDEX.json']],
  ['icons', []]
];

console.log('[Build] dist/', dist);

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

for (const f of assets) {
  const src = join(root, f);
  const dest = join(dist, f);
  if (!existsSync(src)) {
    console.warn('[WARN] Missing:', f);
    continue;
  }
  copyFileSync(src, dest);
  console.log('  ✓', f);
}

for (const [dir, extra] of dirs) {
  const srcDir = join(root, dir);
  const destDir = join(dist, dir);
  if (!existsSync(srcDir)) {
    console.warn('[WARN] Missing dir:', dir);
    continue;
  }
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

  const files = readdirSync(srcDir);
  let copied = 0;
  for (const f of files) {
    if (f.endsWith('.json') || f.endsWith('.svg') || f.endsWith('.png') || extra.includes(f)) {
      copyFileSync(join(srcDir, f), join(destDir, f));
      copied++;
    }
  }
  console.log('  ✓', dir, `(${copied} files)`);
}

console.log('\n[Build] Done → dist/');
