import { FC, ReactElement } from 'react'
import Slider from 'react-slick'

import { ImageArea } from 'components/atoms/Images'
import { CommonLink } from 'components/atoms/Texts'
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

const AutoSlideAnimation: FC<Props> = (props): ReactElement => {
  const { title, contents, position } = props
  const className = 'auto_slide__' + position
  const slideKey = contents.map((content) => content.id).join('-')
  const slideCount = contents.length
  const desktopSlidesToShow = Math.min(2, Math.max(1, slideCount))

  const settings = {
    autoplaySpeed: 2000,
    autoplay: slideCount > 0,
    arrows: false,
    cssEase: 'linear',
    dots: false,
    infinite: slideCount > desktopSlidesToShow,
    slidesToShow: desktopSlidesToShow,
    slidesToScroll: 1,
    rtl: false,
    speed: 4000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: slideCount > 1,
        },
      },
    ],
  }

  return (
    <div className={position ? styles[className] : styles.auto_slide__container}>
      <CommonLink path={`/${title}`}>
        <div className={styles.auto_slide__container_title}>
          {title}
          {title === 'lps' && <span className={styles.auto_slide__container_title_sub}>(ランディングページ)</span>}
        </div>
      </CommonLink>
      <div className={styles.auto_slide__container_animation}>
        <Slider key={slideKey} {...settings}>
          {contents.map((content) => (
            <div
              className={styles.auto_slide__container_animation_image}
              onClick={() => console.log(content.id)}
              key={content.id}
            >
              <ImageArea path={content.image[0].path} width={400} height={400} fit="frame" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default AutoSlideAnimation
