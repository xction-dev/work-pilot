import styles from "./AlternatePlayer.module.scss";
import PlainVideo from "../PlainVideo/PlainVideo";
import { useXctionPlayer } from "../../../../libs/useXctionPlayer/useXctionPlayer";
import { useEffect } from "react";

type Props = {
  isPrimary: boolean;
};

export default function AlternatePlayer({ isPrimary }: Props) {
  const isPrimaryPlaying = useXctionPlayer((state) => state.isPrimaryPlaying);
  const sources = useXctionPlayer((state) =>
    isPrimary ? state.primarySources : state.secondarySources,
  );
  const storedId = useXctionPlayer((state) => state.currentVideoId);
  const currentVideoId = isPrimary === isPrimaryPlaying ? storedId : null; //혹시 primary source와 secondary source에 같은 id의 영상이 있더라도 활성화되지 않도록 제한

  useEffect(() => {}, [sources]);

  return (
    <div
      className={`${styles.AlternatePlayer} ${
        isPrimaryPlaying === isPrimary ? styles.playing : styles.waiting
      }`}
    >
      {sources.map(({ videoId, sourceURL }) => (
        <PlainVideo
          key={videoId}
          isActive={videoId === currentVideoId}
          sourceURL={sourceURL}
        />
      ))}
    </div>
  );
}
