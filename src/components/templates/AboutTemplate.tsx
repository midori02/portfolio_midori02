import { FC, useState } from 'react'

// import { useMutation, useQueryClient } from 'react-query'

import { IconArea, ImageArea } from 'components/atoms/Images'
import { AboutBackground } from 'components/molecules/About'
import { HistoryType, ProfileType } from 'types/content'
import styles from 'styles/components/templates/about_template.module.scss'

type Props = {
  histories: HistoryType[]
  profile: ProfileType
}

const AboutTemplate: FC<Props> = (props) => {
  const { histories, profile } = props

  return (
    <div id={'about'} className={styles.about_template}>
      <div className={styles.about_template__title}>
        <IconArea path={'/title-about.svg'} width={320} height={56} />
      </div>
      <div className={styles.about_template__content}>
        <div className={styles.about_template__content_image}>
          <ImageArea path={profile ? profile.image[0].path : '/icon_me.svg'} width={240} height={240} />
        </div>
        <AboutBackground histories={histories} profile={profile} />
      </div>
    </div>
  )
}

export default AboutTemplate
