import db from '@/firebase/firestoreInit'
import "firebase/firestore"


export const updateImageAnnotations = async (dataset, image, identifier, object) => { 
    let annotationReference = db.collection(dataset).doc(image);
    let updateObject = {}

    let pathToAnnotations = "Annotations." + `${identifier}` 
    updateObject[pathToAnnotations] = object
    
    annotationReference.update(updateObject)
};

