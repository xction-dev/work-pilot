import styles from "./Map.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import films from "../../data/v1";
import {
  addCurrentLog,
  loadLog,
  resetLog,
  updateHistory,
  useLog,
} from "../../libs/useLog/useLog";
import theExhibitionNode from "../../data/node/node";
import { VideoNode } from "../../data/types";
import { getV2 } from "../../libs/getSampleVideo/getSampleVideo";

const getH = (num: number) => (num / 3.5) * 100;
const getV = (num: number) => (num / 4.25) * 100;

function Edge({ from, to }: { from: VideoNode; to: VideoNode }) {
  const color = "#004810";
  if (to.vertical === from.vertical) {
    return (
      <div
        style={{
          position: "absolute",
          left: `${getH(from.horizontal)}%`,
          top: `${getV(1.75 - from.vertical)}%`,
          transform: "translate(20px, 20px)",
          borderBottom: `5px solid ${color}`,
          width: `${getH(to.horizontal - from.horizontal)}%`,
        }}
      />
    );
  } else if (to.vertical > from.vertical) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            width: `calc(5% + 5px)`,
            height: `calc(${getV(to.vertical - from.vertical)}% - 20px)`,
            left: `${getH(from.horizontal)}%`,
            top: `calc(${getV(1.75 - to.vertical)}% + 20px)`,
            transform: "translate(20px, 20px)",
            borderBottom: `5px solid ${color}`,
            borderRight: `5px solid ${color}`,
            borderBottomRightRadius: "20px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: `${getH(to.horizontal - from.horizontal) - 5}%`,
            height: `calc(${getV(to.vertical - from.vertical)}% - 20px)`,
            left: `${getH(from.horizontal) + 5}%`,
            top: `calc(${getV(1.75 - to.vertical)}%)`,
            transform: "translate(20px, 20px)",
            borderTop: `5px solid ${color}`,
            borderLeft: `5px solid ${color}`,
            borderTopLeftRadius: "20px",
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            position: "absolute",
            width: `calc(5% + 5px)`,
            height: `calc(${getV(from.vertical - to.vertical)}% - 20px)`,
            left: `${getH(from.horizontal)}%`,
            top: `calc(${getV(1.75 - from.vertical)}%)`,
            transform: "translate(20px, 20px)",
            borderTop: `5px solid ${color}`,
            borderRight: `5px solid ${color}`,
            borderTopRightRadius: "20px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: `${getH(to.horizontal - from.horizontal) - 5}%`,
            height: `calc(${getV(from.vertical - to.vertical)}% - 20px)`,
            left: `${getH(from.horizontal) + 5}%`,
            top: `calc(${getV(1.75 - from.vertical)}% + 20px)`,
            transform: "translate(20px, 20px)",
            borderLeft: `5px solid ${color}`,
            borderBottom: `5px solid ${color}`,
            borderBottomLeftRadius: "20px",
          }}
        />
      </>
    );
  }
}

export default function Map() {
  const params = useParams();
  const filmData = useMemo(
    () => (params.film_id ? films[params.film_id] : null),
    [params],
  );
  const [isOpen, setIsOpen] = useState<null | VideoNode>(null);
  const history = useLog((state) => state.history);
  const navigate = useNavigate();
  useEffect(() => {
    loadLog();
    updateHistory();
  }, []);

  return (
    <div className={styles.Map}>
      <div className={styles.header}>
        <h1> 졸업 전시회</h1>
        <div
          className={styles.toHome}
          onClick={() => {
            resetLog();
            navigate("/");
          }}
        >
          다음 사람을 위해 초기화
        </div>
      </div>
      <div
        className={`${styles.diagramWrapper} ${
          isOpen ? styles.compressed : ""
        }`}
      >
        <Edge from={theExhibitionNode[0]} to={theExhibitionNode[1]} />
        <Edge from={theExhibitionNode[1]} to={theExhibitionNode[2]} />
        <Edge from={theExhibitionNode[1]} to={theExhibitionNode[3]} />
        <Edge from={theExhibitionNode[3]} to={theExhibitionNode[4]} />
        <Edge from={theExhibitionNode[3]} to={theExhibitionNode[5]} />
        <Edge from={theExhibitionNode[4]} to={theExhibitionNode[6]} />
        <Edge from={theExhibitionNode[4]} to={theExhibitionNode[7]} />
        <Edge from={theExhibitionNode[1]} to={theExhibitionNode[8]} />
        <Edge from={theExhibitionNode[8]} to={theExhibitionNode[9]} />
        <Edge from={theExhibitionNode[8]} to={theExhibitionNode[10]} />
        <Edge from={theExhibitionNode[10]} to={theExhibitionNode[11]} />
        <Edge from={theExhibitionNode[10]} to={theExhibitionNode[12]} />

        {theExhibitionNode.map((node) =>
          history.includes(node.id) || node.id === "A" ? (
            <div
              className={`${styles.node} ${
                isOpen?.id === node.id ? styles.selected : ""
              }`}
              key={node.id}
              style={{
                left: `${getH(node.horizontal)}%`,
                top: `${getV(-node.vertical + 1.75)}%`,
              }}
              onClick={() => {
                if (isOpen?.id === node.id) {
                  setIsOpen(null);
                } else {
                  setIsOpen(node);
                }
              }}
            />
          ) : (
            <div
              className={`${styles.node} ${styles.hidden}`}
              key={node.id}
              style={{
                left: `${getH(node.horizontal)}%`,
                top: `${getV(-node.vertical + 1.75)}%`,
              }}
            />
          ),
        )}
      </div>
      <div className={styles.help}>
        원하는 노드를 클릭해 해당 지점에서부터 영상을 다시 감상하세요!
      </div>
      {isOpen && (
        <div className={styles.informationWrapper}>
          <div className={styles.preview}>
            <video src={getV2(isOpen.id)} autoPlay={true} muted={true} />
          </div>
          <div className={styles.contents}>
            <h1>{isOpen.title}</h1>
            <div>{isOpen.description}</div>
            <button
              onClick={() => {
                addCurrentLog(isOpen.id);
                navigate(`/play/theExhibition`);
              }}
            >
              여기서부터 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
