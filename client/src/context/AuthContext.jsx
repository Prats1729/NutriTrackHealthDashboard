// This file will provide global authentication state (logged in user) to the whole app.
import React, { createContext, useContext, useEffect, useState } from "react";
// Imports React tools: 'createContext' builds a global state box. 'useContext' lets other files open the box. 'useEffect' runs code automatically. 'useState' holds data.

import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
// Imports Firebase tools: listening to login changes, popping up the Google login window, and logging out.

import { auth, googleProvider } from "../config/firebase.js";
// Imports the specific Firebase configuration we built earlier.

import axios from "axios";
// Imports Axios, a tool used to make HTTP requests to our backend.

const AuthContext = createContext();
// Creates the actual global "box" where we will store the user data for the whole app to see.

export const useAuth = () => useContext(AuthContext);
// Creates a custom shortcut. Any file can just type 'useAuth()' to instantly grab the user data from the box.

export const AuthProvider = ({ children }) => {
  // Creates a wrapper component. Everything inside 'children' (our whole app) will have access to this context.

  const [user, setUser] = useState(null);
  // Creates a state variable to hold the user's data (starts as null because they aren't logged in yet).

  const [loading, setLoading] = useState(true);
  // Creates a state variable to track if we are currently checking their login status.

  useEffect(() => {
    // Runs this block of code automatically as soon as the app loads.

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Tells Firebase to constantly listen. If the user logs in or out, it triggers this function and gives us the 'firebaseUser'.

      if (firebaseUser) {
        // If the user successfully logged into Google...

        const token = await firebaseUser.getIdToken();
        // Ask Firebase for the secret, secure JWT string that proves who they are.

        try {
          const response = await axios.post(
            "/api/auth/sync",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          // Send that secret token to our custom backend's '/sync' route inside an "Authorization" header.

          setUser(response.data.data);
          // If the backend accepts it, take the MongoDB profile it sends back and save it in our global 'user' state.
        } catch (error) {
          console.error("Failed to sync with backend:", error);
          // If the backend rejects the token or crashes, print an error.

          setUser(null);
          // Ensure the user state remains null so they don't get logged into a broken app.
        }
      } else {
        setUser(null);
        // If the Firebase listener says the user logged out, clear their data from the state.
      }

      setLoading(false);
      // Once we finish checking everything, turn off the loading spinner.
    });

    return () => unsubscribe();
    // A cleanup function: If this component is ever destroyed, tell Firebase to stop listening to save memory.
  }, []);
  // The empty array means this 'useEffect' only runs once when the app first opens.

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  // A helper function that triggers the Google sign-in popup when called.

  const logout = () => signOut(auth);
  // A helper function that logs the user out of Firebase when called.

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {/* We pass down 'user', 'loginWithGoogle', etc., so any child file can use them. */}

      {!loading && children}
      {/* We wait until '!loading' is true (meaning we finished checking Firebase) before rendering the app. */}
    </AuthContext.Provider>
  );
};
