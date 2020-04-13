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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubsribe = auth.onAuthStateChanged(userAuth => {
      unsubsribe();
      resolve(userAuth);
    }, reject)
  })
};

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
  // console.error(transformedCollection);
  return transformedCollection.reduce((accumlator, collection) => {
    accumlator[collection.title.toLowerCase().slice(0, 4)] = collection;
    return accumlator;
  }, {})
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ 'prompt': 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;