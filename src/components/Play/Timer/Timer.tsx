import styles from "./Timer.module.scss";
import { useXctionPlayer } from "../../../libs/XctionPlayer/useXctionPlayer";

type Props = {
  frames: [number, number];
};
export default function Timer({ frames }: Props) {
  const currentFrame = useXctionPlayer((state) => state.currentFrame);
  return (
    <div className={styles.Timer}>
      <div
        className={styles.bar}
        style={{
          width: `${100 - ((currentFrame - frames[0]) / frames[1]) * 100}%`,
        }}
      />
    </div>
  );
}
