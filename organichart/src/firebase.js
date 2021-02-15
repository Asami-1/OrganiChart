import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    // firebase back end config data
    apiKey: 'AIzaSyCr-YHsgqXzhCPn4mPLwrLHmXdQ2xmPNFE',
    authDomain: 'basf-42c45.firebaseapp.com',
    projectId: 'basf-42c45',
    storageBucket: 'basf-42c45.appspot.com',
    messagingSenderId: '1092824187911',
    appId: '1:1092824187911:web:97c645b849202e55c396a2',
    measurementId: 'G-GCBK49PFYR'
});

const db = firebaseApp.firestore();

//  export the firestore to make it accessible from the front
export { db };