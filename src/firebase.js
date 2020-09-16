import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCV8Z89IQk5XSu6QRsgJ1TZTFuO67-PuIA',
  authDomain: 'amaz0n-clone-so.firebaseapp.com',
  databaseURL: 'https://amaz0n-clone-so.firebaseio.com',
  projectId: 'amaz0n-clone-so',
  storageBucket: 'amaz0n-clone-so.appspot.com',
  messagingSenderId: '384767673981',
  appId: '1:384767673981:web:6d2605b01bdc8b5defd314',
  measurementId: 'G-HNV52ZLXYS',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
