import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};

const app = initializeApp(config);
export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const user = (uid) => doc(firestore, `users/${uid}`);
// Peut aussi s'écrire:
// export const user = (uid) => doc(firestore, "users", uid);
