import React from "react";
import { createRoot } from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "../Redux/Store.js";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
