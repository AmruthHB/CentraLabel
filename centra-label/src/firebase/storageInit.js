import app from '@/firebase/firebaseInit.js'
import 'firebase/storage'

 export default app.storage().ref()