import { VFC } from 'react'

import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
}
const IconArea: VFC<Props> = (props) => {
  const { onClick, path, width, height } = props
  const [_, setCursorHover] = useAtom(cursorActive)

  return (
    <img
      onClick={onClick}
      src={path}
      width={width}
      height={height}
      onMouseEnter={() => setCursorHover(true)}
      onMouseLeave={() => setCursorHover(false)}
    />
  )
}

export default IconArea
