import { FC, useState, createContext } from 'react'

import { IconArea, ImageArea } from 'components/atoms/Images'
import styles from 'styles/components/molecules/top_image.module.scss'

type Props = {
  onClick?: () => void
}
const TopImage: FC<Props> = (props) => {
  const { onClick } = props
  const [count, setCount] = useState(0)
  const [active, setActive] = useState<boolean>(false)

  const handleClick = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 5))
  }

  console.log(active)

  return (
    <>
      <div className={styles.top_image}>
        <div onClick={() => handleClick()} className={styles.top_image__icon}>
          <ImageArea path={'/icon_me.svg'} width={320} height={320} />
          <div className={styles.top_image__icon_shadow}></div>
          <p></p>
          {count >= 1 && (
            <div
              onClick={() => setActive(true)}
              className={active ? styles.top_image__active : styles.top_image__clicked2}
            >
              <svg width={'72px'} height={'72px'} viewBox={'0 0 100 100'} onClick={onClick}>
                <path d="M78.29,40.1a38.21,38.21,0,0,1-7,24.47,85.34,85.34,0,0,0-14.07,32L57,97.7H23.05l-.24-1.17A88.24,88.24,0,0,0,8.51,64.25,38.35,38.35,0,1,1,78.29,40.1Z" />
              </svg>
              {active && <div className={styles.top_image__clicked2_glow}></div>}
              <div className={styles.top_image__clicked2_base}>
                <IconArea path={'/base.svg'} width={70} height={30} />
              </div>
              <p></p>
            </div>
          )}
        </div>
        {count >= 1 && (
          <div className={styles.top_image__clicked1}>
            <div className={styles.top_image__clicked1_bar}></div>
            <p>Hello !</p>
            <p>I'm a web designer</p>
          </div>
        )}

        {count >= 3 && (
          <div className={styles.top_image__clicked3}>
            <p></p>
          </div>
        )}
        {count >= 4 && (
          <div className={styles.top_image__clicked4}>
            <p></p>
          </div>
        )}
        {count >= 5 && (
          <div className={styles.top_image__clicked5}>
            <p></p>
          </div>
        )}
      </div>
    </>
  )
}

export default TopImage
