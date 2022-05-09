import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ContextProvider } from "./Context/Context";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HashRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </HashRouter>
);
