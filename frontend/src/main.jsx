import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-qnsirgiedao7vvyz.au.auth0.com"
    clientId="k2siMKLAs9pcIM4OcvDimUj4BlWC1Puq"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <AppContextProvider>
      <App />
      <ToastContainer />
    </AppContextProvider>
  </Auth0Provider>
);
