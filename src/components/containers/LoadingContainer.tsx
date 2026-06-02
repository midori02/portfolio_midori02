import { FC, ReactNode, useState, useEffect, useCallback } from 'react'

import { Metaballs } from 'components/atoms/Animation'

const LOADING_KEY = 'portfolio_midori02_loaded'
const MAX_WAIT_MS = 7000
/** SCSS mq('md') = 768px 未満を SP 扱い */
const SP_MAX_WIDTH_MEDIA = '(max-width: 767px)'

const isSpViewport = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(SP_MAX_WIDTH_MEDIA).matches

type Props = {
  children?: ReactNode
}

const LoadingContainer: FC<Props> = ({ children = null }) => {
  const [ready, setReady] = useState(false)

  const finishLoading = useCallback(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (isSpViewport()) {
      finishLoading()
      return
    }

    let skipped = false

    try {
      skipped =
        window.sessionStorage.getItem(LOADING_KEY) === 'true' ||
        window.sessionStorage.getItem('loading') === 'true'
      if (!skipped) {
        window.sessionStorage.setItem(LOADING_KEY, 'true')
      }
    } catch {
      // sessionStorage 不可（プライベートブラウズ等）でも表示は続行
      skipped = false
    }

    if (skipped) {
      finishLoading()
      return
    }

    const forceTimer = window.setTimeout(finishLoading, MAX_WAIT_MS)
    return () => window.clearTimeout(forceTimer)
  }, [finishLoading])

  if (!ready) {
    return <Metaballs onComplete={finishLoading} />
  }

  return <>{children}</>
}

export default LoadingContainer
