import styles from "./overlays.module.scss";
import { Select } from "../../../libs/XctionPlayer/utility/frameCallbacks";
import {
  playWithId,
  setOverlays,
} from "../../../libs/XctionPlayer/useXctionPlayer";

export default function SelectOverlay({ selects }: { selects: Select[] }) {
  return (
    <div className={styles.SelectOverlay}>
      {selects.map((select, i) => (
        <button
          key={i}
          className={styles.select}
          onClick={() => playWithId(select.to)}
        >
          {select.text}
        </button>
      ))}
    </div>
  );
}
