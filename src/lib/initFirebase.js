import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB5adQ5oezUjYfeGTARe8MI5UrzlFyEyxU',
  authDomain: 'fibmaps.firebaseapp.com',
  databaseURL: 'https://fibmaps.firebaseio.com',
  storageBucket: 'fibmaps.appspot.com',
};
firebase.initializeApp(config);


export default firebase;
