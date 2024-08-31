import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3eijd_QAr1NuRoTiuVQVDNaWBjaIu0aI",
  authDomain: "nongsan-3d7a3.firebaseapp.com",
  projectId: "nongsan-3d7a3",
  storageBucket: "nongsan-3d7a3.appspot.com",
  messagingSenderId: "1094817384541",
  appId: "1:1094817384541:web:96743daeb66377af7365b4",
  measurementId: "G-FETQ5X25TX"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);