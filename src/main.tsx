import "unfonts.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import { setupAppWindow } from "./lib/application";
import { router } from "./router";

setupAppWindow().then(() => console.log("App window is ready"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
