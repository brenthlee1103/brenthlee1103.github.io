import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import FillForm from "./pages/fill-form/FillForm.jsx";

import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const redirectParam = new URLSearchParams(window.location.search).get(
  "redirect"
);
if (redirectParam) {
  window.history.replaceState({}, "", redirectParam);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fill-form" element={<FillForm />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </StrictMode>
);
