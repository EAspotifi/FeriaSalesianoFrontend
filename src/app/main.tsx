import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { AppProviders } from "./providers/AppProviders";
import { AppRouter } from "./router/AppRouter";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No se encontró el elemento #root.");

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
);
