import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shop-1e3d1.firebaseapp.com",
  projectId: "shop-1e3d1",
  storageBucket: "shop-1e3d1.appspot.com",
  messagingSenderId: "381499709555",
  appId: "1:381499709555:web:4343defef779ad87977206",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
