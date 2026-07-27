import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
console.log(import.meta.env);