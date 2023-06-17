import styles from "./PlayerHeader.module.scss";
import { useXctionPlayer } from "../../../libs/XctionPlayer/useXctionPlayer";

type Props = {
  title: string;
};

export default function PlayerHeader({ title }: Props) {
  const isControllerVisible = useXctionPlayer(
    (state) => state.isControllerVisible,
  );

  return (
    <header
      className={`${styles.PlayerHeader} ${
        isControllerVisible ? styles.visible : styles.invisible
      }`}
    >
      {title}
    </header>
  );
}
