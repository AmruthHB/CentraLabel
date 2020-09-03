import db from '@/firebase/firestoreInit'
import "firebase/firestore"
import firebase from 'firebase'

export const addImageAnnotation = async (dataset, image, identifier, object) => { 
    let imageReference = await db.collection(dataset).doc(image);
    let updateObject = {}

    let renderListReference = await imageReference.get()
    let renderList = renderListReference.data().renderList
    renderList.push(identifier)

    let pathToAnnotations = "Annotations." + `${identifier}` 
    updateObject[pathToAnnotations] = object
    updateObject["renderList"] = renderList

    imageReference.update(updateObject)

};

export const updateImageAnnotation = async (dataset, image, identifier, object) => {
    let annotationReference = db.collection(dataset).doc(image);
    let updateObject = {}
    let pathToAnnotations = "Annotations." + `${identifier}` + ".boundingBox" 
    updateObject[pathToAnnotations] = object
    
    annotationReference.update(updateObject)
};

export const deleteElement = async (dataset, image, identifier) => {
    let imageReference = db.collection(dataset).doc(image);

    let renderListReference = await imageReference.get()
    let renderList = renderListReference.data().renderList
    const index = renderList.indexOf(identifier);
    renderList.splice(index, 1);
    
    
    let updateObject =  {}
    let pathToAnnotations = "Annotations." + `${identifier}`

    updateObject[pathToAnnotations] = firebase.firestore.FieldValue.delete()
    updateObject["renderList"] = renderList

    imageReference.update(updateObject)
    //change renderList

}