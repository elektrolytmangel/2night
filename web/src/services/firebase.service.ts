// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Party } from '../model/party';

const firebaseConfig = {
  apiKey: 'AIzaSyCAC6oSF307AFVFgmDQPKP6dPFCtVIMjoI',
  authDomain: 'night-403820.firebaseapp.com',
  databaseURL: 'https://night-403820-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'night-403820',
  storageBucket: 'night-403820.appspot.com',
  messagingSenderId: '601612318633',
  appId: '1:601612318633:web:4e1ab6d6ba19f161ec36b8',
  measurementId: 'G-JEVF6QTY1J',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);

const functions = getFunctions(app);
functions.region = 'europe-west1';
//connectAuthEmulator(auth, 'http://127.0.0.1:9099');
// connectFunctionsEmulator(functions, 'localhost', 5001);

export const get = async (id: string) => {
  const getParty = httpsCallable(functions, 'getParty');
  return await getParty({ id })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAll = async () => {
  const getParties = httpsCallable(functions, 'getParties');
  return await getParties()
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const add = async (partyRequest: any) => {
  const postParty = httpsCallable(functions, 'postParty', {
    limitedUseAppCheckTokens: true,
  });
  return await postParty(partyRequest)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const update = async (partyRequest: Party) => {
  const putParty = httpsCallable(functions, 'putParty');
  return await putParty(partyRequest)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const remove = async (id: string) => {
  const deleteParty = httpsCallable(functions, 'deleteParty');
  return await deleteParty({ id })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addDirect = async (partyRequest: any) => {
  const db = getFirestore(app);
  const docRef = await addDoc(collection(db, 'parties'), partyRequest);
  console.log(docRef);
  //const collection = getFirestore().collection('parties');
};

export const getDirect = async (id: string) => {
  console.log('getDirect', id);
  try {
    const db = getFirestore(app);
    const docRef = doc(db, 'parties', id);
    const docSnap = await getDoc(docRef);
    console.log('getDirect', docSnap);
  } catch (error) {
    console.log(error);
  }
};
