import styles from "./AlternatePlayer.module.scss";
import PlainVideo from "../PlainVideo/PlainVideo";
import {
  useXctionPlayer,
  XctionPlayerVideoSource,
} from "../../../../libs/XctionPlayer/useXctionPlayer";
import { useEffect } from "react";

type Props = {
  isPrimary: boolean;
};

export default function AlternatePlayer({ isPrimary }: Props) {
  const isPrimaryPlaying = useXctionPlayer((state) => state.isPrimaryPlaying);
  const sources: XctionPlayerVideoSource[] = useXctionPlayer((state) =>
    isPrimary ? state.primarySources : state.secondarySources,
  );
  const currentVideoId = useXctionPlayer((state) => state.currentVideoId);
  const validCurrentVideoId =
    isPrimary === isPrimaryPlaying ? currentVideoId : null; //혹시 primary source와 secondary source에 같은 id의 영상이 있더라도 활성화되지 않도록 제한

  return (
    <div
      className={`${styles.AlternatePlayer} ${
        isPrimaryPlaying === isPrimary ? styles.playing : styles.waiting
      }`}
    >
      {sources.map(({ id, source }) => (
        <PlainVideo
          key={id}
          isActive={id === validCurrentVideoId}
          sourceURL={source}
        />
      ))}
    </div>
  );
}
