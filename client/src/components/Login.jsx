// This file will be the Login UI component matching our design system.
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  // Grab the login function from our global AuthContext
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4">
      <div className="bg-card border border-border-subtle shadow-card rounded-panel p-8 max-w-md w-full text-center">
        {/* Leaf Icon matching the design system */}
        <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-white shadow-card mx-auto mb-6">
          <span
            className="material-symbols-outlined text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          Welcome to NutriTrack
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Sign in to access your health analytics and dynamic nutrition planner.
        </p>

        {/* Google Sign-In Button */}
        <button
          onClick={loginWithGoogle}
          className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-card transition flex items-center justify-center gap-3"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 bg-white rounded-full p-0.5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="text-xs text-slate-400 mt-6">
          Secured by Firebase Authentication.
        </p>
      </div>
    </div>
  );
}
