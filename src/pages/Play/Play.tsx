import styles from "./Play.module.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Play() {
  const a = useParams();
  useEffect(() => {
    console.log(a.film_id);
  }, [a]);
  return (
    <main className={styles.Play}>
      <div className={styles.playerWrapper}>플레이</div>
    </main>
  );
}
