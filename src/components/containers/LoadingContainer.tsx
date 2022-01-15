import { FC, useState, useEffect } from 'react'

import ReactLoading from 'react-loading'
import { Metaballs } from 'components/atoms/Animation'

const LoadingContainer: FC = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(undefined)
  const [completed, setCompleted] = useState(undefined)

  useEffect(() => {
    setTimeout(() => {
      //   fetch('https://jsonplaceholder.typicode.com/todos/1')
      //     .then((response) => response.json())
      //     .then((json) => {
      //       setData(json)

      //     })
      setLoading(true)
    }, 6000)
  })

  return (
    <>
      {!loading ? (
        // <ReactLoading type={'bars'} color={'green'} width={100} height={80} />
        <Metaballs />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default LoadingContainer
