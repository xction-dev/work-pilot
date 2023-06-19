import styles from "./PlayerHeader.module.scss";
import { useXctionPlayer } from "../../../libs/XctionPlayer/useXctionPlayer";

type Props = {
  title: string;
};

export default function PlayerHeader({ title }: Props) {
  const overlayType = useXctionPlayer((state) => state.overlayType);

  return (
    <header className={`${styles.PlayerHeader} ${styles.invisible}`}>
      {title}
    </header>
  );
}
