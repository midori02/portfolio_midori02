import { FC } from 'react'
import Slider from 'react-slick'
import { useRouter } from 'next/router'

import { ImageArea } from 'components/atoms/Images'
import { ImageType } from 'types/utility'
import styles from 'styles/components/molecules/auto_slide.module.scss'

type Props = {
  title: string
  contents: {
    id: string
    image: ImageType[]
    genre: string
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
      <div className={styles.auto_slide__container_title} onClick={() => router.push(`/${title}`)}>
        {title}
      </div>
      <div className={styles.auto_slide__container_animation}>
        <Slider {...settings}>
          {contents.map((content) => (
            <div
              className={styles.auto_slide__container_animation_image}
              onClick={() => console.log(content.id)}
              key={content.id}
            >
              <ImageArea path={content.image[0].path} width={400} height={400} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default AutoSlideAnimation
