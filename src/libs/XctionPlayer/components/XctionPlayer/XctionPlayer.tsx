import styles from "./XctionPlayer.module.scss";
import AlternatePlayer from "../AlternatePlayer/AlternatePlayer";
import {
  useXctionPlayer,
  XctionPlayerVideoSource,
} from "../../useXctionPlayer";
import { MutableRefObject, useEffect } from "react";
import XctionController from "../XctionController/XctionController";
import AudioPlayer from "../../../useAudio/components/AudioPlayer";

type Props = {
  allSources: XctionPlayerVideoSource[] | undefined | null;
  playerRef: React.RefObject<HTMLDivElement>;
};

export default function XctionPlayer({ allSources, playerRef }: Props) {
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
          <AudioPlayer />
          <AlternatePlayer isPrimary={true} />
          <AlternatePlayer isPrimary={false} />
          <XctionController playerRef={playerRef} />
        </>
      ) : (
        <div className={styles.empty} />
      )}
    </div>
  );
}
