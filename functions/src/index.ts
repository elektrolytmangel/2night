import { initializeApp } from 'firebase-admin/app';
import { deleteParty, getParties, getParty, postParty, putParty } from './api/party.api';
import { assignUserRoles, listUsers } from './api/user.api';
import S from './infrastructure/service-registry';

// public firebase config: https://firebase.google.com/support/guides/security-checklist#understand_api_keys
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

// Initialize the app with your service account
const app = initializeApp(firebaseConfig);

// initialize services which can be accessed later from everywhere
S.initialiazeServices(app);

export { assignUserRoles, deleteParty, getParties, getParty, listUsers, postParty, putParty };
