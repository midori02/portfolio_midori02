import { VFC } from 'react'
import Image from 'next/image'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
}
const ImageArea: VFC<Props> = (props) => {
  const { onClick, path, width, height } = props

  return <Image src={path} width={width} height={height} />
}

export default ImageArea
