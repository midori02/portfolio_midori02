import { ContentType } from 'types/content'
import { ImageType } from 'types/utility'

export const filterData = (genre: string, allWorks: ContentType[]) => {
  const images: ImageType[][] = []
  const filterData = allWorks.filter((work) => work.genre === genre)
  filterData.map((content) => {
    images.push(content.image)
  })
  return images
}
