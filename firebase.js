import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyxfp1CXQYFD1HWJfofMookRm8AvmMfnI",
  authDomain: "bolam3-fedd5.firebaseapp.com",
  projectId: "bolam3-fedd5",
  storageBucket: "bolam3-fedd5.appspot.com",
  messagingSenderId: "534883923133",
  appId: "1:534883923133:web:d757fe8abb03f7080073d4",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
