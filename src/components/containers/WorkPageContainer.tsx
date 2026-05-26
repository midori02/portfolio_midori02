import { FC } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { ADMIN_UID } from 'lib/constants'
import { getAsString } from 'lib/helper'
import { WorkPageTemplate } from 'components/templates'
import { fetchContents, fetchWebsites, fetchGraphics, fetchPackages, fetchEditorials, fetchOthers } from 'lib/works'

const WorkPageContainer: FC = () => {
  const allContents = useQuery('contents', () => fetchContents(ADMIN_UID))
  const router = useRouter()
  const works = getAsString(router.query.works)
  if (allContents.isLoading) return <>Loading...</>
  return <WorkPageTemplate contents={allContents.data} works={works} />
}

export default WorkPageContainer
