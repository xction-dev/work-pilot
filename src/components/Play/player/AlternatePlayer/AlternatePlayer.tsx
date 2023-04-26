import styles from "./AlternatePlayer.module.scss";
import PlainVideo from "../PlainVideo/PlainVideo";
import { useXctionPlayer } from "../../../../libs/useXctionPlayer/useXctionPlayer";

type Props = {
  isPrimary: boolean;
};

export default function AlternatePlayer({ isPrimary }: Props) {
  const isPrimaryPlaying = useXctionPlayer((state) => state.isPrimaryPlaying);
  const sources = useXctionPlayer((state) =>
    isPrimary ? state.primarySources : state.secondarySources,
  );
  const currentVideoId =
    isPrimary === isPrimaryPlaying
      ? useXctionPlayer((state) => state.currentVideoId)
      : null; //혹시 primary source와 secondary source에 같은 id의 영상이 있더라도 활성화되지 않도록 제한

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
