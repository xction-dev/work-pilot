import styles from "./PlainVideo.module.scss";
import { useCallback, useEffect, useRef } from "react";
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
  const { update, reset } = useXctionPlayer((state) => state.actions.frame);
  const { setTime } = useXctionPlayer((state) => state.actions.control);

  const rVFCTest2 = useCallback(() => {
    update();
    if (videoRef.current) {
      videoRef.current.requestVideoFrameCallback(rVFCTest2);
    }
  }, [update, videoRef.current]);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        //set ref logic
        loadVideoRef(videoRef.current);
        //useFrame logic
        videoRef.current.requestVideoFrameCallback(rVFCTest2);
      }
    }
  }, [videoRef, isActive]);

  useEffect(() => {
    //autoplay logic
    if (isActive && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
        console.log("hey!");
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoRef, isActive, isPlaying]);

  return (
    <video
      ref={videoRef}
      className={`${styles.PlainVideo} ${
        isActive ? styles.active : styles.inactive
      }`}
      onEnded={() => {
        if (transition.type === "proceed") {
          playWithId(transition.to);
        }
        if (transition.type === "loop") {
          setTime(0);
          videoRef.current?.play();
        }
      }}
    >
      <source src={sourceURL} type="video/mp4" />
      {/* 대체 소스가 있을 경우 추가*/}
    </video>
  );
}
