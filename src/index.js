import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
axios.defaults.withCredentials = true;



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);
