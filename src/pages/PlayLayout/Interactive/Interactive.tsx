import styles from "./Interactive.module.scss";
import { useEffect, useRef, useState } from "react";
import { VideoSource } from "../../../types/video";
import { allSampleVideoSource } from "../../../data/sample/sampleVideo";

interface PlayData {
  currentSide: "a" | "b";
  sourceA: VideoSource[];
  sourceB: VideoSource[];
  currentId: string;
}

interface PlayerProps {
  side: string;
  on: string | false;
  sources: VideoSource[];
}

function Player({ side, on, sources }: PlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (playerRef.current) {
      const videos = playerRef.current.children;
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i] as HTMLVideoElement;
        if (video.classList.contains(styles.active)) {
          video.play().then(
            () => {
              console.log("play success");
            },
            () => {
              console.error("play failed");
            },
          );
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    }
  }, [on]);
  return (
    <div
      className={`${styles.Player} ${on ? styles.on : styles.off} ${
        styles["side" + side]
      }`}
      ref={playerRef}
    >
      {sources.map(({ id, source }) => (
        <video
          key={id}
          className={`${styles.video} ${
            on === id ? styles.active : styles.inactive
          }`}
          src={source}
          muted
          controls
        />
      ))}
    </div>
  );
}
/*
function SideAPlayer({ on }: { on: boolean }) {
  return <div></div>;
}
function SideBPlayer({ on }: { on: boolean }) {
  return <div></div>;
}
*/

export default function Interactive() {
  const [playState, setPlayState] = useState<PlayData>({
    currentSide: "a",
    sourceA: [allSampleVideoSource[0]],
    sourceB: [allSampleVideoSource[1], allSampleVideoSource[2]],
    currentId: "a",
  });
  return (
    <main className={styles.Interactive}>
      <div className={styles.playerWrapper}>
        <Player
          side="A"
          on={playState.currentSide === "a" ? playState.currentId : false}
          sources={playState.sourceA}
        />
        <Player
          side="B"
          on={playState.currentSide === "b" ? playState.currentId : false}
          sources={playState.sourceB}
        />
      </div>
      <div className={styles.buttons}>
        {playState.currentSide === "a" ? (
          <>
            <button
              onClick={() => {
                setPlayState({
                  ...playState,
                  currentSide: "b",
                  sourceA: [allSampleVideoSource[0]],
                  currentId: "b",
                });
              }}
            >
              b
            </button>
            <button
              onClick={() => {
                setPlayState({
                  ...playState,
                  currentSide: "b",
                  sourceA: [allSampleVideoSource[0]],
                  currentId: "d",
                });
              }}
            >
              d
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setPlayState({
                ...playState,
                currentSide: "a",
                sourceB: [allSampleVideoSource[1], allSampleVideoSource[2]],
                currentId: "a",
              });
            }}
          >
            a
          </button>
        )}
      </div>
    </main>
  );
}
