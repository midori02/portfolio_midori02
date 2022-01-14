import { FC, useEffect, ReactElement, useRef } from 'react'
import Slider from 'react-slick'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const className = 'auto_slide__' + position
  const ttlRef = useRef(null)
  const slideRef = useRef(null)
  // const sliderRef = useRef(null)
  // const isVisible = useIsVisible(slideRef)

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

  useEffect(() => {
    const animate = async () => {
      if (slideRef.current) {
        const sr = (await import('scrollreveal')).default
        sr().reveal(slideRef.current, {
          // reset: false,
          // delay: -400,
          duration: 2000,
          opacity: 0,
          origin: 'bottom',
          distance: '160px',
        })
      }
    }
    animate()
  }, [slideRef])

  return (
    <div className={position ? styles[className] : styles.auto_slide__container}>
      <CommonLink path={''}>
        <div ref={ttlRef} className={styles.auto_slide__container_title} onClick={() => router.push(`/${title}`)}>
          {title}
          {title === 'lps' && <p>(ランディングページ)</p>}
        </div>
      </CommonLink>
      <div ref={slideRef} className={styles.auto_slide__container_animation}>
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
