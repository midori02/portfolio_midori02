import { VFC } from 'react'
import Image from 'next/image'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
  alt?: string
}
const ImageArea: VFC<Props> = (props) => {
  const { onClick, path, width, height, alt = '' } = props

  return <Image src={path} width={width} height={height} alt={alt} onClick={onClick} />
}

export default ImageArea
