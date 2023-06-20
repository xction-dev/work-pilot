import styles from "./PlainVideo.module.scss";
import { useCallback, useEffect, useRef } from "react";
import {
  playWithId,
  useXctionPlayer,
} from "../../../../libs/XctionPlayer/useXctionPlayer";
import { useNavigate } from "react-router-dom";

const normalFrameRate = 24;
const dropFrameRate = 23.976;

type Props = {
  isActive: boolean;
  sourceURL: string;
};

export default function PlainVideo({ isActive, sourceURL }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = useXctionPlayer((state) => state.isPlaying);
  const { loadVideoRef } = useXctionPlayer((state) => state.actions.system);
  const { update, reset } = useXctionPlayer((state) => state.actions.frame);
  const { pause, setTime } = useXctionPlayer((state) => state.actions.control);
  const onEnd = useXctionPlayer((state) => state.onEnd);
  const navigate = useNavigate();

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
        videoRef.current.play().catch(() => pause());
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
        if (onEnd.type === "proceed") {
          playWithId(onEnd.to);
        }
        if (onEnd.type === "loop") {
          setTime(0);
          videoRef.current?.play();
        }
        if (onEnd.type === "pause") {
          setTime(onEnd.at);
          videoRef.current?.pause();
        }
        if (onEnd.type === "finish") {
          navigate("/map/theExhibition");
        }
      }}
      controls={false}
      playsInline={true}
    >
      <source src={sourceURL} type="video/mp4" />
      {/* 대체 소스가 있을 경우 추가*/}
    </video>
  );
}
