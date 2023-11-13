// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

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

export const functions = getFunctions(app);
functions.region = 'europe-west1';

//connectAuthEmulator(auth, 'http://127.0.0.1:9099');
// connectFunctionsEmulator(functions, 'localhost', 5001);

