import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOc7VmJ3dCjEkbFTJ2gBR2kft5TWK2vGY",
  authDomain: "bloggerjs-images.firebaseapp.com",
  projectId: "bloggerjs-images",
  storageBucket: "bloggerjs-images.appspot.com",
  messagingSenderId: "794799285748",
  appId: "1:794799285748:web:3902275e3efaaf9dc505a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
