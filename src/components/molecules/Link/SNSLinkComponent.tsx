import { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import { IconArea } from 'components/atoms/Images'
import styles from 'styles/components/molecules/link_component.module.scss'

const SNSLinkComponent: FC = () => {
  const router = useRouter()
  return (
    <div className={styles.link_component__sns}>
      <IconArea
        onClick={() => router.push('https://github.com/midori02')}
        path={'/github_black.png'}
        width={32}
        height={32}
      />
      <IconArea onClick={() => router.push('')} path={'/facebook_black.png'} width={32} height={32} />
      <IconArea onClick={() => router.push('')} path={'/twitter_black.png'} width={32} height={32} />
    </div>
  )
}

export default SNSLinkComponent
