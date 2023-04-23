import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Play from "./pages/PlayLayout/Play/Play";
import PlayLayout from "./pages/PlayLayout/PlayLayout";
import Splash from "./pages/SplashLayout/Splash";
import MainLayout from "./pages/MainLayout/MainLayout";

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
  {
    path: "/splash",
    element: <Splash />,
    errorElement: <div>errorLayout</div>,
  },
  {
    path: "/main",
    element: <MainLayout />,
    errorElement: <div>errorLayout</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
