import styles from "./XctionPlayer.module.scss";
import AlternatePlayer from "../AlternatePlayer/AlternatePlayer";
import {
  useXctionPlayer,
  XctionPlayerVideoSource,
} from "../../useXctionPlayer";
import { useEffect } from "react";

type Props = {
  allSources: XctionPlayerVideoSource[] | undefined | null;
};

export default function XctionPlayer({ allSources }: Props) {
  const isInitiated = useXctionPlayer((state) => state.isInitiated);
  const { initiateXctionPlayer } = useXctionPlayer(
    (state) => state.actions.data,
  );

  useEffect(() => {
    if (allSources) initiateXctionPlayer(allSources);
  }, [allSources]);

  return (
    <div className={styles.XctionPlayer}>
      {isInitiated ? (
        <>
          <AlternatePlayer isPrimary={true} />
          <AlternatePlayer isPrimary={false} />
          {/*<XctionController />*/}
        </>
      ) : (
        <div className={styles.empty} />
      )}
    </div>
  );
}
