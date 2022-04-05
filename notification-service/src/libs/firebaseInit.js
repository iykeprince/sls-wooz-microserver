import * as dotenv from "dotenv";
dotenv.config({ path: "./../../env" });
import * as firebaseAdmin from "firebase-admin";
import * as serviceAccount from "./serviceAccountKey.json";

const firebaseParams = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  client_email: serviceAccount.client_email,
  client_id: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseParams),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const firebaseMessaging = firebaseAdmin.messaging();
