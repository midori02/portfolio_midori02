import { FC, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { CommonLink } from 'components/atoms/Texts'
import styles from 'styles/components/molecules/link_component.module.scss'

const WorksLinkComponent: FC = () => {
  const router = useRouter()

  // const [hovFlag, setHovFlag] = useState<boolean>(false)

  return (
    <div className={styles.link_component__works}>
      <ul>
        <CommonLink path={'/websites'}>
          <li
            className={(router.query.works as String) === 'websites' && styles.link_component__works_active}
            style={{ ['--indent' as any]: 1 }}
            // onClick={() => router.push('/websites')}
            // onChange={hoverLinkEvent}
          >
            websites
          </li>
        </CommonLink>
        <CommonLink path={'/lps'}>
          <li
            className={(router.query.works as String) === 'lps' && styles.link_component__works_active}
            style={{ ['--indent' as any]: 2 }}
            // onClick={() => router.push('/lps')}
          >
            lps(ランディングページ)
          </li>
        </CommonLink>
        <CommonLink path={'/apps'}>
          <li
            className={(router.query.works as String) === 'apps' && styles.link_component__works_active}
            style={{ ['--indent' as any]: 3 }}
            // onClick={() => router.push('/apps')}
          >
            apps
          </li>
        </CommonLink>
        <CommonLink path={'/graphics'}>
          <li
            className={(router.query.works as String) === 'graphics' && styles.link_component__works_active}
            style={{ ['--indent' as any]: 4 }}
            // onClick={() => router.push('/graphics')}
          >
            graphics
          </li>
        </CommonLink>
        <CommonLink path={'/banners'}>
          <li
            className={(router.query.works as String) === 'benners' && styles.link_component__works_active}
            style={{ ['--indent' as any]: 5 }}
            // onClick={() => router.push('/banners')}
          >
            banners
          </li>
        </CommonLink>
        <CommonLink path={'/others'}>
          <li
            className={(router.query.works as String) === 'others' && styles.link_component__works_active}
            style={{ ['--indent' as any]: 6 }}
            // onClick={() => router.push('/others')}
          >
            others
          </li>
        </CommonLink>
      </ul>
    </div>
  )
}

export default WorksLinkComponent
