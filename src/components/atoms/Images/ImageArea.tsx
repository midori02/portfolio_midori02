import { VFC } from 'react'
import Image from 'next/image'

import styles from 'styles/components/atoms/image_area.module.scss'

export type ImageAreaLayout = 'responsive' | 'fill'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
  alt?: string
  layout?: ImageAreaLayout
  objectFit?: 'cover' | 'contain'
  className?: string
}

const ImageArea: VFC<Props> = (props) => {
  const {
    onClick,
    path,
    width,
    height,
    alt = '',
    layout = 'responsive',
    objectFit = 'cover',
    className,
  } = props

  const wrapperClass = [
    styles.image_area,
    objectFit === 'contain' ? styles['image_area--contain'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const wrapperStyle =
    layout === 'responsive'
      ? { aspectRatio: `${width} / ${height}` }
      : { width: '100%', height: '100%' }

  return (
    <div className={wrapperClass} onClick={onClick} style={wrapperStyle}>
      <Image
        src={path}
        alt={alt}
        fill
        className={styles.image_area__img}
        sizes={
          layout === 'fill'
            ? '(max-width: 768px) 90vw, 280px'
            : '(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 800px'
        }
      />
    </div>
  )
}

export default ImageArea
