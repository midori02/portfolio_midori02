import { FC } from 'react'

import { IconArea } from 'components/atoms/Images'
import { ProfileType } from 'types/content'

import { useAtom } from 'jotai'
import { cursorActive } from 'contexts/CursorContext'

import { ARTWORK_PORTFOLIO_URL } from 'lib/constants'
import styles from 'styles/components/molecules/profile.module.scss'

type Props = {
  profile: ProfileType
}
const Profile: FC<Props> = (props) => {
  const { profile } = props

  const [_, setCursorHover] = useAtom(cursorActive)
  return (
    <div className={styles.profile}>
      <h1>{profile.name}</h1>
      <p>{profile.description}</p>
      <div
        className={styles.profile__link}
        onClick={() => window.open(ARTWORK_PORTFOLIO_URL, '_blank', 'noopener noreferrer')}
        onMouseEnter={() => setCursorHover(true)}
        onMouseLeave={() => setCursorHover(false)}
      >
        <IconArea path={'/kinoko.png'} width={32} height={32} />
        <p>my artwork portfolio →</p>
      </div>
    </div>
  )
}

export default Profile
