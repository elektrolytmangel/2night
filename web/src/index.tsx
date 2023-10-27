import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./custom.scss";
import App from "./App";
import "./i18n/i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
