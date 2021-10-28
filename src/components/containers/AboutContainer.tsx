import { FC } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'

import { AboutTemplate } from 'components/templates'
import { fetchHistories, fetchProfile } from 'lib/background'

const AboutContainer: FC = () => {
  const uid = 'OJqbIkJta9a9YJsCmNbutJOOJn22'
  const histories = useQuery('histories', () => fetchHistories(uid))
  const profile = useQuery('profile', () => fetchProfile(uid))
  // const profile = useQuery('')
  console.log(profile.data)
  if (histories.isLoading || profile.isLoading) return <>Loading...</>
  return <AboutTemplate histories={histories.data} profile={profile.data} />
}

export default AboutContainer
