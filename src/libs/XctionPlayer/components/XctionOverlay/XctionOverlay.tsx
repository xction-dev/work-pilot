import styles from "./XctionOverlay.module.scss";
import { useXctionPlayer } from "../../useXctionPlayer";
export default function XctionOverlay() {
  const overlays = useXctionPlayer((state) => state.overlays);
  return (
    <div
      className={`${styles.XctionOverlay} ${
        overlays.length > 0 ? styles.visible : styles.invisible
      }`}
    >
      {overlays.map((overlay) => overlay)}
    </div>
  );
}
