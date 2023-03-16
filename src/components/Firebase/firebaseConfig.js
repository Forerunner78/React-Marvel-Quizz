import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyDH8jRUSGgjnCzmL_tH0cv2hixRQ1dLwmY",
    authDomain: "marvel-quiz-51916.firebaseapp.com",
    projectId: "marvel-quiz-51916",
    storageBucket: "marvel-quiz-51916.appspot.com",
    messagingSenderId: "36637033744",
    appId: "1:36637033744:web:ac27e1e377c6f323599195"
};

const app = initializeApp(config);
export const auth = getAuth(app);

export const firestore = getFirestore(app)

export const user = uid => doc(firestore, `users/${uid}`);