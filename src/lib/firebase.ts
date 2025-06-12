
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJDT0KWzxuSE0sBj8IFBHqLxol7pVDCwU",
  authDomain: "klypsotech-admin-dashboard.firebaseapp.com",
  projectId: "klypsotech-admin-dashboard",
  storageBucket: "klypsotech-admin-dashboard.firebasestorage.app",
  messagingSenderId: "1039387647110",
  appId: "1:1039387647110:web:5a4d29fa03229dbb9a0507",
  measurementId: "G-2M23CNT943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Development emulators (only connect if running locally)
if (process.env.NODE_ENV === 'development' && !auth.emulatorConfig) {
  try {
    // Uncomment these lines if you want to use Firebase emulators in development
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
    // connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    console.log('Emulators already connected or not available');
  }
}

export default app;
