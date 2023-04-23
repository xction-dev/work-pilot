import styles from "./TitleComponent.module.scss";

export default function TitleComponent() {
  return (
    <div className={styles.TitleComponent}>
      <div className={styles.titleWrapper}>
        <div className={styles.titleOption}>누구나 배우가 되는 영화</div>
        <div className={styles.titleTitle}>Xction!</div>
      </div>
    </div>
  );
}
