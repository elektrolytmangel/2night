import { initializeApp } from "firebase-admin/app";
import * as logger from "firebase-functions/logger";
import {
  deleteParty,
  getParties,
  getParty,
  postParty,
  putParty,
} from "./api/party.api";

const firebaseConfig = {
  apiKey: "AIzaSyCAC6oSF307AFVFgmDQPKP6dPFCtVIMjoI",
  authDomain: "night-403820.firebaseapp.com",
  databaseURL:
    "https://night-403820-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "night-403820",
  storageBucket: "night-403820.appspot.com",
  messagingSenderId: "601612318633",
  appId: "1:601612318633:web:4e1ab6d6ba19f161ec36b8",
  measurementId: "G-JEVF6QTY1J",
};

// Initialize the app with your service account
initializeApp(firebaseConfig);
logger.info("Initialized Firebase Admin SDK");

export { deleteParty, getParty, getParties, postParty, putParty };
