import styles from "./overlays.module.scss";
import {
  DelayedSelect,
  Select,
} from "../../../libs/XctionPlayer/utility/frameCallbacks";
import {
  playWithId,
  setOverlays,
} from "../../../libs/XctionPlayer/useXctionPlayer";
import { useState } from "react";
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
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <div
      className={`${styles.SelectOverlay} ${
        isSelected ? styles.invisible : styles.visible
      }`}
    >
      {delayedSelects.map((select, i) => (
        <button
          key={i}
          className={styles.select}
          onClick={() => {
            if (!isSelected) {
              playAudio(select.audio);
              setTimeout(() => {
                clearAudio();
                playWithId(select.to);
              }, select.delay);
              setIsSelected(true);
            }
          }}
        >
          {select.text}
        </button>
      ))}
    </div>
  );
}
