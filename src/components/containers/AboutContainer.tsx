import { FC } from 'react'
import { useQuery } from 'react-query'

import { ADMIN_UID } from 'lib/constants'
import { AboutTemplate } from 'components/templates'
import { fetchHistories, fetchProfile } from 'lib/background'

const AboutContainer: FC = () => {
  const histories = useQuery('histories', () => fetchHistories(ADMIN_UID))
  const profile = useQuery('profile', () => fetchProfile(ADMIN_UID))
  if (histories.isLoading || profile.isLoading) return <>Loading...</>
  return <AboutTemplate histories={histories.data} profile={profile.data} />
}

export default AboutContainer
