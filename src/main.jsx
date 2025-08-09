import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

const redirectParam = new URLSearchParams(window.location.search).get(
  "redirect"
);
if (redirectParam) {
  window.history.replaceState({}, "", redirectParam);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
