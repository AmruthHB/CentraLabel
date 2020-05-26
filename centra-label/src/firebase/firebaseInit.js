import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB3zAfPUEYMdkyBrBHOrqNHvAY0anwrrIA",
    authDomain: "centralabel-prototype-66a86.firebaseapp.com",
    databaseURL: "https://centralabel-prototype-66a86.firebaseio.com",
    projectId: "centralabel-prototype-66a86",
    storageBucket: "centralabel-prototype-66a86.appspot.com",
    messagingSenderId: "631817848295",
    appId: "1:631817848295:web:6c993d271332ffeec56942",
    measurementId: "G-YK70R6GYM6"
  };

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp