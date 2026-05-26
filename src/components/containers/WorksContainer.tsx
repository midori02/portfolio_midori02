import { FC } from 'react'

import { useQuery } from 'react-query'

import { ADMIN_UID } from 'lib/constants'
import { WorksTemplate } from 'components/templates'
import { fetchContents, fetchWebsites, fetchGraphics, fetchPackages, fetchEditorials, fetchOthers } from 'lib/works'

const WorksContainer: FC = () => {
  const allContents = useQuery('contents', () => fetchContents(ADMIN_UID))

  if (allContents.isLoading) return <>Loading...</>
  return <WorksTemplate contents={allContents.data} />
}

export default WorksContainer
