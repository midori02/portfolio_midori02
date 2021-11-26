import { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import styles from 'styles/components/molecules/link_component.module.scss'

const WorksLinkComponent: FC = () => {
  const router = useRouter()

  return (
    <div className={styles.link_component__works}>
      <ul>
        <li
          className={(router.query.works as String) === 'websites' && styles.link_component__works_active}
          style={{ ['--indent' as any]: 1 }}
          onClick={() => router.push('/websites')}
        >
          website
        </li>
        <li
          className={(router.query.works as String) === 'lps' && styles.link_component__works_active}
          style={{ ['--indent' as any]: 2 }}
          onClick={() => router.push('/lps')}
        >
          LP
        </li>
        <li
          className={(router.query.works as String) === 'apps' && styles.link_component__works_active}
          style={{ ['--indent' as any]: 3 }}
          onClick={() => router.push('/apps')}
        >
          App
        </li>
        <li
          className={(router.query.works as String) === 'graphics' && styles.link_component__works_active}
          style={{ ['--indent' as any]: 4 }}
          onClick={() => router.push('/graphics')}
        >
          graphic
        </li>
        <li
          className={(router.query.works as String) === 'benners' && styles.link_component__works_active}
          style={{ ['--indent' as any]: 5 }}
          onClick={() => router.push('/banners')}
        >
          banner
        </li>
        <li
          className={(router.query.works as String) === 'others' && styles.link_component__works_active}
          style={{ ['--indent' as any]: 6 }}
          onClick={() => router.push('/others')}
        >
          others
        </li>
      </ul>
    </div>
  )
}

export default WorksLinkComponent
