import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LucenaGeocodeMap from "./components/CodeniKen.jsx";
import GeocodePOIDemo from "./components/POIorGEOCODE.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
