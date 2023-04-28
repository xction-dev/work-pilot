import styles from "./XctionController.module.scss";
import { useXctionPlayer } from "../../../../libs/useXctionPlayer/useXctionPlayer";
import { useState } from "react";

export default function XctionController() {
  const currentVideoRef = useXctionPlayer((state) => state.currentVideoRef);
  const playStatus = useXctionPlayer((state) => state.playStatus);
  const { proceedToNextSource, getCurrentVideoSource, setPlayStatus } =
    useXctionPlayer((state) => state.actions);
  const [displayController, setDisplayController] = useState(false);

  if (!currentVideoRef) {
    return <div>no video</div>;
  }

  return (
    <div
      className={`${styles.XctionController} ${
        displayController ? styles.displayed : styles.hidden
      }`}
      onMouseEnter={() => {
        if (!displayController) setDisplayController(true);
      }}
      onMouseLeave={() => {
        if (displayController) setDisplayController(false);
      }}
    >
      <button
        onClick={() => {
          if (playStatus === "playing") {
            currentVideoRef.pause();
            setPlayStatus("paused");
          } else {
            currentVideoRef
              .play()
              .then(() => {
                setPlayStatus("playing");
                console.log("play");
              })
              .catch(() => {
                console.log("fail");
              });
          }
        }}
      >
        재생
      </button>
      <button
        onClick={() => {
          const currentSource = getCurrentVideoSource();
          if (currentSource) proceedToNextSource(currentSource);
        }}
      >
        다음
      </button>
    </div>
  );
}
