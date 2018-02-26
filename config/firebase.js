import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA8SeHANwbbtHwX3A4clYgkz3bMElUtYas',
  authDomain: 'genee-19f80.firebaseapp.com',
  databaseURL: 'https://genee-19f80.firebaseio.com',
  projectId: 'genee-19f80',
  storageBucket: 'genee-19f80.appspot.com',
  messagingSenderId: '932347053527',
};

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
