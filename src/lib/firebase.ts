
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJDT0KWzxuSE0sBj8IFBHqLxol7pVDCwU",
  authDomain: "klypsotech-admin-dashboard.firebaseapp.com",
  projectId: "klypsotech-admin-dashboard",
  storageBucket: "klypsotech-admin-dashboard.firebasestorage.app",
  messagingSenderId: "1039387647110",
  appId: "1:1039387647110:web:5a4d29fa03229dbb9a0507",
  measurementId: "G-2M23CNT943"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
