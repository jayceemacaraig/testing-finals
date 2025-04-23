import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Testing from "./Testing.jsx";
import LucenaGeocodeMap from "./components/CodeniKen.jsx";
import GeocodePOIDemo from "./components/POIorGEOCODE.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Testing />
  </StrictMode>
);
