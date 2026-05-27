import { FC, ReactNode } from 'react'

import Link from 'next/link'
import { cursorActive } from 'contexts/CursorContext'
import { useAtom } from 'jotai'

type Props = {
  path: string
  children: ReactNode
}

const CommonLink: FC<Props> = ({ path, children }) => {
  const [_, setActive] = useAtom(cursorActive)

  return (
    <Link
      href={path}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
    </Link>
  )
}

export default CommonLink
