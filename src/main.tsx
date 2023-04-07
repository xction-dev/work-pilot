import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Play from "./pages/PlayLayout/Play/Play";
import PlayLayout from "./pages/PlayLayout/PlayLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>mainLayout</div>,
    errorElement: <div>errorLayout</div>,
    children: [
      {
        path: "home",
        element: <div>home</div>,
        index: true,
      },
    ],
  },
  {
    path: "/play",
    element: <PlayLayout />,
    errorElement: <div>errorLayout</div>,
    children: [{ path: ":filmId", element: <Play /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
