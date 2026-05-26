#!/usr/bin/env node
/**
 * barrel (index.ts) の re-export 先ファイルが存在するか検証。
 * StalkerPc 欠落のような「index だけ export して実体なし」をビルド前に検出する。
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = path.join(root, 'src')

const resolveRelative = (fromFile, spec) => {
  if (!spec.startsWith('.')) return null
  const base = path.resolve(path.dirname(fromFile), spec)
  const candidates = [
    `${base}.tsx`,
    `${base}.ts`,
    `${base}.jsx`,
    `${base}.js`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ]
  return candidates.find((p) => fs.existsSync(p)) ?? null
}

const collectIndexFiles = (dir, acc = []) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory() && ent.name !== 'node_modules' && ent.name !== '.next') {
      collectIndexFiles(full, acc)
    } else if (ent.name === 'index.ts' || ent.name === 'index.tsx') {
      acc.push(full)
    }
  }
  return acc
}

const importRe = /from\s+['"](\.[^'"]+)['"]/g
const missing = []

for (const file of collectIndexFiles(srcDir)) {
  const content = fs.readFileSync(file, 'utf8')
  for (const match of content.matchAll(importRe)) {
    const spec = match[1]
    if (!resolveRelative(file, spec)) {
      missing.push({ file: path.relative(root, file), spec })
    }
  }
}

if (missing.length === 0) {
  console.log(`[OK] export files (${collectIndexFiles(srcDir).length} index files checked)`)
  process.exit(0)
}

console.error('[FAIL] Missing export targets:')
for (const { file, spec } of missing) {
  console.error(`  ${file}  →  ${spec}`)
}
process.exit(1)
