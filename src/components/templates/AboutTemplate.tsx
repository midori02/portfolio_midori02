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
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.about_template}>
      <div className={styles.about_template__title}>
        <IconArea path={'title-about.svg'} width={400} height={72} />
      </div>
      <div className={styles.about_template__content}>
        <ImageArea path={profile ? profile.image[0].path : '/icon_me.svg'} width={160} height={160} />
        <AboutBackground histories={histories} profile={profile} />
      </div>
    </div>
  )
}

export default AboutTemplate
