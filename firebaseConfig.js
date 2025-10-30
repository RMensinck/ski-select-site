import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBl6-ml3hsaumgN317HOFRet0ig-ee-oso",
  authDomain: "pick-a-ski.firebaseapp.com",
  projectId: "pick-a-ski",
  storageBucket: "pick-a-ski.firebasestorage.app",
  messagingSenderId: "857488775728",
  appId: "1:857488775728:web:de8939abac1a320f322bf5",
  measurementId: "G-80PQLH335G"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const initFirebase = () => {
    return app
}