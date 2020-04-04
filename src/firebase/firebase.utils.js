import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { object } from 'firebase-functions/lib/providers/storage';
import { addItem } from '../redux/cart/cart.actions';
import { findAllByTitle } from '@testing-library/react';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // if user is not created then
  if (!snapShot.exists) {
    // fetch the necessary info
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // console.info(addtionalData);

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating User: ", error.message);
    }
  }
  return userRef;

}

export const UploadCollectionAndDocuments = async (collectionId, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionId);
  // console.info(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    // Yeh Hai Aaam Zingagi 
    // newDocRef.set(obj); 
    // Yeh Hai Mentos Zindagi
    batch.set(newDocRef, obj);
  })
  // Is Say Kya Hota hai....
  return await batch.commit();
}


export const GetCollectionSnapshot = (collectionSnapshot) => {
  const transformedCollection = collectionSnapshot.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  })
  console.error(transformedCollection);
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;