import { VFC } from 'react'
import Image from 'next/image'

import styles from 'styles/components/atoms/image_area.module.scss'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
  alt?: string
  objectFit?: 'cover' | 'contain'
}

const ImageArea: VFC<Props> = (props) => {
  const { onClick, path, width, height, alt = '', objectFit = 'cover' } = props

  return (
    <div
      className={[
        styles.image_area,
        'image_area',
        objectFit === 'contain' ? styles['image_area--contain'] : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      <Image src={path} alt={alt} width={width} height={height} className={styles.image_area__img} />
    </div>
  )
}

export default ImageArea
