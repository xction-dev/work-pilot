import styles from "./XctionController.module.scss";
import { useXctionPlayer } from "../../../../libs/useXctionPlayer/useXctionPlayer";
import { useState } from "react";
import { frameTestVideos } from "../../../../pages/TestLayout/Frame/videoData";

export default function XctionController() {
  const currentVideoRef = useXctionPlayer((state) => state.currentVideoRef);
  const playStatus = useXctionPlayer((state) => state.playStatus);
  const { proceedToNextSource, setPlayStatus } = useXctionPlayer(
    (state) => state.actions,
  );
  const [displayController, setDisplayController] = useState(false);

  //임시 (다음 커밋때 삭제)
  const currentVideoId = useXctionPlayer((state) => state.currentVideoId);

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
          //임시 (다음 커밋때 삭제)
          if (currentVideoId === "A") proceedToNextSource(frameTestVideos[1]);
          if (currentVideoId === "B") proceedToNextSource(frameTestVideos[2]);
          if (currentVideoId === "D") proceedToNextSource(null);
        }}
      >
        다음
      </button>
    </div>
  );
}
