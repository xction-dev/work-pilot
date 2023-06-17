import styles from "./PlainVideo.module.scss";
import { useEffect, useRef } from "react";
import {
  playWithId,
  useXctionPlayer,
} from "../../../../libs/XctionPlayer/useXctionPlayer";
import { Video } from "../../../../data/types";

const normalFrameRate = 24;
const dropFrameRate = 23.976;

type Props = {
  isActive: boolean;
  sourceURL: string;
  transition: Video["transition"];
};

export default function PlainVideo({ isActive, sourceURL, transition }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = useXctionPlayer((state) => state.isPlaying);
  const { loadVideoRef } = useXctionPlayer((state) => state.actions.system);

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
      if (isActive && isPlaying) {
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
      onEnded={() => {
        if (transition.type === "proceed") {
          console.log("to" + transition.to);
          playWithId(transition.to);
        }
      }}
      loop={transition.type === "loop"}
      controls
    >
      <source src={sourceURL} type="video/mp4" />
      {/* 대체 소스가 있을 경우 추가*/}
    </video>
  );
}
