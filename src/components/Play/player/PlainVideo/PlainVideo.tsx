import styles from "./PlainVideo.module.scss";
import { useEffect, useRef } from "react";
import { useXctionPlayer } from "../../../../libs/useXctionPlayer/useXctionPlayer";

const normalFrameRate = 24;
const dropFrameRate = 23.976;

type Props = {
  isActive: boolean;
  sourceURL: string;
};

export default function PlainVideo({ isActive, sourceURL }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playStatus = useXctionPlayer((state) => state.playStatus);
  const { loadVideoRef } = useXctionPlayer((state) => state.actions);
  const currentFrame = useRef(0);
  const prevFrame = useRef(0);

  const rVFCTest2 = (a: DOMHighResTimeStamp, b: VideoFrameCallbackMetadata) => {
    currentFrame.current += 1;
    console.log(
      currentFrame.current === prevFrame.current + 1
        ? `good:${currentFrame.current}`
        : `something's wrong:${currentFrame.current} ${prevFrame.current}`,
    );
    prevFrame.current = currentFrame.current;

    if (videoRef.current) {
      videoRef.current.requestVideoFrameCallback(rVFCTest2);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      //autoplay logic
      if (isActive && playStatus === "playing") {
        videoRef.current
          .play()
          .then(() => {
            //success message
            console.log("video success");
          })
          .catch((e) => {
            //fail message
            console.log(e);
          });
      }
      //set ref logic
      if (isActive) loadVideoRef(videoRef.current);
      //useFrame logic
      if (isActive) {
        videoRef.current.requestVideoFrameCallback(rVFCTest2);
      }
    }
  }, [videoRef, isActive]);

  return (
    <video
      ref={videoRef}
      className={`${styles.PlainVideo} ${
        isActive ? styles.active : styles.inactive
      }`}
      controls
    >
      <source src={sourceURL} type="video/mp4" />
      {/* 대체 소스가 있을 경우 추가*/}
    </video>
  );
}
