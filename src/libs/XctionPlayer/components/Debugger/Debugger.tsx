import styles from "./Debugger.module.scss";
import { playWithId, useXctionPlayer } from "../../useXctionPlayer";

export default function Debugger() {
  const isPrimary = useXctionPlayer((state) => state.isPrimaryPlaying);
  const primarySources = useXctionPlayer((state) => state.primarySources);
  const secondarySources = useXctionPlayer((state) => state.secondarySources);
  const currentId = useXctionPlayer((state) => state.currentVideoId);
  const currentFrame = useXctionPlayer((state) => state.currentFrame);
  const overlayType = useXctionPlayer((state) => state.overlayType);

  return (
    <div className={styles.Debugger}>
      <div className={styles.panel}>
        <div className={styles.row}>
          side: {isPrimary ? "primary" : "secondary"}
        </div>
        <div className={styles.row}>
          주: {primarySources.map((source) => source.id).join(" ")}
        </div>
        <div className={styles.row}>
          부: {secondarySources.map((source) => source.id).join(" ")}
        </div>
        <div className={styles.row}>현재 id: {currentId}</div>
        <div className={styles.row}>프레임: {currentFrame}</div>
        <div className={styles.row}>오버레이: {overlayType}</div>
      </div>
      {!isPrimary
        ? primarySources.map(({ id }) => (
            <button
              className={styles.sourceButton}
              key={id}
              onClick={() => playWithId(id)}
            >
              {id}
            </button>
          ))
        : secondarySources.map(({ id }) => (
            <button
              className={styles.sourceButton}
              key={id}
              onClick={() => playWithId(id)}
            >
              {id}
            </button>
          ))}
    </div>
  );
}
