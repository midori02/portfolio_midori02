import { FC, useState, useEffect, useRef } from 'react'

import ReactLoading from 'react-loading'
import { Metaballs } from 'components/atoms/Animation'

const LoadingContainer: FC = ({ children }) => {
  const [loading, setLoading] = useState(undefined)
  const LoadingRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 6000)
  }, [LoadingRef])

  return (
    <>
      {!loading ? (
        <div ref={LoadingRef}>
          <Metaballs />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default LoadingContainer
