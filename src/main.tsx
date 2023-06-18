import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PlayTest from "./pages/TestLayout/Play/Play";
import Interactive from "./pages/TestLayout/Interactive/Interactive";
import Frame from "./pages/TestLayout/Frame/Frame";
import RVFC from "./pages/TestLayout/RVFC/RVFC";
import DiagramTest from "./pages/MainLayout/DiagramTest";
import TestLayout from "./pages/TestLayout/TestLayout";
import Play from "./pages/Play/Play";
import Map from "./pages/Map/Map";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>errorLayout</div>,
    index: true,
  },
  {
    path: "/play/:film_id",
    element: <Play />,
    errorElement: <div>errorLayout</div>,
  },
  {
    path: "/map/:film_id",
    element: <Map />,
    errorElement: <div>errorLayout</div>,
  },
  /*
  {
    path: "/test",
    element: <TestLayout />,
    errorElement: <div>errorLayout</div>,
    children: [
      { path: "normal", element: <PlayTest /> },
      { path: "interactive", element: <Interactive /> },
      { path: "frame", element: <Frame /> },
      { path: "rvfc", element: <RVFC /> },
      { path: "diagramTest", element: <DiagramTest /> },
    ],
  },
  */
]);
/*
HTMLVideoElement.prototype._rvfcpolyfillmap = {};
HTMLVideoElement.prototype.requestVideoFrameCallback = function (callback) {
  console.log("using polyfill");
  const handle = performance.now();
  const quality = this.getVideoPlaybackQuality();
  const baseline =
    this.mozPresentedFrames ||
    this.mozPaintedFrames ||
    quality.totalVideoFrames - quality.droppedVideoFrames;

  const check = (old, now) => {
    const newquality = this.getVideoPlaybackQuality();
    const presentedFrames =
      this.mozPresentedFrames ||
      this.mozPaintedFrames ||
      newquality.totalVideoFrames - newquality.droppedVideoFrames;
    if (presentedFrames > baseline) {
      const processingDuration =
        this.mozFrameDelay ||
        newquality.totalFrameDelay - quality.totalFrameDelay ||
        0;
      const timediff = now - old; // HighRes diff
      callback(now, {
        presentationTime: now + processingDuration * 1000,
        expectedDisplayTime: now + timediff,
        width: this.videoWidth,
        height: this.videoHeight,
        mediaTime: Math.max(0, this.currentTime || 0) + timediff / 1000,
        presentedFrames,
        processingDuration,
      });
      delete this._rvfcpolyfillmap[handle];
    } else {
      this._rvfcpolyfillmap[handle] = requestAnimationFrame((newer) =>
        check(now, newer),
      );
    }
  };
  this._rvfcpolyfillmap[handle] = requestAnimationFrame((newer) =>
    check(handle, newer),
  );
  return handle;
};

HTMLVideoElement.prototype.cancelVideoFrameCallback = function (handle) {
  cancelAnimationFrame(this._rvfcpolyfillmap[handle]);
  delete this._rvfcpolyfillmap[handle];
};
*/
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
