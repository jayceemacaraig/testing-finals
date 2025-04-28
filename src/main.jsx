import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserSection from "./UserSection.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserSection />
  </StrictMode>
);
