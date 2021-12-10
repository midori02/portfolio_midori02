import React, { FC, useRef, useEffect } from 'react'

import { ImageArea } from 'components/atoms/Images'
import { Wave } from 'components/atoms/Animation'
import { WorksLinkComponent } from 'components/molecules/Link'
import { AutoSlideAnimation } from 'components/molecules/Works'
import { ContentType } from 'types/content'
import { workContents } from 'lib/data'
import { filterData } from 'lib/filterWorks'
import styles from 'styles/components/templates/works_template.module.scss'

type Props = {
  contents: ContentType[]
  move?: string
}
const WorksTemplate: FC<Props> = (props) => {
  const { contents, move = 'left' } = props
  const slideRef = useRef()

  useEffect(() => {
    const animate = async () => {
      if (slideRef.current) {
        const sr = (await import('scrollreveal')).default
        sr().reveal(slideRef.current, {
          reset: true,
          delay: 400,
          opacity: 0,
          origin: move === 'left' ? 'left' : move === 'right' ? 'right' : move === 'top' ? 'top' : 'bottom',
          distance: '40px',
        })
      }
    }
    animate()
  }, [slideRef])

  return (
    <div id={'works'} className={styles.works_template}>
      <div className={styles.works_template__title}>
        <ImageArea path={'/title-works.svg'} width={320} height={56} />
      </div>
      <div className={styles.works_template__menu}>
        <WorksLinkComponent />
      </div>
      <div className={styles.works_template__contents}>
        <div ref={slideRef} className={styles.works_template__contents_hidden}>
          {workContents.map((content, index) => (
            <AutoSlideAnimation
              title={content.title}
              contents={filterData(content.genre, contents)}
              position={index % 2 === 0 ? 'right' : 'left'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorksTemplate
