import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import ReservationPage from "./pages/tee-times/ReservationPage.jsx";
import PacMan from "./pages/pac-man/PacMan.jsx";
import Snake from "./pages/snake/Snake.jsx";
import FlipBookHome from "./pages/home/flip-book-home/FlipBookHome.jsx";
import ScriptEditor from "./pages/script-editor/ScriptEditor.jsx";

import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Ledger from "./pages/ledger/Ledger.jsx";

const redirectParam = new URLSearchParams(window.location.search).get(
  "redirect",
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
          <Route path="/tee-times" element={<ReservationPage />} />
          <Route path="/pac-man" element={<PacMan />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/home" element={<FlipBookHome />} />
          <Route path="/script-editor" element={<ScriptEditor />} />
          <Route path="/ledger" element={<Ledger />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </StrictMode>,
);
