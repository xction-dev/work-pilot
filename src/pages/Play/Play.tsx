import styles from "./Play.module.scss";
import { useParams } from "react-router-dom";
import { useMemo, useRef } from "react";
import XctionPlayer from "../../libs/XctionPlayer/components/XctionPlayer/XctionPlayer";
import films from "../../data/v1";
import PlayerHeader from "../../components/Play/PlayerHeader/PlayerHeader";
import Debugger from "../../libs/XctionPlayer/components/Debugger/Debugger";
import Header from "../../components/Home/Header/Header";

export default function Play() {
  const params = useParams();
  const filmData = useMemo(
    () => (params.film_id ? films[params.film_id] : null),
    [params],
  );
  const playerRef = useRef<HTMLDivElement>(null);

  return (
    <main className={styles.Play}>
      <Header isHome={true} />
      <div className={styles.playerWrapper} ref={playerRef}>
        <PlayerHeader title={filmData ? filmData.title.kr : "no_title"} />
        <XctionPlayer allSources={filmData?.videos} playerRef={playerRef} />
        {/* <Debugger /> */}
      </div>
    </main>
  );
}
