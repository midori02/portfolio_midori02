import { FC } from 'react'

import { ImageArea } from 'components/atoms/Images'
import { WorksLinkComponent } from 'components/molecules/Link'
import { AutoSlideAnimation } from 'components/molecules/Works'
import { ContentType } from 'types/content'
import { workContents } from 'lib/data'
import { filterData } from 'lib/filterWorks'
import styles from 'styles/components/templates/works_template.module.scss'

type Props = {
  contents: ContentType[]
}
const WorksTemplate: FC<Props> = (props) => {
  const { contents } = props

  return (
    <div id={'works'} className={styles.works_template}>
      <div className={styles.works_template__title}>
        <ImageArea path={'/title-works.svg'} width={320} height={56} />
      </div>
      <div className={styles.works_template__menu}>
        <WorksLinkComponent />
      </div>
      <div className={styles.works_template__contents}>
        <div className={styles.works_template__contents_hidden}>
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
