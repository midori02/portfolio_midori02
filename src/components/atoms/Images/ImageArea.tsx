import { VFC, CSSProperties } from 'react'
import Image from 'next/image'

import styles from 'styles/components/atoms/image_area.module.scss'

/** intrinsic: width/height props で最大幅を決める。frame: 親要素の枠いっぱいに cover */
export type ImageAreaFit = 'intrinsic' | 'frame'

type Props = {
  onClick?: () => void
  path: string
  width: number
  height: number
  alt?: string
  fit?: ImageAreaFit
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
    fit = 'intrinsic',
    objectFit = 'cover',
    className,
  } = props

  const wrapperClass = [
    styles.image_area,
    fit === 'frame' ? styles['image_area--frame'] : '',
    objectFit === 'contain' ? styles['image_area--contain'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const wrapperStyle: CSSProperties =
    fit === 'frame' ? { width: '100%', height: '100%' } : { width: '100%', maxWidth: width }

  const imgStyle: CSSProperties =
    fit === 'frame'
      ? { objectFit: objectFit === 'contain' ? 'contain' : 'cover' }
      : { objectFit, width: '100%', height: 'auto' }

  return (
    <div className={wrapperClass} onClick={onClick} style={wrapperStyle}>
      <Image src={path} alt={alt} width={width} height={height} className={styles.image_area__img} style={imgStyle} />
    </div>
  )
}

export default ImageArea
