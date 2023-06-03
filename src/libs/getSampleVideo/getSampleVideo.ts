import { AvailableVideoId } from "../../types/video";

const baseURL = "https://d2yo7lrb9dagdw.cloudfront.net/hd/";
const samplePrefix = "devsample_";

const getSampleVideo = (id: AvailableVideoId): string =>
  `${baseURL}${samplePrefix}${id.toUpperCase()}_hd.mp4`;

export default getSampleVideo;
