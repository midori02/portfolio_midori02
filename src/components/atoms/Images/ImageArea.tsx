import { VFC, CSSProperties } from 'react'
import Image from 'next/image'

import styles from 'styles/components/atoms/image_area.module.scss'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
  alt?: string
  objectFit?: 'cover' | 'contain'
  /** スライダー等の固定高さ枠。Next 12 の Image ラッパー相当 */
  fit?: 'intrinsic' | 'frame'
}

const ImageArea: VFC<Props> = (props) => {
  const { onClick, path, width, height, alt = '', objectFit = 'cover', fit = 'intrinsic' } = props

  if (fit === 'frame') {
    const imgStyle: CSSProperties = { objectFit, objectPosition: 'center' }

    return (
      <div
        className={[styles.image_area, styles['image_area--frame'], 'image_area'].join(' ')}
        onClick={onClick}
      >
        <Image
          src={path}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 280px"
          className={styles.image_area__imgFill}
          style={imgStyle}
        />
      </div>
    )
  }

  const imgStyle: CSSProperties = { objectFit }

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
      <Image
        src={path}
        alt={alt}
        width={width}
        height={height}
        className={styles.image_area__img}
        style={imgStyle}
      />
    </div>
  )
}

export default ImageArea
