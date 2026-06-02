/**
 * Works 検収用 — 受入基準に沿って計測
 */
import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const PREVIEW_URL =
  'https://portfolio-midori02-git-fix-top-works-cdd924-midori02s-projects.vercel.app/'
const LOCAL_URL = 'http://127.0.0.1:3001/'
const VIEWPORT = { width: 1280, height: 900 }

/** 企画者が定義した受入基準 */
const ACCEPTANCE = {
  sectionMinHeight: 850, // 100vh @ 900px 付近
  imageMaxAspectDistortion: 0.15,
  minSlidersForMultiCategory: 1,
}

async function inspectWorks(page) {
  await page.goto(page.__targetUrl, { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(8000)

  const works = page.locator('#works')
  if ((await works.count()) === 0) {
    return { ok: false, issues: ['#works なし'], categories: [] }
  }

  return page.evaluate((acceptance) => {
    const worksEl = document.getElementById('works')
    const issues = []
    const categories = []

    const sectionEls = Array.from(worksEl.querySelectorAll('[class*="auto_slide__right"], [class*="auto_slide__left"]'))

    for (const section of sectionEls) {
      const titleEl = section.querySelector('[class*="container_title"]')
      const titleText = titleEl?.textContent?.replace(/\s+/g, ' ').trim() ?? ''
      const genre = titleText.split('(')[0].trim().split(/\s/)[0] || 'unknown'
      const rect = section.getBoundingClientRect()
      const slider = section.querySelector('.slick-slider')
      const slideCount = section.querySelectorAll('.slick-slide:not(.slick-cloned)').length
      const staticImages = section.querySelectorAll('[class*="animation_image"]')
      const imgs = section.querySelectorAll('[class*="animation_image"] img')

      const imageChecks = Array.from(imgs).map((img) => {
        const r = img.getBoundingClientRect()
        const natural = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : null
        const displayed = r.width / r.height
        const distortion = natural && displayed ? Math.abs(natural - displayed) / natural : null
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          objectFit: getComputedStyle(img).objectFit,
          distortion,
        }
      })

      const itemCount = slider ? slideCount : staticImages.length
      const hasSlider = !!slider

      const cat = {
        genre,
        sectionHeight: Math.round(rect.height),
        hasSlider,
        itemCount,
        imageChecks,
      }
      categories.push(cat)

      if (rect.height < acceptance.sectionMinHeight) {
        issues.push(`${genre}: セクション高さ ${Math.round(rect.height)}px < ${acceptance.sectionMinHeight}px（100vh 未適用）`)
      }

      if (itemCount === 1 && hasSlider) {
        issues.push(`${genre}: 作品1件なのに Slider 使用中`)
      }

      if (itemCount === 1) {
        for (const img of imageChecks) {
          if (img.w > 420) {
            issues.push(`${genre}: 1件表示の枠が広すぎる（${img.w}px）`)
          }
          if (img.objectFit !== 'contain') {
            issues.push(`${genre}: 1件表示は object-fit: contain であること（現在 ${img.objectFit}）`)
          }
        }
      }

      if (itemCount > 1 && !hasSlider) {
        issues.push(`${genre}: 作品${itemCount}件なのに Slider なし`)
      }

      if (itemCount > 1) {
        for (const img of imageChecks) {
          if (img.distortion != null && img.distortion > 0.35 && img.objectFit !== 'cover') {
            issues.push(`${genre}: 画像比率崩れ疑い ${Math.round(img.distortion * 100)}%`)
            break
          }
        }
      }
    }

    // 同一 viewport 内に複数タイトルが階段状（セクション潰れ）
    const titles = Array.from(worksEl.querySelectorAll('[class*="container_title"]'))
    const titleTops = titles.map((t) => t.getBoundingClientRect().top)
    if (titles.length >= 3) {
      const inView = titleTops.filter((top) => top >= 0 && top <= window.innerHeight)
      if (inView.length >= 3) {
        issues.push(`同一画面にタイトル ${inView.length} 件（文字だけ斜めに見える状態）`)
      }
    }

    return {
      ok: issues.length === 0,
      issues,
      categories,
      viewport: { w: window.innerWidth, h: window.innerHeight },
    }
  }, ACCEPTANCE)
}

async function runTarget(browser, name, url) {
  const context = await browser.newContext({ viewport: VIEWPORT })
  const page = await context.newPage()
  page.__targetUrl = url

  console.log(`\n========== ${name.toUpperCase()} ==========`)
  console.log('URL:', url)

  const result = await inspectWorks(page)

  // 各カテゴリをスクロールしてキャプチャ
  const works = page.locator('#works')
  await works.scrollIntoViewIfNeeded()
  await page.screenshot({ path: `scripts/works-accept-${name}-top.png` })

  const sections = page.locator('[class*="auto_slide__right"], [class*="auto_slide__left"]')
  const n = await sections.count()
  for (let i = 0; i < Math.min(n, 5); i++) {
    await sections.nth(i).scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `scripts/works-accept-${name}-section${i}.png` })
  }

  console.log('RESULT:', result.ok ? 'PASS' : 'FAIL')
  if (result.issues.length) {
    console.log('Issues:')
    result.issues.forEach((i) => console.log('  -', i))
  }
  console.log('Categories:', JSON.stringify(result.categories, null, 2))

  await context.close()
  return { name, url, ...result }
}

const browser = await chromium.launch({ headless: true })
const reports = []

for (const [name, url] of [
  ['local', LOCAL_URL],
  ['preview', PREVIEW_URL],
]) {
  try {
    reports.push(await runTarget(browser, name, url))
  } catch (e) {
    reports.push({ name, url, ok: false, issues: [e.message], categories: [] })
    console.log('ERROR:', e.message)
  }
}

await browser.close()

const summary = {
  commit: '3ddc094',
  timestamp: new Date().toISOString(),
  acceptance: ACCEPTANCE,
  reports,
  overallPass: reports.every((r) => r.ok),
}

writeFileSync('scripts/works-acceptance-report.json', JSON.stringify(summary, null, 2))
console.log('\n========== SUMMARY ==========')
console.log('Overall:', summary.overallPass ? 'PASS' : 'FAIL')
console.log('Report: scripts/works-acceptance-report.json')
process.exit(summary.overallPass ? 0 : 1)
