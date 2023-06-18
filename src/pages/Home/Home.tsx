import styles from "./Home.module.scss";
import Header from "../../components/Home/Header/Header";
import thumbnail from "/src/assets/thumbnail.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className={styles.Home}>
      <Header />
      <div className={styles.content}>
        <div className={styles.thumbnailWrapper}>
          <img src={thumbnail} />
        </div>
        <div className={styles.description}>
          <h1>졸업 전시회</h1>
          <div>
            졸업 전시회를 앞두고 기현의 조각상이 깨지는 사건이 발생한다.
          </div>
          <div>10분+</div>
          <div>스릴러</div>
          <div>모바일 권장</div>
          <button
            className={styles.play}
            onClick={() => navigate("/play/theExhibition")}
          >
            재생하기
          </button>
        </div>
      </div>
    </main>
  );
}
