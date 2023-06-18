import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import films from "../../data/v1";
import { loadLog, updateHistory } from "../../libs/useLog/useLog";

export default function Map() {
  const params = useParams();
  const filmData = useMemo(
    () => (params.film_id ? films[params.film_id] : null),
    [params],
  );
  useEffect(() => {
    loadLog();
    updateHistory();
  }, []);

  return <div>{filmData?.title.kr}</div>;
}
