import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import our new AuthProvider
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the entire app in the AuthProvider so global state is available everywhere */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
