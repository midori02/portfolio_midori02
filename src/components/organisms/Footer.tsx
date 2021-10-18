import { FC } from 'react'

import { SNSLinkComponent } from 'components/molecules/Link'
import styles from 'styles/components/organisms/footer.module.scss'
const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <SNSLinkComponent />
      <div className={styles.footer__copywrite}>© midori02 All rights reserved.</div>
    </div>
  )
}

export default Footer
