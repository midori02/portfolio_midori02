#!/usr/bin/env bash
# .next 削除 → dev 再起動 → ルート + JS チャンクのスモーク（ローディング無限の再発防止）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PORT="${DEV_PORT:-3001}"
HOST="${DEV_HOST:-127.0.0.1}"
BASE="http://${HOST}:${PORT}"
LOG="${DEV_LOG:-/tmp/portfolio-midori02-public-dev.log}"
WAIT_SEC="${DEV_WAIT_SEC:-90}"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck source=/dev/null
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm use 18 >/dev/null 2>&1 || nvm use 20 >/dev/null 2>&1 || nvm use 24 >/dev/null
else
  echo "[WARN] nvm not found. Ensure Node.js 18+ is active for dev."
fi

node scripts/check-node-version.js dev

stop_port() {
  local p="$1"
  local pids
  pids="$(lsof -t -i:"${p}" 2>/dev/null || true)"
  if [ -z "$pids" ]; then
    return 0
  fi
  echo "Stopping process(es) on port ${p}: ${pids}"
  # shellcheck disable=SC2086
  kill $pids 2>/dev/null || true
  sleep 2
  pids="$(lsof -t -i:"${p}" 2>/dev/null || true)"
  if [ -n "$pids" ]; then
    # shellcheck disable=SC2086
    kill -9 $pids 2>/dev/null || true
    sleep 1
  fi
}

stop_port "$PORT"

echo "Removing stale .next cache..."
rm -rf .next

if [ ! -d node_modules/next ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting dev server at ${BASE} (log: ${LOG})"
: > "$LOG"
nohup npm run dev -- -p "${PORT}" >>"$LOG" 2>&1 &
DEV_PID=$!
echo "Dev PID: ${DEV_PID}"

deadline=$((SECONDS + WAIT_SEC))
ready=0
while [ "$SECONDS" -lt "$deadline" ]; do
  if ! kill -0 "$DEV_PID" 2>/dev/null; then
    echo "Dev server exited early. Last log lines:"
    tail -30 "$LOG" || true
    exit 1
  fi
  code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 3 "${BASE}/" 2>/dev/null || echo "000")"
  if echo "$code" | grep -qE '^(200|307|308)$'; then
    ready=1
    break
  fi
  sleep 2
done

if [ "$ready" -ne 1 ]; then
  echo "Dev server did not become ready within ${WAIT_SEC}s. Last log lines:"
  tail -30 "$LOG" || true
  exit 1
fi

echo "Dev server ready (${BASE})"
echo ""
SMOKE_HOST="${HOST}" SMOKE_PORT="${PORT}" bash scripts/smoke-test-routes.sh
echo ""
SMOKE_HOST="${HOST}" SMOKE_PORT="${PORT}" bash scripts/smoke-test-chunks.sh
