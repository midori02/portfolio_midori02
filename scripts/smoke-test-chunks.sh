#!/usr/bin/env bash
# HTML が参照する _next/static/*.js が 200 か検証（古い .next キャッシュで JS 404 → ローディング無限を検出）
set -euo pipefail

HOST="${SMOKE_HOST:-127.0.0.1}"
PORT="${SMOKE_PORT:-3001}"
BASE="http://${HOST}:${PORT}"
ROUTE="${SMOKE_ROUTE:-/}"

body="$(mktemp)"
trap 'rm -f "$body"' EXIT

code="$(curl -sS -o "$body" -w '%{http_code}' --max-time 15 "${BASE}${ROUTE}" || echo "000")"
if ! echo "$code" | grep -qE '^(200|307|308)$'; then
  echo "FAIL ${ROUTE} HTTP ${code}"
  head -c 300 "$body" || true
  echo
  exit 1
fi

if grep -q 'Internal Server Error' "$body"; then
  echo "FAIL ${ROUTE} — Internal Server Error in body"
  exit 1
fi

chunks=()
while IFS= read -r line; do
  [ -n "$line" ] && chunks+=("$line")
done < <(grep -oE '/_next/static/[^"'\'' ]+\.js' "$body" | sort -u || true)

if [ "${#chunks[@]}" -eq 0 ]; then
  echo "WARN ${ROUTE} — no _next/static JS chunks in HTML (SSR-only page?)"
  exit 0
fi

fail=0
for chunk in "${chunks[@]}"; do
  c="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 "${BASE}${chunk}" || echo "000")"
  if echo "$c" | grep -qE '^200$'; then
    echo "PASS chunk ${chunk} HTTP ${c}"
  else
    echo "FAIL chunk ${chunk} HTTP ${c}"
    fail=1
  fi
done

if [ "$fail" -ne 0 ]; then
  echo ""
  echo "Chunk smoke FAILED — rm -rf .next && npm run dev -- -p ${PORT} で再起動してください"
  exit 1
fi

echo ""
echo "Chunk smoke PASSED (${#chunks[@]} files on ${ROUTE})"
