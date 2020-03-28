import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDXX0YI7lNtTDCvWWAvEjHLD_PPgF4d0as",
    authDomain: "elite-bird-shop.firebaseapp.com",
    databaseURL: "https://elite-bird-shop.firebaseio.com",
    projectId: "elite-bird-shop",
    storageBucket: "elite-bird-shop.appspot.com",
    messagingSenderId: "95873064266",
    appId: "1:95873064266:web:014a38c00cfde4cf8bf5b3",
    measurementId: "G-RBW9MM21GP"
  };

firebase.initializeApp(config);
export const auth = firebase.auth(); 
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({'prompt':'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;