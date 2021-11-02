import { FC } from 'react'
import Slider from 'react-slick'

import { ImageType } from 'types/utility'
import styles from 'styles/components/molecules/auto_slide.module.scss'

type Props = {
  title: string
  images: ImageType[][]
  position?: 'left' | 'right'
}

const AutoSlideAnimation: FC<Props> = (props) => {
  const { title, images, position } = props

  const className = 'auto_slide__' + position

  const settings = {
    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false,
    cssEase: 'linear',
    dots: false,
    infinite: true,
    slidesToShow: 2,
    speed: 4000,
    pauseOnHover: false,
  }

  console.log(images)
  return (
    <div className={position ? styles[className] : styles.auto_slide__container}>
      <div className={styles.auto_slide__container_title}>{title}</div>
      <div className={styles.auto_slide__container_animation}>
        <Slider {...settings}>
          {images.map((image) => (
            <img key={image[0].id} src={image[0].path} alt="picture" />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default AutoSlideAnimation
