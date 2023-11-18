import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
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
