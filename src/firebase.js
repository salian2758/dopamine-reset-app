import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCe7JPFYgoCD3P97a-HGpwo50DrIwsLtoY",
  authDomain: "dopamine-reset-rafa.firebaseapp.com",
  projectId: "dopamine-reset-rafa",
  storageBucket: "dopamine-reset-rafa.firebasestorage.app",
  messagingSenderId: "532560000783",
  appId: "1:532560000783:web:04ccc36d00435101c9707a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
