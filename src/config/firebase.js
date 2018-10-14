import firebase from 'firebase';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBfn3C_54Ro7qXhChb5ARUbjtzZixvxMZI",
    authDomain: "meeting-app-82739.firebaseapp.com",
    databaseURL: "https://meeting-app-82739.firebaseio.com",
    projectId: "meeting-app-82739",
    storageBucket: "meeting-app-82739.appspot.com",
    messagingSenderId: "615562122395"
  };
  firebase.initializeApp(config);

  export default firebase;