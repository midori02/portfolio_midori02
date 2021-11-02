import { FC } from 'react'
import { ImageArea } from 'components/atoms/Images'
import styles from 'styles/components/molecules/top_image.module.scss'

const TopImage: FC = () => {
  return (
    <div className={styles.top_image}>
      <ImageArea path={''} width={100} height={100} />
    </div>
  )
}

export default TopImage
