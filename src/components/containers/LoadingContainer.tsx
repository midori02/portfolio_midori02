import { FC, useState, useEffect, useCallback } from 'react'

import { Metaballs } from 'components/atoms/Animation'

const LOADING_KEY = 'portfolio_midori02_loaded'
const MAX_WAIT_MS = 7000

const LoadingContainer: FC = ({ children }) => {
  const [ready, setReady] = useState(false)

  const finishLoading = useCallback(() => {
    setReady(true)
  }, [])

  useEffect(() => {
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
