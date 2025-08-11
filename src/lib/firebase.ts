import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjTO1V2nIrqLXrEbn42zFiiviPbcQmD98",
    authDomain: "airkid-bd1c5.firebaseapp.com",
    projectId: "airlid-bd1c5",
    storageBucket: "airkid-bd1c5.firebasestorage.app",
    messaingSenderId: "850472972084",
    appId: "1:850472972084:web:8272ecc63066b0dd61bf61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup }