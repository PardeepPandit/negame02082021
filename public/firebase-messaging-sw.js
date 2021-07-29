importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBMyaisGvESJDPxNSUd_afVEFs-0qVBg8c",
  authDomain: "ne-game-785df.firebaseapp.com",
  projectId: "ne-game-785df",
  storageBucket: "ne-game-785df.appspot.com",
  messagingSenderId: "692135212531",
  appId: "1:692135212531:android:885496efc4e643d9f18e86"
  });
  
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const initMessaging = firebase.messaging();