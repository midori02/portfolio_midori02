import { VFC } from 'react'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
}
const IconArea: VFC<Props> = (props) => {
  const { onClick, path, width, height } = props

  return <img onClick={onClick} src={path} width={width} height={height} />
}

export default IconArea
