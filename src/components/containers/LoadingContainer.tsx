import { FC, useState, useEffect, useRef } from 'react'

import ReactLoading from 'react-loading'
import { Metaballs } from 'components/atoms/Animation'

const LoadingContainer: FC = ({ children }) => {
  const [loading, setLoading] = useState(undefined)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 6000)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('loading')) {
      setLoading(sessionStorage.getItem('loading'))
    } else {
      sessionStorage.setItem('loading', 'true')
    }
  }, [])

  return <>{!loading ? <Metaballs /> : <>{children}</>}</>
}

export default LoadingContainer
