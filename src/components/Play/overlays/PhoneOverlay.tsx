import styles from "./overlays.module.scss";
import proof from "/src/assets/proof.jpg";
import { useEffect, useState } from "react";
import { playWithId } from "../../../libs/XctionPlayer/useXctionPlayer";
export default function PhoneOverlay() {
  const [more, setMore] = useState(false);
  useEffect(() => {
    setTimeout(() => setMore(true), 2000);
  }, []);

  return (
    <div className={styles.PhoneOverlay}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <strong>[발신인: 엄마]</strong>
          <br />
          수빈. 졸전용 팜플렛 두고 갔더라. 최종 크리틱 때 교수님 보여드려야
          한다고 밤새서 만들더니 이렇게 중요한 걸 두고 가면 어떡하니? 방금
          퀵으로 부쳤다. 옆에 무슨 작품같은 것도 있길래 혹시나 필요할까봐 같이
          넣었어. 엄마가 옆에서 챙겨주는 것도 이제 마지막이니까 칠칠치 못하게
          흘리고 다니지 마라
        </div>
        <img className={styles.image} src={proof} />
      </div>
      {more && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.text}>
              <strong>[발신인: 1588-1002]</strong>
              <br />
              [Web 발신] 접수번호: 9035894 <br />
              출발: 08시 06분 <br />
              도착: 08시 20분 <br />
              번개퀵이 서울대학교 53동 214호에 3분 뒤 도착 예정입니다. 잠시만
              기다려주세요!
            </div>
          </div>
          <button className={styles.button} onClick={() => playWithId("B2")}>
            확인
          </button>
        </>
      )}
    </div>
  );
}
