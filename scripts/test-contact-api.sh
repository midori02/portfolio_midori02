#!/usr/bin/env bash
# お問い合わせ API と主要ルートの動作・防御テスト
set -euo pipefail

HOST="${TEST_HOST:-127.0.0.1}"
PORT="${TEST_PORT:-3002}"
BASE="http://${HOST}:${PORT}"
# 本番 next start では NODE_ENV=production のため Origin は本番ドメインを指定
ORIGIN="${TEST_ORIGIN:-https://www.midori02.com}"
FAIL=0

pass() { echo "PASS $1"; }
fail() { echo "FAIL $1"; FAIL=1; }

assert_status() {
  local name="$1"
  local expected="$2"
  local actual="$3"
  if [ "$actual" = "$expected" ]; then
    pass "$name (HTTP $actual)"
  else
    fail "$name — expected HTTP $expected, got $actual"
  fi
}

# 各ケースで別 UA にして in-memory レート制限の干渉を避ける
curl_contact() {
  local ua="$1"
  shift
  curl -sS -o /tmp/contact-res.json -w '%{http_code}' -X POST \
    -H "User-Agent: ${ua}" \
    "$@"
}

echo "=== Route smoke (${BASE}) ==="
for route in "/" "/websites" "/graphics"; do
  code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "${BASE}${route}")"
  assert_status "GET ${route}" "200" "$code"
done

echo ""
echo "=== Contact API: security ==="

# form POST → 415
code="$(curl_contact "test-form" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=a&email=a@a.com&textbox=hi" \
  "${BASE}/api/contact")"
assert_status "form-urlencoded blocked" "415" "$code"

# cross-origin → 403
code="$(curl_contact "test-origin" \
  -H "Content-Type: application/json" \
  -H "Origin: https://evil.example" \
  -d '{"name":"a","email":"a@a.com","textbox":"hi"}' \
  "${BASE}/api/contact")"
assert_status "foreign Origin blocked" "403" "$code"

# Sec-Fetch-Site cross-site → 403
code="$(curl_contact "test-fetch-site" \
  -H "Content-Type: application/json" \
  -H "Sec-Fetch-Site: cross-site" \
  -d '{"name":"a","email":"a@a.com","textbox":"hi"}' \
  "${BASE}/api/contact")"
assert_status "Sec-Fetch-Site cross-site blocked" "403" "$code"

# invalid email → 400
code="$(curl_contact "test-invalid-email" \
  -H "Content-Type: application/json" \
  -H "Origin: ${ORIGIN}" \
  -d '{"name":"test","email":"not-an-email","textbox":"hello"}' \
  "${BASE}/api/contact")"
assert_status "invalid email rejected" "400" "$code"

# missing fields → 400
code="$(curl_contact "test-missing-fields" \
  -H "Content-Type: application/json" \
  -H "Origin: ${ORIGIN}" \
  -d '{"name":"test"}' \
  "${BASE}/api/contact")"
assert_status "missing fields rejected" "400" "$code"

# honeypot → 200 (silent)
code="$(curl_contact "test-honeypot" \
  -H "Content-Type: application/json" \
  -H "Origin: ${ORIGIN}" \
  -d '{"name":"bot","email":"bot@bot.com","textbox":"spam","website":"http://spam.com"}' \
  "${BASE}/api/contact")"
assert_status "honeypot silent ok" "200" "$code"

echo ""
echo "=== Contact API: valid submission (same-origin) ==="
code="$(curl_contact "test-valid-submit" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Origin: ${ORIGIN}" \
  -d '{"name":"テスト","furigana":"","email":"test@example.com","telephone":"","textbox":"API動作確認テスト（自動送信）"}' \
  "${BASE}/api/contact")"
body="$(cat /tmp/contact-res.json)"

if [ "$code" = "200" ]; then
  pass "valid JSON submission (HTTP 200) — mail sent if SMTP configured"
  echo "       response: $body"
elif [ "$code" = "503" ]; then
  pass "valid JSON accepted shape (HTTP 503 not_configured — SMTP 未設定は想定内)"
  echo "       response: $body"
elif [ "$code" = "429" ]; then
  pass "valid JSON shape ok (HTTP 429 rate_limited — レート制限作動)"
  echo "       response: $body"
else
  fail "valid submission — expected 200/503/429, got $code body=$body"
fi

echo ""
if [ "$FAIL" -ne 0 ]; then
  echo "TEST FAILED"
  exit 1
fi
echo "ALL TESTS PASSED"
