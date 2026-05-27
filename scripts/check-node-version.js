#!/usr/bin/env node
/**
 * Node バージョン確認
 *   node scripts/check-node-version.js build  → Vercel 同条件（Node 24+）
 *   node scripts/check-node-version.js dev    → ローカル dev（Node 18+、Next.js 14 要件）
 */
const mode = process.argv[2] || 'build'
const major = Number(process.version.slice(1).split('.')[0])

if (mode === 'dev') {
  if (major < 18) {
    console.error(
      `\n[ERROR] Node.js ${process.version} detected. Local dev requires Node 18+ (Next.js 14).\n` +
        'Run: nvm use 18\n'
    )
    process.exit(1)
  }
  console.log(`[OK] Node ${process.version} (dev)`)
  process.exit(0)
}

if (major < 24) {
  console.error(
    `\n[ERROR] Node.js ${process.version} detected. Production build requires Node 24+ (see .nvmrc).\n` +
      'Run: nvm use 24\n'
  )
  process.exit(1)
}

console.log(`[OK] Node ${process.version} (build)`)
