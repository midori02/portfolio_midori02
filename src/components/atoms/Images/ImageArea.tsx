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
    layout === 'fill' ? styles['image_area--fill'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={wrapperClass}
      onClick={onClick}
      style={layout === 'responsive' ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      <Image
        src={path}
        alt={alt}
        width={width}
        height={height}
        className={styles.image_area__img}
        style={{ objectFit }}
        sizes={
          layout === 'fill'
            ? '(max-width: 768px) 45vw, 280px'
            : '(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 800px'
        }
      />
    </div>
  )
}

export default ImageArea
