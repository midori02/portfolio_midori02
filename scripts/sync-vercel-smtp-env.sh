#!/usr/bin/env bash
# src/.env.local の SMTP 関連 6 項目を Vercel Production に同期（値はログに出さない）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${ENV_FILE:-src/.env.local}"
VARS=(SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS CONTACT_FROM_EMAIL CONTACT_TO_EMAIL)

if [ ! -f "$ENV_FILE" ]; then
  echo "[ERROR] $ENV_FILE がありません"
  exit 1
fi

if ! command -v vercel >/dev/null 2>&1 && ! command -v npx >/dev/null 2>&1; then
  echo "[ERROR] vercel CLI がありません: npm i -g vercel"
  exit 1
fi

vercel_cmd() {
  if command -v vercel >/dev/null 2>&1; then vercel "$@"; else npx vercel "$@"; fi
}

get_var() {
  local key="$1"
  local line
  line="$(grep -E "^${key}=" "$ENV_FILE" | tail -1 || true)"
  if [ -z "$line" ]; then
    echo "[ERROR] ${key} が ${ENV_FILE} にありません" >&2
    return 1
  fi
  printf '%s' "${line#*=}"
}

echo "Vercel Production へ SMTP 環境変数を同期します（${ENV_FILE} から）"
echo "※ 事前に vercel login && vercel link が必要です"
echo ""

for key in "${VARS[@]}"; do
  val="$(get_var "$key")"
  if [ -z "$val" ]; then
    echo "[ERROR] ${key} が空です"
    exit 1
  fi
  printf '%s' "$val" | vercel_cmd env add "$key" production --force >/dev/null
  echo "[OK] ${key}"
done

echo ""
echo "完了。Vercel Dashboard で確認後、Production を Redeploy してください。"
