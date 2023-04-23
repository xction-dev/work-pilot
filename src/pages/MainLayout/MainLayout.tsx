import styles from "./MainLayout.module.scss";
import { useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function MainLayout() {
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  // portrait이 세로
  const [playState, setPlayState] = useState(0);
  useLayoutEffect(() => {}, []);

  return (
    <div className={styles.Home}>
      <div>hi</div>
    </div>
  );
}
