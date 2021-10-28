// education, work background data fetch function
import { adminsRef, firebaseTimeStamp } from '../firebase/index'
import { ContentType, HistoryType, ProfileType } from '../types/content'

export const fetchContents = (id: string): Promise<ContentType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('contents')
      .get()
      .then((snapshots) => {
        const contentData = []
        snapshots.forEach((snapshot) => {
          const data = snapshot.data()
          contentData.push(data)
        })
        resolve(contentData)
      })
      .catch((error) => {
        console.error(error)
        reject(undefined)
      })
  })
}

export const fetchContent = (uid: string, contentId: string): Promise<ContentType | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(uid)
      .collection('contents')
      .doc(contentId)
      .get()
      .then((document) => {
        const data = document.data() as ContentType
        resolve(data)
      })
      .catch((error) => {
        console.error(error)
        reject(undefined)
      })
  })
}
export const fetchHistories = (id: string): Promise<HistoryType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('histories')
      .get()
      .then((snapshots) => {
        const historyData = []
        snapshots.forEach((snapshot) => {
          const data = snapshot.data()
          historyData.push(data)
        })
        resolve(historyData)
      })
      .catch((error) => {
        console.error(error)
        reject(undefined)
      })
  })
}

export const fetchProfile = (uid: string): Promise<ProfileType | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(uid)
      .get()
      .then((document) => {
        const data = document.data() as ProfileType
        resolve(data)
      })
      .catch((error) => {
        console.error(error)
        reject(undefined)
      })
  })
}
