import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import { HttpsError, onCall } from "firebase-functions/v2/https";

const collection = () => getFirestore().collection("parties");

export const postParty = onCall(async (req) => {
  // validate token / auth header
  // idToken comes from the client app
  const accessToken = req.auth?.token;
  if (!accessToken)
    throw new HttpsError("unauthenticated", "No token provided");
  getAuth()
    .verifyIdToken(accessToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // ...
    })
    .catch((error) => {
      // Handle error
    });

  try {
    const party = req.data;

    // todo: validate party
    const writeResult = await collection().add(party);
    return {
      ...(await writeResult.get()).data(),
      url: `/parties/${writeResult.id}`,
    };
  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});

export const deleteParty = onCall(async (req) => {
  // validate token / auth header
  try {
    const partyId = req.data.partyId;
    const doc = await collection().doc(partyId).delete();
    return doc;
  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});

export const putParty = onCall(async (req) => {
  // validate token / auth header
  try {
    const partyId = req.data.partyId;
    const party = req.data.party;
    const doc = await collection().doc(partyId).set(party);
    return doc;
  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});

export const getParty = onCall(async (req) => {
  // validation should already be ok. This is a public endpoint
  try {
    const partyId = req.data.partyId;
    const doc = await collection().doc(partyId).get();
    return doc.data();
  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});

export const getParties = onCall(async (req) => {
  // validation should already be ok. This is a public endpoint
  try {
    const docs = await collection().get();
    return docs.docs.map((doc) => doc.data());
  } catch (error: any) {
    logger.error(error);
    throw new HttpsError("internal", error.message);
  }
});
