import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
// import FillForm from "./pages/fill-form/FillForm.jsx";
import ScReservationPage from "./pages/sc-tee-times/ScReservationPage.jsx";
import PacMan from "./pages/pac-man/PacMan.jsx";
import Snake from "./pages/snake/Snake.jsx";

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
          <Route path="/tee-times" element={<ScReservationPage />} />
          <Route path="/pac-man" element={<PacMan />} />
          <Route path="/snake" element={<Snake />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </StrictMode>
);
