import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";

const firebaseConfig = {

};

// Initialize the app with your service account
const app = admin.initializeApp(firebaseConfig);
logger.info("Initialized Firebase Admin SDK");

export const addParty = onRequest(async (req, res) => {
  // Grab the text parameter.
  const party = req.body;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore().collection("parties").add(party);
  // Send back a message that we've successfully written the message
  res.json({ result: `Party with ID: ${writeResult.id} added.` });
});

// Example of an HTTPS function
export const securedFunction = onRequest((request, response) => {
  // Verify the authentication token
  const authToken = request.headers.authorization;
  if (!authToken) {
    response.status(403).json({ message: "Unauthorized" });
    return;
  }

  // Verify the token and extract the user ID
  admin
    .auth(app)
    .verifyIdToken(authToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // Perform your authenticated logic here
      response.json({ message: `Hello, ${uid}!` });
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      response.status(403).json({ message: "Unauthorized" });
    });
});
