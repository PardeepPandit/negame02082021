import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID  
    /* apiKey: "AIzaSyBMyaisGvESJDPxNSUd_afVEFs-0qVBg8c",
    authDomain: "ne-game-785df.firebaseapp.com",
    projectId: "ne-game-785df",
    storageBucket: "ne-game-785df.appspot.com",
    messagingSenderId: "692135212531",
    appId: "1:692135212531:android:885496efc4e643d9f18e86" */  
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




  export default firebase