import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { StaffAuthProvider, UserAuthProvider } from "./contexts.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StaffAuthProvider>
        <UserAuthProvider>
          <GoogleOAuthProvider clientId="122517800753-krun0i8ctfg9lbn2bvsdgjen44sb87lt.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </UserAuthProvider>
      </StaffAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
