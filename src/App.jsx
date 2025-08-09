import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FillForm from "./pages/FillForm.jsx";

export default function App() {
  return (
    <>
      <nav style={{ padding: "8px 0" }}>
        <Link to="/">Home</Link> | <Link to="/fill-form">Fill Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fill-form" element={<FillForm />} />
      </Routes>
    </>
  );
}
