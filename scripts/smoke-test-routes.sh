#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

HOST="${SMOKE_HOST:-127.0.0.1}"
PORT="${SMOKE_PORT:-3001}"
BASE="http://${HOST}:${PORT}"

ROUTES=(
  "/"
  "/websites"
  "/graphics"
)

echo "Route smoke: ${BASE}"
fail=0

for route in "${ROUTES[@]}"; do
  body="$(mktemp)"
  code="$(curl -sS -o "$body" -w '%{http_code}' --max-time 15 "${BASE}${route}" || echo "000")"
  if echo "$code" | grep -qE '^(200|307|308)$'; then
    if grep -qE 'Internal Server Error|Module not found' "$body"; then
      echo "FAIL ${route} HTTP ${code} — error text in body"
      fail=1
    else
      echo "PASS ${route} HTTP ${code}"
    fi
  else
    echo "FAIL ${route} HTTP ${code}"
    head -c 200 "$body" 2>/dev/null || true
    echo
    fail=1
  fi
  rm -f "$body"
done

if [ "$fail" -ne 0 ]; then
  echo ""
  echo "Route smoke FAILED"
  exit 1
fi

echo ""
echo "Route smoke PASSED (${#ROUTES[@]} routes)"
