import styles from "./overlays.module.scss";
import { playWithId } from "../../../libs/XctionPlayer/useXctionPlayer";

export default function PhoneNumberOverlay() {
  return (
    <div className={styles.PhoneNumberOverlay}>
      <div className={styles.inputForm}>
        <div className={styles.explanation}>
          <div className={styles.bold}>입력한 번호를 확인해주세요.</div>
          <div className={styles.normal}>
            잘못된 번호를 입력한 경우 콘텐츠 시청이 어려울 수 있습니다.
          </div>
        </div>
        <div className={styles.phoneNumberInput}>
          <div className={styles.placeholder}>휴대폰 번호</div>
          <input />
        </div>
        <button className={styles.passButton}>
          번호 입력하지 않고 시청하기
        </button>
      </div>
      <button className={styles.nextButton} onClick={() => playWithId("B")}>
        재생
      </button>
    </div>
  );
}
