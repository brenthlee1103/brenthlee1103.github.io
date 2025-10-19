import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
// import FillForm from "./pages/fill-form/FillForm.jsx";
import ScReservationPage from "./pages/sc-tee-times/ScReservationPage.jsx";
import PacMan from "./pages/pac-man/PacMan.jsx";
import Snake from "./pages/snake/Snake.jsx";
import FlipBook from "./pages/test/FlipBook.jsx";
import FlipBookHome from "./pages/home/flip-book-home/FlipBookHome.jsx";

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
          <Route path="/flip" element={<FlipBook />} />
          <Route path="/home" element={<FlipBookHome />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </StrictMode>
);
