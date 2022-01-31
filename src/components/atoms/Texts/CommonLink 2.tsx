import { FC } from 'react'

import Link from 'next/link'
import { cursorActive } from 'contexts/CursorContext'
import { useAtom } from 'jotai'

type Props = {
  path: string
}

const CommonLink: FC<Props> = ({ path, children }) => {
  const [_, setActive] = useAtom(cursorActive)

  return (
    <Link href={path}>
      <a onMouseOver={() => setActive(true)} onMouseLeave={() => setActive(false)}>
        {children}
      </a>
    </Link>
  )
}

export default CommonLink
