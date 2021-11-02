import { ContentType } from 'types/content'
import { ImageType } from 'types/utility'

export const filterData = (genre: string, allWorks: ContentType[]) => {
  const images: ImageType[][] = []
  const result = []
  const filterData = allWorks.filter((work) => work.genre === genre)
  filterData.map((content) => {
    result.push({ id: content.content_id, image: content.image })
  })
  return result
}
