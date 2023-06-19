import styles from "./overlays.module.scss";
import { useNavigate } from "react-router-dom";
export default function CreditOverlay() {
  const navigate = useNavigate();
  return (
    <div className={styles.CreditOverlay}>
      <div className={styles.creditList}>
        <div className={styles.label}>CAST</div>
        <div className={styles.block}>
          <div className={styles.left}>수빈 역</div>
          <div className={styles.right}>최정윤</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>기현 역</div>
          <div className={styles.right}>김혜인</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>서연 역</div>
          <div className={styles.right}>유선이</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>윤석 역</div>
          <div className={styles.right}>김시영</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>교수/택배기사 역</div>
          <div className={styles.right}>신원우</div>
        </div>

        <div className={styles.label}>STAFF</div>
        <div className={styles.block}>
          <div className={styles.left}>각본</div>
          <div className={styles.right}>박준영</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>이서현</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>황에정</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>연출</div>
          <div className={styles.right}>이서현</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>조연출</div>
          <div className={styles.right}>박준영</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>촬영감독</div>
          <div className={styles.right}>김윤식</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>PD</div>
          <div className={styles.right}>정기연</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>미술감독</div>
          <div className={styles.right}>박수민</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>스크립터</div>
          <div className={styles.right}>임승현</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>조명부</div>
          <div className={styles.right}>이진기</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>이도연</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>촬영부</div>
          <div className={styles.right}>김성민</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>이상걸</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>제작부</div>
          <div className={styles.right}>임승현</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>신효진</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>백창인</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>미술부</div>
          <div className={styles.right}>김현진</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>유영선</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>의상</div>
          <div className={styles.right}>이경서</div>
        </div>

        <div className={styles.label}>DEV</div>
        <div className={styles.block}>
          <div className={styles.left}>개발 총괄</div>
          <div className={styles.right}>박준영</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>프론트엔드</div>
          <div className={styles.right}>박준영</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>김수빈</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>이가은</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>김윤식</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>플랫폼 디자인</div>
          <div className={styles.right}>권수민</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>유정혜</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>인터랙션 디자인</div>
          <div className={styles.right}>김윤식</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>박수민</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>백창인</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}>포스터 디자인</div>
          <div className={styles.right}>박준영</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>권수민</div>
        </div>
        <div className={styles.block}>
          <div className={styles.left}></div>
          <div className={styles.right}>박수민</div>
        </div>
      </div>
      <button
        className={styles.skip}
        onClick={() => navigate("/map/theExhibition")}
      >
        크레딧 넘기기
      </button>
    </div>
  );
}
