import styles from "./Play.module.scss";
import VideoPlayer from "../../../components/Play/VideoPlayer/VideoPlayer";
import { allSampleVideoSource } from "../../../data/sample/sampleVideo";
import { useState } from "react";

export default function Play() {
  const [playState, setPlayState] = useState(0);
  return (
    <div className={styles.Play}>
      <div className={styles.playerWrapper}>
        {playState <= 1 && (
          <VideoPlayer
            video={allSampleVideoSource[0]}
            status={playState === 1 ? "playing" : "loaded"}
          />
        )}
        {playState === 2 && (
          <VideoPlayer video={allSampleVideoSource[1]} status="playing" />
        )}
      </div>
      {playState < 2 ? (
        <button onClick={() => setPlayState(playState + 1)}>
          {playState === 0 ? "재생" : "다음"}
        </button>
      ) : (
        <button onClick={() => setPlayState(0)}> 다시 </button>
      )}
    </div>
  );
}
