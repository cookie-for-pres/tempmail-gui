import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDpSfqrhm7gMFtTXzeL2LjihpHA3VMoNak",
  authDomain: "tempmail-gui.firebaseapp.com",
  projectId: "tempmail-gui",
  storageBucket: "tempmail-gui.appspot.com",
  messagingSenderId: "455253969120",
  appId: "1:455253969120:web:1b60a776d63db6e1752885",
  measurementId: "G-GZZ8M3KJGS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db
}