import styles from "./Splash.module.scss";
import { useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TitleComponent from "../../components/Splash/TitleComponent";
import { portrait, arrow } from "../../assets";

export default function Splash() {
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  // portrait이 세로
  const [playState, setPlayState] = useState(0);
  useLayoutEffect(() => {}, []);

  return (
    <div className={styles.Splash}>
      {isPortrait ? (
        <div className={styles.PortraitWrapper}>
          <TitleComponent />
          <div className={styles.PortraitDescriptionWrapper}>
            <div className={styles.PortraitDescriptionTextWrapper}>
              <div className={styles.PortraitDescriptionText}>{"화면을"}</div>
              <div className={styles.PortraitDescriptionText}>
                {"회전해주세요"}
              </div>
            </div>
            <div className={styles.PortraitImageWrapper}>
              <img src={portrait} className={styles.PortraitImage} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.OrientationWrapper}>
          <TitleComponent />
          <div className={styles.OrientationDescriptionWrapper}>
            <div className={styles.OrientationArrowWrapper}>
              <img src={arrow} className={styles.OrientationArrow} />
            </div>
            <div className={styles.OrientationText}>위로 스와이프</div>
          </div>
        </div>
      )}
    </div>
  );
}
