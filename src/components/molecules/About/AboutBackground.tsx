import { FC, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

import { TextContent } from '../Texts'
import { HistoryType, ProfileType } from 'types/content'
import { Profile } from '../Texts'
import styles from 'styles/components/molecules/about_background.module.scss'

type Props = {
  histories: HistoryType[]
  profile: ProfileType
}

const AboutBackground: FC<Props> = (props) => {
  const { histories, profile } = props
  const [display, setDisplay] = useState(false)

  const displayData = display ? histories : histories.slice(0, 2)

  const toggleDisplay = useCallback(() => {
    setDisplay(!display)
  }, [display, setDisplay])

  return (
    <div style={{ overflowAnchor: 'none' }} className={styles.about_background}>
      <Profile profile={profile} />
      <ul>
        {displayData.map((history) => (
          <TextContent key={history.history_id} history={history} />
        ))}
      </ul>
      <div className={styles.about_background__toggle} onClick={toggleDisplay}>
        {display ? '閉じる' : 'もっと見る'}
      </div>
    </div>
  )
}

export default AboutBackground
