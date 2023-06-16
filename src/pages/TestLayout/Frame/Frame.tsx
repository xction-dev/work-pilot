import styles from "./Frame.module.scss";
import XctionPlayer from "../../../components/Play/player/XctionPlayer/XctionPlayer";
import { frameTestVideos } from "./videoData";

export default function Frame() {
  return (
    <main className={styles.Frame}>
      <XctionPlayer
        allSources={frameTestVideos}
        callback={() => console.log("done")}
      />
    </main>
  );
}
