import styles from "./overlays.module.scss";
import {
  DelayedSelect,
  Select,
} from "../../../libs/XctionPlayer/utility/frameCallbacks";
import {
  playWithId,
  setOverlays,
  useXctionPlayer,
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

export function EndSelectOverlay({ selects }: { selects: Select[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const setOnEnd = useXctionPlayer(
    (state) => state.actions.control.overrideOnEnd,
  );

  return (
    <div className={styles.SelectOverlay}>
      {selects.map((select, i) => (
        <button
          key={i}
          className={`${styles.select} ${
            selectedIndex === i ? styles.endSelected : styles.notEndSelected
          }`}
          onClick={() => {
            setOnEnd({ type: "proceed", to: select.to });
            setSelectedIndex(i);
          }}
        >
          {select.text}
        </button>
      ))}
    </div>
  );
}
