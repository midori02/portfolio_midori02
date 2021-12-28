import { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import { IconArea } from 'components/atoms/Images'
import styles from 'styles/components/molecules/link_component.module.scss'

const SNSLinkComponent: FC = () => {
  const router = useRouter()
  return (
    <div className={styles.link_component__sns}>
      <IconArea
        onClick={() => window.open('https://github.com/midori02', '_blank', 'noopener noreferrer')}
        path={'/github_black.png'}
        width={32}
        height={32}
      />
      <IconArea
        onClick={() => window.open('https://www.instagram.com/tamag.0.0/?hl=ja', '_blank', 'noopener noreferrer')}
        path={'/instagram_black.png'}
        width={32}
        height={32}
      />
      <IconArea
        onClick={() => window.open('https://dribbble.com/midori02', '_blank', 'noopener noreferrer')}
        path={'/dribbble.png'}
        width={24}
        height={24}
      />
    </div>
  )
}

export default SNSLinkComponent
