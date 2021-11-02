import { adminsRef, firebaseTimeStamp } from '../firebase/index'
import { ContentType } from '../types/content'

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

export const fetchWebsites = (id: string): Promise<ContentType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('contents')
      .where('genre', '==', 'web')
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

export const fetchGraphics = (id: string): Promise<ContentType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('contents')
      .where('genre', '==', 'graphic')
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

export const fetchPackages = (id: string): Promise<ContentType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('contents')
      .where('genre', '==', 'package')
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
export const fetchEditorials = (id: string): Promise<ContentType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('contents')
      .where('genre', '==', 'editorial')
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

export const fetchOthers = (id: string): Promise<ContentType[] | undefined> => {
  return new Promise((resolve, reject) => {
    adminsRef
      .doc(id)
      .collection('contents')
      .where('genre', '==', 'others')
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
