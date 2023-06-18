import styles from "./Debugger.module.scss";
import { playWithId, useXctionPlayer } from "../../useXctionPlayer";

export default function Debugger() {
  const isPrimary = useXctionPlayer((state) => state.isPrimaryPlaying);
  const primarySources = useXctionPlayer((state) => state.primarySources);
  const secondarySources = useXctionPlayer((state) => state.secondarySources);

  return (
    <div className={styles.Debugger}>
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
