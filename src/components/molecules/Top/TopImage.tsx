import { FC, useState, ReactElement } from 'react'

import { IconArea, ImageArea } from 'components/atoms/Images'
import { TextAnimation } from '../Texts'
import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'
import styles from 'styles/components/molecules/top_image.module.scss'

// type Props = {
//   onClick?: () => void
// }
const TopImage: FC = (): ReactElement => {
  // const { onClick } = props
  const [count, setCount] = useState(0)
  const [active, setActive] = useState<boolean>(false)
  const [_, setCursorHover] = useAtom(cursorActive)
  const className = 'top_image__heading_change'
  const handleClick = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 1))
    if (count === 0) {
      setActive(true)
    }
  }

  return (
    <>
      <div className={styles.top_image}>
        <div className={active ? `${styles[className]}` : `${styles.top_image__heading}`}>
          <span>welcome to</span>
          <br />
          <span>my web site</span>
        </div>

        <div
          onClick={() => handleClick()}
          className={styles.top_image__icon}
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
        >
          <ImageArea path={'/icon_me.svg'} width={240} height={240} />
          <div className={styles.top_image__icon_shadow}></div>
          {count >= 1 && (
            <div className={styles.top_image__clicked}>
              <div className={styles.top_image__clicked_lamp}>
                <svg width={'56px'} height={'56px'} viewBox={'0 0 100 100'}>
                  <path d="M78.29,40.1a38.21,38.21,0,0,1-7,24.47,85.34,85.34,0,0,0-14.07,32L57,97.7H23.05l-.24-1.17A88.24,88.24,0,0,0,8.51,64.25,38.35,38.35,0,1,1,78.29,40.1Z" />
                </svg>
                <div className={styles.top_image__clicked_lamp_glow}></div>
                <div className={styles.top_image__clicked_lamp_base}>
                  <IconArea path={'/base.svg'} width={56} height={20} />
                </div>
              </div>

              <div className={styles.top_image__clicked_text}>
                <TextAnimation />
                <div className={styles.top_image__clicked_text_scrolldown}>
                  <span>Scroll</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TopImage
