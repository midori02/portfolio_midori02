import { FC } from 'react'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { getAsString } from 'lib/helper'
import { WorkPageTemplate } from 'components/templates'
import { fetchContents, fetchWebsites, fetchGraphics, fetchPackages, fetchEditorials, fetchOthers } from 'lib/works'

const WorkPageContainer: FC = () => {
  const uid = 'mTLZenxmFraMwlT5FMjbfPpCCaf2'
  //   const websitesData = useQuery('web', () => fetchWebsites(uid))
  //   const graphicsData = useQuery('graphics', () => fetchGraphics(uid))
  //   const packagessData = useQuery('packages', () => fetchPackages(uid))
  //   const editorialsData = useQuery('editorials', () => fetchEditorials(uid))
  //   const othersData = useQuery('others', () => fetchOthers(uid))
  const allContents = useQuery('contents', () => fetchContents(uid))
  const router = useRouter()
  const works = getAsString(router.query.works)
  if (allContents.isLoading) return <>Loading...</>
  return <WorkPageTemplate contents={allContents.data} works={works} />
}

export default WorkPageContainer
