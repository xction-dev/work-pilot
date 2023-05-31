import { useEffect, useRef, useState } from "react";
import styles from "./RVFC.module.scss";
import video from "./drop24.mp4";

let isInitiated = false;

export default function RVFC() {
  const tick = useRef(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const rVFCTest2 = (a: DOMHighResTimeStamp, b: VideoFrameCallbackMetadata) => {
    /* console.log(tick.current); */

    tick.current = tick.current + 1;

    if (videoRef.current) {
      videoRef.current.requestVideoFrameCallback(rVFCTest2);
    }
  };

  return (
    <div className={styles.wrapper}>
      <video
        ref={videoRef}
        controls
        src={video}
        onPlay={() => {
          if (!isInitiated) {
            if (videoRef.current) {
              //useFrame logic
              videoRef.current.requestVideoFrameCallback(rVFCTest2);
              isInitiated = true;
            }
          }
        }}
      />
      <button>현재 프레임을 알려줘!</button>
    </div>
  );
}
