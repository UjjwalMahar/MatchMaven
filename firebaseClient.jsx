import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA9gph7tscWtQT-YzgfH521I1OAmvWELK8",
  authDomain: "matchmavenn.firebaseapp.com",
  projectId: "matchmavenn",
  storageBucket: "matchmavenn.appspot.com",
  messagingSenderId: "577474773617",
  appId: "1:577474773617:web:c0987a47641b7d77ea91d0",
  measurementId: "G-BMBW6HEMLY"
};


if (getApps().length == 0) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

}
const db = getFirestore();
const auth = getAuth()
const storage = getStorage();
const rtdb = getDatabase()


export { db, storage, auth, rtdb };
// const analytics = getAnalytics(app);