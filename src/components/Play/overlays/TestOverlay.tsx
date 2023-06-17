import styles from "./overlays.module.scss";
import { setOverlays } from "../../../libs/XctionPlayer/useXctionPlayer";

export default function TestOverlay() {
  return (
    <div
      className={styles.TestOverlay}
      onClick={() => {
        setOverlays([]);
      }}
    >
      테스트
    </div>
  );
}
