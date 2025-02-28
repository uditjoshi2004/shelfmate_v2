// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import authentication
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALVRLAl-5oFSBzGSk4XbloZqSAGGEzdiY",
  authDomain: "shelfmate-auth-b9b94.firebaseapp.com",
  projectId: "shelfmate-auth-b9b94",
  storageBucket: "shelfmate-auth-b9b94.firebasestorage.app",
  messagingSenderId: "550655282608",
  appId: "1:550655282608:web:3e4a3d274b52a5bc1ada75",
  measurementId: "G-3CJ8LHTN9C"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Initialize Firebase Auth
const analytics = getAnalytics(app);

// ✅ Export the necessary modules
export { auth, app, analytics };
