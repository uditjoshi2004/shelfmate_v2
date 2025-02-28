import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error, "Sign Up Error");
    throw error;
  }
};

// Login Function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error, "Login Error");
    throw error;
  }
};

// Google Sign-In Function
const provider = new GoogleAuthProvider();
export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    handleAuthError(error, "Google Sign-In Error");
    throw error;
  }
};

// Logout Function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    handleAuthError(error, "Logout Error");
    throw error;
  }
};

// Function to Check Auth State (User Persistence)
export const checkAuthState = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    setUser(user || null);
  });
};

// 🔹 Improved Error Handling Function
const handleAuthError = (error, context) => {
  let errorMessage = "An unexpected error occurred. Please try again.";

  switch (error.code) {
    case "auth/email-already-in-use":
      errorMessage = "This email is already in use. Try logging in.";
      break;
    case "auth/invalid-email":
      errorMessage = "Invalid email address. Please check again.";
      break;
    case "auth/user-not-found":
      errorMessage = "No user found with this email.";
      break;
    case "auth/wrong-password":
      errorMessage = "Incorrect password. Try again.";
      break;
    case "auth/weak-password":
      errorMessage = "Password is too weak. Use at least 6 characters.";
      break;
    case "auth/popup-closed-by-user":
      errorMessage = "Google sign-in popup was closed before completion.";
      break;
    default:
      errorMessage = error.message;
      break;
  }

  console.error(`${context}:`, errorMessage);
  alert(errorMessage);
};
