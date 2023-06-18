import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.Header}>
      <button className={styles.logo}>Xction!</button>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => navigate("/")}>
          Contents
        </button>
        <button className={styles.button} onClick={() => navigate("/about")}>
          About Us
        </button>
        <button className={styles.button} onClick={() => navigate("/")}>
          My Page
        </button>
      </div>
    </header>
  );
}
