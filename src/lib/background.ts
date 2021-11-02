// education, work background data fetch function
import { adminsRef, firebaseTimeStamp } from '../firebase/index'
import { HistoryType, ProfileType } from '../types/content'

export const fetchHistories = (id: string): Promise<HistoryType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('histories')
      .orderBy('role', 'asc')
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
