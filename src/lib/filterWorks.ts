import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { useMutation, useQueryClient, UseMutateFunction } from 'react-query'

import { ContentType } from 'types/content'
import { ImageType } from 'types/utility'
import { PeriodType } from 'types/period'
import Works from 'pages/[works]'

export const filterData = (genre: string, allWorks: ContentType[]) => {
  // const images: ImageType[][] = []
  const result = []
  const filterData = allWorks.filter((work) => work.genre === genre)
  filterData.map((content) => {
    result.push({ id: content.content_id, image: content.image })
  })
  return result
}
