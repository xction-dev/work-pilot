import { AvailableVideoId } from "../../types/video";

const baseURL = "https://d2yo7lrb9dagdw.cloudfront.net/";
const samplePrefix = "devsample_";

const getSampleVideo = (id: AvailableVideoId): string =>
  `${baseURL}hd/${samplePrefix}${id.toUpperCase()}_hd.mp4`;

export const getV1 = (id: string): string => `${baseURL}v1/v1_${id}.mp4`;

export default getSampleVideo;
