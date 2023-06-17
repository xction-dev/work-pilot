import styles from "./XctionController.module.scss";
import { useXctionPlayer } from "../../useXctionPlayer";

export default function XctionController() {
  const isPlaying = useXctionPlayer((state) => state.isPlaying);
  const currentFrame = useXctionPlayer((state) => state.currentFrame);
  const totalFrame = useXctionPlayer((state) => state.totalFrame);
  const { play, pause, setTime } = useXctionPlayer(
    (state) => state.actions.control,
  );

  return (
    <div className={styles.XctionController}>
      <div className={styles.interface}>
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
