import { FC } from 'react'

import { IconArea } from 'components/atoms/Images'
import { SNSLinkComponent } from 'components/molecules/Link'
import styles from 'styles/components/organisms/footer.module.scss'

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__text}>
        <p>My Everyday Practice Here. Check it!</p>
        <img src={'/arrow.png'} alt="icon"></img>
      </div>
      <SNSLinkComponent />
      <div className={styles.footer__copywrite}>© midori02 All rights reserved.</div>
    </div>
  )
}

export default Footer
