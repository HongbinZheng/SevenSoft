import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCEK08XguV4CVa4balQ05DD-zj1L8I57QY",
    authDomain: "minisafeway-ac266.firebaseapp.com",
    databaseURL: "https://minisafeway-ac266.firebaseio.com",
    projectId: "minisafeway-ac266",
    storageBucket: "minisafeway-ac266.appspot.com",
    messagingSenderId: "1031101506009"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

export {
    firebase,
    firebaseDB,
}


/*
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
*/