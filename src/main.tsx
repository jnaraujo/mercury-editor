import "unfonts.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import { attachConsole } from "tauri-plugin-log-api";
import { onStartupTimeEventReceived, setupAppWindow } from "./lib/application";
import { router } from "./router";

setupAppWindow().then(() => console.log("App window is ready"));
onStartupTimeEventReceived().then(({ time }) => {
  const elapsedTime = Date.now() - time;
  console.log(`Startup time: ${elapsedTime}ms`);
});

attachConsole();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
