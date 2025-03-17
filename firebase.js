// Import Firebase (for ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvSYWemw6Bu3FuT4xZ0-Ei9XyOb5Hqih0",
    authDomain: "hackathon-22011.firebaseapp.com",
    databaseURL: "https://hackathon-22011-default-rtdb.firebaseio.com",
    projectId: "hackathon-22011",
    storageBucket: "hackathon-22011.firebasestorage.app",
    messagingSenderId: "143964082984",
    appId: "1:143964082984:web:ef075aa8454f6a4b90f61d",
    measurementId: "G-WVMW59PHRT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Export Firebase services
export { db, auth, ref, set, get, child, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
