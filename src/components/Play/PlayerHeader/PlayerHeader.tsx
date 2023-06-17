import styles from "./PlayerHeader.module.scss";

type Props = {
  title: string;
};

export default function PlayerHeader({ title }: Props) {
  return <header className={styles.PlayerHeader}>{title}</header>;
}
