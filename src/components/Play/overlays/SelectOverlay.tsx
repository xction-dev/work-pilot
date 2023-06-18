import styles from "./overlays.module.scss";
import {
  DelayedSelect,
  Select,
} from "../../../libs/XctionPlayer/utility/frameCallbacks";
import {
  playWithId,
  setOverlays,
} from "../../../libs/XctionPlayer/useXctionPlayer";
import { useRef } from "react";
import { clearAudio, playAudio } from "../../../libs/useAudio/useAudio";

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

export function DelayedSelectOverlay({
  delayedSelects,
}: {
  delayedSelects: DelayedSelect[];
}) {
  const isSelected = useRef(false);
  return (
    <div className={styles.SelectOverlay}>
      {delayedSelects.map((select, i) => (
        <button
          key={i}
          className={styles.select}
          onClick={() => {
            if (!isSelected.current) {
              playAudio(select.audio);
              setTimeout(() => {
                clearAudio();
                playWithId(select.to);
              }, select.delay);
            }
          }}
        >
          {select.text}
        </button>
      ))}
    </div>
  );
}
