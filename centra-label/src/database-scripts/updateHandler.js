import db from '@/firebase/firestoreInit'
import "firebase/firestore"
import firebase from 'firebase'

export const addImageAnnotation = async (dataset, image, identifier, object) => { 
    let annotationReference = db.collection(dataset).doc(image);
    let updateObject = {}

    let pathToAnnotations = "Annotations." + `${identifier}` 
    updateObject[pathToAnnotations] = object
    
    annotationReference.update(updateObject)
};

export const updateImageAnnotation = async (dataset, image, identifier, object) => {
    let annotationReference = db.collection(dataset).doc(image);
    let updateObject = {}
    let pathToAnnotations = "Annotations." + `${identifier}` + ".boundingBox" 
    updateObject[pathToAnnotations] = object

    annotationReference.update(updateObject)
};

export const deleteElement = async (dataset, image, identifier) => {
    let annotationReference = db.collection(dataset).doc(image);
    let updateObject =  {}

    let pathToAnnotations = "Annotations." + `${identifier}`

    updateObject[pathToAnnotations] = firebase.firestore.FieldValue.delete()
    annotationReference.update(updateObject)

}