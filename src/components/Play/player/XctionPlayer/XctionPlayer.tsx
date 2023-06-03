import styles from "./XctionPlayer.module.scss";
import AlternatePlayer from "../AlternatePlayer/AlternatePlayer";
import XctionController from "../../controller/XctionController/XctionController";
import {
  useXctionPlayer,
  XctionPlayerFinishCallback,
  XctionPlayerVideoSource,
} from "../../../../libs/useXctionPlayer/useXctionPlayer";
import { useEffect } from "react";

type Props = {
  allSources: XctionPlayerVideoSource[];
  callback: XctionPlayerFinishCallback;
};

export default function XctionPlayer({ allSources, callback }: Props) {
  const { initiateXctionPlayer } = useXctionPlayer((state) => state.actions);

  useEffect(() => {
    initiateXctionPlayer(allSources, callback);
  }, []);
  return (
    <div className={styles.XctionPlayer}>
      <AlternatePlayer isPrimary={true} />
      <AlternatePlayer isPrimary={false} />
      {/*<XctionController />*/}
    </div>
  );
}
