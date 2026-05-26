#!/usr/bin/env bash
# Vercel デプロイ前の一括検証（push 前に実行）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" || true

echo "=== 1/4 npm ci ==="
npm ci

echo ""
echo "=== 2/4 export file check (StalkerPc 等) ==="
node scripts/check-export-files.mjs

echo ""
echo "=== 3/4 production build (Node 24, Vercel 同条件) ==="
nvm use 24 >/dev/null
node scripts/check-node-version.js build
NODE_OPTIONS=--openssl-legacy-provider npm run build

echo ""
echo "=== 4/4 dev smoke (Node 16, .next 再生成 + JS チャンク) ==="
bash scripts/restart-and-verify-dev.sh

echo ""
echo "============================================"
echo " verify:deploy PASSED"
echo "============================================"
echo ""
echo "Vercel デプロイ前チェックリスト:"
echo "  [ ] Dashboard → Settings → Node.js Version = 24.x"
echo "  [ ] Environment Variables（Production）:"
echo "      SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS"
echo "      CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL"
echo "  [ ] git push origin develop 後、Vercel Build が Success"
echo "  [ ] https://www.midori02.com/ でローディング後に TOP 表示"
echo ""
