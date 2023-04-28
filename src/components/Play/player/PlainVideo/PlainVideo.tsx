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
  const prevFrame = useRef(-1);

  const rVFCTest = (a: DOMHighResTimeStamp, b: VideoFrameCallbackMetadata) => {
    const frame = Math.floor(b.mediaTime * dropFrameRate);
    console.log(
      prevFrame.current + 1 === frame
        ? `same: ${frame}`
        : `something's wrong: ${frame}`,
    );
    prevFrame.current = frame;

    if (videoRef.current) {
      videoRef.current.requestVideoFrameCallback(rVFCTest);
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
      //useFrame logic
      if (isActive) {
        videoRef.current.requestVideoFrameCallback(rVFCTest);
      }
    }
  }, [videoRef, isActive]);

  return (
    <video
      ref={videoRef}
      className={`${styles.PlainVideo} ${
        isActive ? styles.active : styles.inactive
      }`}
    >
      <source src={sourceURL} type="video/mp4" />
      {/* 대체 소스가 있을 경우 추가*/}
    </video>
  );
}
