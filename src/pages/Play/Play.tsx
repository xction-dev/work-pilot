import styles from "./Play.module.scss";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import XctionPlayer from "../../libs/XctionPlayer/components/XctionPlayer/XctionPlayer";
import films from "../../data/v1";
import PlayerHeader from "../../components/Play/PlayerHeader/PlayerHeader";
import Debugger from "../../libs/XctionPlayer/components/Debugger/Debugger";

export default function Play() {
  const params = useParams();
  const filmData = useMemo(
    () => (params.film_id ? films[params.film_id] : null),
    [params],
  );

  return (
    <main className={styles.Play}>
      <div className={styles.playerWrapper}>
        <PlayerHeader title={filmData ? filmData.title.kr : "no_title"} />
        <XctionPlayer allSources={filmData?.videos} />
        <Debugger />
      </div>
    </main>
  );
}
