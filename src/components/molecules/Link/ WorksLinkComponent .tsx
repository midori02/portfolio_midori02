import { FC, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { MenuList } from '../Texts'
import styles from 'styles/components/molecules/link_component.module.scss'

const WorksLinkComponent: FC = () => {
  const [active, setActive] = useState<boolean>(false)

  const router = useRouter()
  return (
    <div className={styles.link_component__works}>
      <ul>
        <li style={{ ['--indent' as any]: 1 }} onClick={() => router.push('/')}>
          web site
        </li>
        <li style={{ ['--indent' as any]: 2 }} onClick={() => router.push('/')}>
          graphic design
        </li>
        <li style={{ ['--indent' as any]: 3 }} onClick={() => router.push('/')}>
          package
        </li>
        <li style={{ ['--indent' as any]: 4 }} onClick={() => router.push('/')}>
          editorial
        </li>
        <li style={{ ['--indent' as any]: 5 }} onClick={() => router.push('/')}>
          others
        </li>
      </ul>
    </div>
  )
}

export default WorksLinkComponent
