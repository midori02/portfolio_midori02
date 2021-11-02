import { FirebaseTimestampType } from 'firebase'
import { ImageType } from './utility'

export type post = {
  category: string
  created_at: FirebaseTimestampType
  hash_tag: string[]
  description: string
  content: string
  image: ImageType[]
  post_id: string
  status: string
  title: string
  updated_at: FirebaseTimestampType
  uid: string
  user: {
    user_image: string
    user_name: string
  }
  like?: number
}
