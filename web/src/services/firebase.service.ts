// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import { Party } from "../model/party";

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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

export const getAll = async () => {
  const getParties = httpsCallable(functions, "getParties");
  return await getParties()
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const add = async (party: Party) => {
  const postParty = httpsCallable(functions, "postParty", {
    limitedUseAppCheckTokens: true,
  });
  return await postParty(party)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
