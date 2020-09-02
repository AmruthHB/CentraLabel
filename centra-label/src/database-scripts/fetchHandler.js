import storage from '@/firebase/storageInit.js'
import "firebase/storage"

import db from '@/firebase/firestoreInit'
import "firebase/firestore"

export const getLink = async (imageRef) => {
    const url = await storage.ref(imageRef).getDownloadURL();
    return url;
  }

export const getInfo = async (datasetName) => {
    let imageStorageLink = ""
    let annotationObj;

    const currentReference = await db.collection(datasetName).doc("Current_Image").get()
    const currentImage = currentReference.data().fileName

    const doc = await db.collection(datasetName).doc(currentImage).get()

    if (doc.exists) { 
      imageStorageLink = doc.data().filePath
      annotationObj =  doc.data().Annotations
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    return {
      annotationObject: annotationObj, 
      link: imageStorageLink}
  }

