import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Client from "./client";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";
import Home from "./views/Home";
import Friendsview from "./views/FriendsView";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://d146551abef94cf2963c88389359ac83@o1322620.ingest.sentry.io/6579711",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const domain = window.location.origin.includes("localhost")
  ? config.domain
  : config.p_domain;
const clientId = window.location.origin.includes("localhost")
  ? config.clientId
  : config.P_clientId;

const providerConfig = {
  domain: domain,
  clientId: clientId,
  redirectUri: window.location.origin,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <ApolloProvider client={Client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/friends" element={<Friendsview />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
