import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

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
    element: <div>play</div>,
    errorElement: <div>errorLayout</div>,
    children: [{ path: ":filmId", element: <div>film</div> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
