
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGdNNqCRA1kmrmStKbzWiIeFP9C3_WXE0",
  authDomain: "web-project-ae1e1.firebaseapp.com",
  projectId: "web-project-ae1e1",
  storageBucket: "web-project-ae1e1.appspot.com",
  messagingSenderId: "551829973770",
  appId: "1:551829973770:web:94ab442199e0a8cbce68f3",
  measurementId: "G-FN781PH8G7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);