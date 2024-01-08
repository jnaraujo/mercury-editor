import Home from "@/routes";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./routes/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/editor/:slug",
        lazy: () => import("@/routes/editor"),
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);
