import { useParams } from "react-router-dom";
import VideoPlayer from "../../../components/Play/VideoPlayer/VideoPlayer";

export default function Play() {
  const { filmId } = useParams();
  return (
    <div>
      <VideoPlayer />
    </div>
  );
}
