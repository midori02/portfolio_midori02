import { FC, useState, ReactElement } from 'react'
import { useQuery } from 'react-query'

import { IconArea } from 'components/atoms/Images'
import { TextAnimation } from '../Texts'
import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'
import { ADMIN_UID, getProfileIconPath } from 'lib/constants'
import { fetchProfile } from 'lib/background'
import styles from 'styles/components/molecules/top_image.module.scss'

const TopImage: FC = (): ReactElement => {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState<boolean>(false)
  const [_, setCursorHover] = useAtom(cursorActive)
  const profile = useQuery('profile', () => fetchProfile(ADMIN_UID))
  const iconPath = getProfileIconPath(profile.data)
  const isOpen = count >= 1

  const handleClick = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 1))
    if (count === 0) {
      setActive(true)
    }
  }

  return (
    <div className={styles.top_image}>
      <div className={styles.top_image__headingWrap}>
        {isOpen && (
          <div className={styles.top_image__lamp}>
            <svg width={'56px'} height={'56px'} viewBox={'0 0 100 100'}>
              <path d="M78.29,40.1a38.21,38.21,0,0,1-7,24.47,85.34,85.34,0,0,0-14.07,32L57,97.7H23.05l-.24-1.17A88.24,88.24,0,0,0,8.51,64.25,38.35,38.35,0,1,1,78.29,40.1Z" />
            </svg>
            <div className={styles.top_image__lamp_glow}></div>
            <div className={styles.top_image__lamp_base}>
              <IconArea path={'/base.svg'} width={56} height={20} />
            </div>
          </div>
        )}
        <div className={active ? styles.top_image__heading_change : styles.top_image__heading}>
          <span>welcome to</span>
          <span>my web site</span>
        </div>
      </div>

      <div className={`${styles.top_image__hero} ${isOpen ? styles.top_image__hero_open : ''}`}>
        <div className={styles.top_image__hero_row}>
          <div className={styles.top_image__hero_iconWrap}>
            <div
              onClick={() => handleClick()}
              className={styles.top_image__hero_icon}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              <img
                src={iconPath}
                alt=""
                className={styles.top_image__hero_icon_img}
                width={190}
                height={190}
              />
              <div className={styles.top_image__hero_icon_shadow}></div>
            </div>
          </div>

          <div className={styles.top_image__hero_content}>
            {isOpen && (
              <div className={styles.top_image__hero_text}>
                <TextAnimation />
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <div className={styles.top_image__scrolldown}>
            <span>Scroll</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopImage
