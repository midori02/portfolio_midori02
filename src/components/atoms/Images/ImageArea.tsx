import { VFC } from 'react'

type Props = {
  path: string
  width: number
  height: number
}
const ImageArea: VFC<Props> = (props) => {
  const { path, width, height } = props

  return <img src={path} width={width} height={height} />
}

export default ImageArea
