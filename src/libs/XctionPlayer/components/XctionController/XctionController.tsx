import styles from "./XctionController.module.scss";
import { useXctionPlayer } from "../../useXctionPlayer";
import { useCallback, useRef, useState } from "react";
import pauseIcon from "/src/assets/PauseIcon.svg";
import playIcon from "/src/assets/PlayIcon.svg";
import fullIcon from "/src/assets/FullScreenIcon.svg";

type Props = {
  playerRef: React.RefObject<HTMLDivElement>;
};

export default function XctionController({ playerRef }: Props) {
  const isPlaying = useXctionPlayer((state) => state.isPlaying);
  const currentFrame = useXctionPlayer((state) => state.currentFrame);
  const totalFrame = useXctionPlayer((state) => state.totalFrame);
  const overlayType = useXctionPlayer((state) => state.overlayType);
  const overlays = useXctionPlayer((state) => state.overlays);
  const { play, pause, setTime } = useXctionPlayer(
    (state) => state.actions.control,
  );
  const timer = useRef(-1);
  const [isControllerVisible, setIsControllerVisible] = useState(false);
  const isFullscreen = useRef(false);

  const refreshController = useCallback(() => {
    if (!isControllerVisible) setIsControllerVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsControllerVisible(false), 1500);
  }, [timer.current, isControllerVisible]);

  const hideController = useCallback(() => {
    if (isControllerVisible) setIsControllerVisible(false);
    clearTimeout(timer.current);
  }, [timer.current, isControllerVisible]);

  return (
    <div
      className={`${styles.XctionController}`}
      onMouseMove={() => overlayType === "controller" && refreshController()}
      onClick={() =>
        isControllerVisible ? hideController() : refreshController()
      }
    >
      <div
        className={`${styles.interface} ${
          isControllerVisible && overlayType === "controller"
            ? styles.visible
            : styles.invisible
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.play}
          onClick={() => (!isPlaying ? play() : pause())}
        >
          {!isPlaying ? <img src={playIcon} /> : <img src={pauseIcon} />}
        </button>
        <input
          className={styles.timeBar}
          type="range"
          min={0}
          max={totalFrame}
          value={currentFrame}
          onChange={(e) => setTime(parseInt(e.target.value))}
        />
        <button
          className={styles.full}
          onClick={() => {
            if (playerRef.current) {
              !isFullscreen.current
                ? playerRef.current.requestFullscreen().then(() => {
                    isFullscreen.current = true;
                  })
                : document.exitFullscreen().then(() => {
                    isFullscreen.current = false;
                  });
            }
          }}
        >
          <img src={fullIcon} />
        </button>
      </div>
      {overlayType === "interactive" && (
        <div className={styles.overlayContainer}>
          {overlays.map((overlay) => overlay)}
        </div>
      )}
    </div>
  );
}
