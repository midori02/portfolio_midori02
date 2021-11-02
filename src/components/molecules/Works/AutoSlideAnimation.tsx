import { FC } from 'react'
import Slider from 'react-slick'
import { useRouter } from 'next/router'

import { ImageType } from 'types/utility'
import styles from 'styles/components/molecules/auto_slide.module.scss'

type Props = {
  title: string
  // images: ImageType[][]
  contents: {
    id: string
    image: ImageType[]
  }[]
  position?: 'left' | 'right'
}

const AutoSlideAnimation: FC<Props> = (props) => {
  const { title, contents, position } = props
  const router = useRouter()
  const className = 'auto_slide__' + position

  const settings = {
    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false,
    cssEase: 'linear',
    dots: false,
    infinite: true,
    slidesToShow: 2,
    rtl: position === 'left' ? true : false,
    speed: 4000,
    pauseOnHover: false,
  }

  return (
    <div className={position ? styles[className] : styles.auto_slide__container}>
      <div className={styles.auto_slide__container_title} onClick={() => router.push('/')}>
        {title}
      </div>
      <div className={styles.auto_slide__container_animation}>
        <Slider {...settings}>
          {contents.map((content) => (
            <img
              onClick={() => console.log(content.id)}
              key={content.image[0].id}
              src={content.image[0].path}
              alt="picture"
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default AutoSlideAnimation
