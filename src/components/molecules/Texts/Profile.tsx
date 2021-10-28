import { profile } from 'console'
import { FC } from 'react'

import { ProfileType } from 'types/content'
import styles from 'styles/components/molecules/profile.module.scss'

type Props = {
  profile: ProfileType
}
const Profile: FC<Props> = (props) => {
  const { profile } = props
  return (
    <div className={styles.profile}>
      <h1>{profile.name}</h1>
      <p>{profile.description}</p>
    </div>
  )
}

export default Profile
