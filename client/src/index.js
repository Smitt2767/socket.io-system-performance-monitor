import React from "react";
import ReactDomClient from "react-dom/client";
import App from "./App";
import PerfDataProvider from "./context/PerfDataProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./index.css";

ReactDomClient.createRoot(document.querySelector("#root")).render(
  <ThemeProvider>
    <PerfDataProvider>
      <App />
    </PerfDataProvider>
  </ThemeProvider>
);
