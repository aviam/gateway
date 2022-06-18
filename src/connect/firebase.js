import admin from 'firebase-admin';
import serviceAccount from './snapglue-d35d3-firebase-adminsdk-91t2e-2c12eb85a1.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
