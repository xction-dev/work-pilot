import styles from "./VideoPlayer.module.scss";
import { VideoData } from "../../../types/video";
import { useLayoutEffect, useRef } from "react";

type Props = VideoData;

export default function VideoPlayer({ video: { id, source }, status }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useLayoutEffect(() => {
    if (videoRef.current) {
      if (status === "playing") {
        videoRef.current?.play();
      }
    }
  }, [videoRef, status]);
  return (
    <div className={styles.VideoPlayer}>
      <video className={styles.video} ref={videoRef}>
        <source src={source} type="video/mp4" />
      </video>
    </div>
  );
}
