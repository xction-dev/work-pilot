import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Play from "./pages/PlayLayout/Play/Play";
import PlayLayout from "./pages/PlayLayout/PlayLayout";
import Interactive from "./pages/PlayLayout/Interactive/Interactive";
import Frame from "./pages/PlayLayout/Frame/Frame";
import RVFC from "./pages/PlayLayout/RVFC/RVFC";
import DiagramTest from "./pages/MainLayout/DiagramTest";

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
      {path: "diagramTest",
      element:<DiagramTest/>}
    ],
  },
  {
    path: "/play",
    element: <PlayLayout />,
    errorElement: <div>errorLayout</div>,
    children: [
      { path: "normal", element: <Play /> },
      { path: "interactive", element: <Interactive /> },
      { path: "frame", element: <Frame /> },
      { path: "rvfc", element: <RVFC /> },
    ],
  },
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
