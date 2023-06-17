import styles from "./XctionController.module.scss";
import { useXctionPlayer } from "../../useXctionPlayer";
import { useCallback, useEffect, useRef } from "react";

export default function XctionController() {
  const isPlaying = useXctionPlayer((state) => state.isPlaying);
  const currentFrame = useXctionPlayer((state) => state.currentFrame);
  const totalFrame = useXctionPlayer((state) => state.totalFrame);
  const isVisible = useXctionPlayer((state) => state.isControllerVisible);
  const { play, pause, setTime } = useXctionPlayer(
    (state) => state.actions.control,
  );
  const { setControllerVisibility } = useXctionPlayer(
    (state) => state.actions.overlay,
  );
  const timer = useRef(-1);

  const refreshOverlay = useCallback(() => {
    if (!isVisible) setControllerVisibility(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setControllerVisibility(false), 1500);
  }, [timer.current, isVisible]);
  const hideOverlay = useCallback(() => {
    if (isVisible) setControllerVisibility(false);
    clearTimeout(timer.current);
  }, [timer.current, isVisible]);

  return (
    <div
      className={`${styles.XctionController} ${
        isVisible ? styles.visible : styles.invisible
      }`}
      onMouseMove={() => refreshOverlay()}
      onClick={() => (isVisible ? hideOverlay() : refreshOverlay())}
    >
      <div className={styles.interface} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.play}
          onClick={() => (!isPlaying ? play() : pause())}
        >
          {!isPlaying ? "play" : "pause"}
        </button>
        <div className={styles.time}>{currentFrame}</div>
        <input
          className={styles.timeBar}
          type="range"
          min={0}
          max={totalFrame}
          value={currentFrame}
          onChange={(e) => setTime(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
