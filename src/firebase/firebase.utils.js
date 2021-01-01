import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyD0nsH1ZH4Ae6gwCVX1SbmcH-8tMJHe_CQ",
    authDomain: "crwn-db-19d84.firebaseapp.com",
    projectId: "crwn-db-19d84",
    storageBucket: "crwn-db-19d84.appspot.com",
    messagingSenderId: "496156101793",
    appId: "1:496156101793:web:81ad2c4317cb51fa1b74e0",
    measurementId: "G-3QZMP78L43"
  };

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if (!userAuth) return;

  const userRef = firestore.doc(`users_new/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email}= userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore= firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;

