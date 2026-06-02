/**
 * Works セクションのレイアウトを Playwright で検証（一時スクリプト）
 */
import { chromium } from 'playwright'

const urls = [
  { name: 'local', url: 'http://127.0.0.1:3001/' },
  {
    name: 'preview',
    url: 'https://portfolio-midori02-git-fix-top-works-cdd924-midori02s-projects.vercel.app/',
  },
]

async function checkWorks(page, label) {
  const report = { label, ok: true, issues: [], metrics: {} }

  try {
    await page.goto(urls.find((u) => u.name === label).url, {
      waitUntil: 'networkidle',
      timeout: 90000,
    })
  } catch (e) {
    report.ok = false
    report.issues.push(`ページ読み込み失敗: ${e.message}`)
    return report
  }

  // ローディング待ち（PC 想定: 最大 8 秒）
  await page.waitForTimeout(8000)

  const works = page.locator('#works')
  if ((await works.count()) === 0) {
    report.ok = false
    report.issues.push('#works セクションが見つからない')
    return report
  }

  await works.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1000)

  const metrics = await page.evaluate(() => {
    const worksEl = document.getElementById('works')
    if (!worksEl) return null

    const sections = worksEl.querySelectorAll('[class*="auto_slide"]')
    const sliders = worksEl.querySelectorAll('.slick-slider')
    const slides = worksEl.querySelectorAll('.slick-slide:not(.slick-cloned)')
    const titles = worksEl.querySelectorAll('[class*="container_title"]')
    const images = worksEl.querySelectorAll('[class*="animation_image"] img, [class*="animation_image"] [data-nimg]')

    const slideLayouts = Array.from(slides).slice(0, 6).map((slide) => {
      const rect = slide.getBoundingClientRect()
      const style = getComputedStyle(slide)
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        float: style.float,
        display: style.display,
      }
    })

    const titlePositions = Array.from(titles).map((t) => {
      const rect = t.getBoundingClientRect()
      return { text: t.textContent?.trim().slice(0, 30), top: Math.round(rect.top), left: Math.round(rect.left) }
    })

    const imageMetrics = Array.from(images).slice(0, 8).map((img) => {
      const rect = img.getBoundingClientRect()
      const style = getComputedStyle(img)
      const natural = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : null
      const displayed = rect.width / rect.height
      return {
        w: Math.round(rect.width),
        h: Math.round(rect.height),
        objectFit: style.objectFit,
        aspectDistortion: natural && displayed ? Math.abs(natural - displayed) / natural : null,
      }
    })

    const sectionHeights = Array.from(sections)
      .filter((el) => el.className.includes('auto_slide__right') || el.className.includes('auto_slide__left'))
      .map((el) => Math.round(el.getBoundingClientRect().height))

    return {
      sliderCount: sliders.length,
      slideCount: slides.length,
      titleCount: titles.length,
      imageCount: images.length,
      slideLayouts,
      titlePositions,
      imageMetrics,
      sectionHeights,
    }
  })

  report.metrics = metrics || {}

  if (!metrics) {
    report.ok = false
    report.issues.push('metrics 取得失敗')
    return report
  }

  if (metrics.sliderCount === 0 && metrics.imageCount === 0) {
    report.ok = false
    report.issues.push('スライダー・画像が 0（Firebase データ未取得 or レンダリング失敗の可能性）')
  }

  // 縦並び: 非 cloned slide の top が大きく異なり、left がほぼ同じ
  const visibleSlides = metrics.slideLayouts.filter((s) => s.width > 10 && s.height > 10)
  if (visibleSlides.length >= 2) {
    const sameLeft = visibleSlides.every((s) => Math.abs(s.left - visibleSlides[0].left) < 20)
    const stackedVertically =
      sameLeft &&
      visibleSlides.every((s, i, arr) => i === 0 || s.top > arr[i - 1].top + 20)
    if (stackedVertically) {
      report.ok = false
      report.issues.push('スライドが縦積み（slick 横並び失敗）')
    }
  }

  // 横伸び: aspect distortion > 15%
  for (const img of metrics.imageMetrics) {
    if (img.aspectDistortion != null && img.aspectDistortion > 0.15) {
      report.ok = false
      report.issues.push(`画像横伸び疑い（比率差 ${Math.round(img.aspectDistortion * 100)}%）`)
      break
    }
  }

  // タイトルだけ階段状（複数タイトルが近い top 帯に集中）
  if (metrics.titleCount >= 3) {
    const tops = metrics.titlePositions.map((t) => t.top)
    const range = Math.max(...tops) - Math.min(...tops)
    if (range < 800 && metrics.sectionHeights.every((h) => h < 400)) {
      report.ok = false
      report.issues.push('セクション高さ不足＋タイトル密集（100vh 潰れ・文字だけ斜めに見える状態）')
    }
  }

  // lps: 1件静止 — slick なしか
  const lpsSection = metrics.titlePositions.find((t) => t.text?.startsWith('lps'))
  if (lpsSection) {
    report.metrics.lpsNote = 'lps タイトル検出'
  }

  return report
}

const browser = await chromium.launch({ headless: true })

for (const { name } of urls) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  console.log('\n==========', name.toUpperCase(), '==========')
  try {
    const result = await checkWorks(page, name)
    console.log('OK:', result.ok)
    if (result.issues.length) console.log('Issues:', result.issues.join(' | '))
    console.log('Metrics:', JSON.stringify(result.metrics, null, 2))
    await page.screenshot({
      path: `/Users/epg1105746/Desktop/portfolio_midori02/scripts/works-check-${name}.png`,
      fullPage: false,
    })
    console.log('Screenshot: scripts/works-check-' + name + '.png')
  } catch (e) {
    console.log('ERROR:', e.message)
  }
  await context.close()
}

await browser.close()
