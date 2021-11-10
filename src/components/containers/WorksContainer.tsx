import { FC } from 'react'

import { useQuery } from 'react-query'

import { WorksTemplate } from 'components/templates'
import { fetchContents, fetchWebsites, fetchGraphics, fetchPackages, fetchEditorials, fetchOthers } from 'lib/works'

const WorksContainer: FC = () => {
  const uid = 'mTLZenxmFraMwlT5FMjbfPpCCaf2'
  // const websitesData = useQuery('web', () => fetchWebsites(uid))
  // const graphicsData = useQuery('graphics', () => fetchGraphics(uid))
  // const packagessData = useQuery('packages', () => fetchPackages(uid))
  // const editorialsData = useQuery('editorials', () => fetchEditorials(uid))
  // const othersData = useQuery('others', () => fetchOthers(uid))
  const allContents = useQuery('contents', () => fetchContents(uid))

  if (allContents.isLoading) return <>Loading...</>
  return <WorksTemplate contents={allContents.data} />
}

export default WorksContainer
