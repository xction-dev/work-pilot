import styles from "./XctionPlayer.module.scss";
import AlternatePlayer from "../AlternatePlayer/AlternatePlayer";
import XctionController from "../../controller/XctionController/XctionController";
import {
  useXctionPlayer,
  XctionPlayerVideoSource,
} from "../../../../../libs/XctionPlayer/useXctionPlayer";
import { useEffect } from "react";

type Props = {
  allSources: XctionPlayerVideoSource[];
  callback: () => void;
};

export default function XctionPlayer({ allSources, callback }: Props) {
  const { initiateXctionPlayer } = useXctionPlayer(
    (state) => state.actions.data,
  );

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
