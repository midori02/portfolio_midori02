import { FC, useState, useCallback } from 'react'
// import { useRouter } from 'next/router'

import { TextContent } from '../Texts'
import { CommonLink } from 'components/atoms/Texts'
import { HistoryType, ProfileType } from 'types/content'
import { Profile } from '../Texts'
import { AboutSkills } from '.'

import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'

import styles from 'styles/components/molecules/about_background.module.scss'

type Props = {
  histories: HistoryType[]
  profile: ProfileType
}

const AboutBackground: FC<Props> = (props) => {
  const { histories, profile } = props
  const [display, setDisplay] = useState(false)
  const [_, setCursorHover] = useAtom(cursorActive)

  const displayData = display ? histories : histories.slice(0, 0)

  const toggleDisplay = useCallback(() => {
    setDisplay(!display)
  }, [display, setDisplay])

  return (
    <div style={{ overflowAnchor: 'none' }} className={styles.about_background}>
      <div className={styles.about_background__propfile}>
        <Profile profile={profile} />
      </div>
      <div className={styles.about_background__toggle} onClick={toggleDisplay}>
        {display ? (
          <div
            className={styles.personal_history}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            <p>personal history</p>
          </div>
        ) : (
          <div
            className={styles.personal_history}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            <p>personal history</p>
          </div>
        )}
      </div>
      <ul>
        {displayData.map((history) => (
          <TextContent key={history.history_id} history={history} />
        ))}
      </ul>
      <div className={styles.about_background__skills}>
        <h2>skills</h2>
        <AboutSkills />
      </div>
    </div>
  )
}

export default AboutBackground
