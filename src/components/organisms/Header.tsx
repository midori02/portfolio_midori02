import { FC, useRef } from 'react'
import { useRouter } from 'next/router'

import { LogoArea } from 'components/atoms/Images'
import { MenuLinkComponent } from 'components/molecules/Link'
import styles from 'styles/components/organisms/header.module.scss'

const Header: FC = () => {
  const router = useRouter()

  return (
    <div className={styles.header}>
      <LogoArea onClick={() => router.push('/')} width={300} height={64} />
      <MenuLinkComponent />
    </div>
  )
}

export default Header
