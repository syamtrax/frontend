import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
axios.defaults.withCredentials = true;



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <Routes>
        <Route path = "/*" element={<App />} />
      </Routes>
    </CookiesProvider>
  </BrowserRouter>
);
