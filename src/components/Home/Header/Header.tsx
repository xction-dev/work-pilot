import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetLog } from "../../../libs/useLog/useLog";

type Props = {
  isHome?: boolean;
};

export default function Header({ isHome }: Props) {
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);

  console.dir(navigate.name);

  return (
    <header className={styles.Header}>
      <button
        className={styles.logo}
        onClick={() => {
          setIsAlert(true);
        }}
      >
        Xction!
      </button>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${isHome ? styles.selected : ""}`}
          onClick={() => navigate("/")}
        >
          Contents
        </button>
        <button
          className={`${styles.button} ${!isHome ? styles.selected : ""}`}
          onClick={() => navigate("/about")}
        >
          About Us
        </button>
        {/*
        <button className={styles.button} onClick={() => navigate("/")}>
          My Page
        </button>
        */}
      </div>
      {isAlert && (
        <div className={styles.alert} onClick={() => setIsAlert(false)}>
          <div>홈으로 이동하면 감상 중인 내용이 사라집니다!</div>
          <button
            onClick={() => {
              resetLog();
              navigate("/");
            }}
          >
            초기 화면으로 이동
          </button>
        </div>
      )}
    </header>
  );
}
