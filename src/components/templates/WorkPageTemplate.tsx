import React, { FC, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

import { LogoArea } from 'components/atoms/Images'
import { WorksLinkComponent } from 'components/molecules/Link'
import { WorksCard } from 'components/molecules/Works'
import { ContentType } from 'types/content'
import styles from 'styles/components/templates/work_page.module.scss'

type Props = {
  contents: ContentType[]
  works: string
  move?: string
}
const WorkPageTemplate: FC<Props> = (props) => {
  const { contents, works, move = 'left' } = props
  const router = useRouter()

  const transformData = (data: string) => {
    const result = {
      websites: 'website',
      lps: 'LP',
      apps: 'App',
      graphics: 'graphic',
      banners: 'banner',
      others: 'others',
    }
    return result[data]
  }

  const useFilterGenre: ContentType[] = contents && contents.filter((content) => content.genre === transformData(works))
  return (
    <div className={styles.work_page}>
      <div className={styles.work_page__logo}>
        <LogoArea onClick={() => router.push('/')} width={300} height={64} />
      </div>
      <div className={styles.work_page__menu}>
        <WorksLinkComponent />
      </div>
      <div className={styles.work_page__container}>
        <div className={styles.work_page__container_title}>
          <h1>{works}</h1>
        </div>

        <div className={styles.work_page__container_list}>
          {useFilterGenre.map((content) => (
            <WorksCard key={content.content_id} content={content} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPageTemplate
