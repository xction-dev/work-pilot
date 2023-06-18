import styles from "./overlays.module.scss";
import { playWithId } from "../../../libs/XctionPlayer/useXctionPlayer";
import { useCallback, useState } from "react";

export default function PhoneNumberOverlay() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const checkValid = useCallback((number: string) => {
    return number.length === 13;
  }, []);
  const formatNumber = useCallback((number: string) => {
    let newNumber = number;
    if (number.length > 3) {
      newNumber =
        number[3] === "-"
          ? newNumber
          : newNumber.slice(0, 3) + "-" + newNumber.slice(3);
    }
    if (newNumber.length > 8) {
      newNumber =
        number[8] === "-"
          ? newNumber
          : newNumber.slice(0, 8) + "-" + newNumber.slice(8);
    }
    if (newNumber.length > 13) {
      newNumber = newNumber.slice(0, 13);
    }
    return newNumber;
  }, []);

  return (
    <div className={styles.PhoneNumberOverlay}>
      <div className={styles.inputForm}>
        <div className={styles.explanation}>
          <div className={styles.bold}>
            계속 시청하기 위해 휴대폰 번호를 입력해주세요.
          </div>
          <div className={styles.normal}>
            미입력 시 제공 콘텐츠가 달라집니다.
          </div>
        </div>
        <div className={styles.phoneNumberInput}>
          <div className={styles.placeholder}>휴대폰 번호</div>
          <input
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatNumber(e.target.value))}
          />
        </div>
        {checkValid(phoneNumber) ? (
          <button className={styles.passButton}>
            번호 입력하지 않고 시청하기
          </button>
        ) : (
          <div className={styles.caution}>
            사용자 개인정보는 안전하게 보호되며, 콘텐츠 이용 외 용도로 사용
            되지않습니다.
          </div>
        )}
      </div>
      <button className={styles.nextButton} onClick={() => playWithId("B")}>
        {checkValid(phoneNumber) ? "재생" : "번호 입력하지 않고 시청하기"}
      </button>
    </div>
  );
}
