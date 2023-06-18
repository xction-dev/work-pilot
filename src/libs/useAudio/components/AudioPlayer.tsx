import styles from "./AudioPlayer.module.scss";
import { useAudio } from "../useAudio";
import { useEffect, useRef } from "react";
export default function AudioPlayer() {
  const currentAudio = useAudio((state) => state.currentAudio);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (currentAudio !== null) audioRef.current.play();
    }
  }, [currentAudio, audioRef.current]);

  return (
    <audio
      ref={audioRef}
      className={styles.AudioPlayer}
      src={currentAudio ?? ""}
    />
  );
}
