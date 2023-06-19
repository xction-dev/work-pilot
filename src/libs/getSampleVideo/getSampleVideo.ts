import { AvailableVideoId } from "../../types/video";

const baseURL = "https://d2yo7lrb9dagdw.cloudfront.net/";
const samplePrefix = "devsample_";

const getSampleVideo = (id: AvailableVideoId): string =>
  `${baseURL}hd/${samplePrefix}${id.toUpperCase()}_hd.mp4`;

export const getV1 = (id: string): string => `${baseURL}v1/v1_${id}.mp4`;
export const getV2 = (id: string): string => `${baseURL}v2/v2_${id}.mp4`;

export const getV1Audio = (id: string): string =>
  `${baseURL}v1/v1_${id}_audio.wav`;

export const getFrameTestVideo = () => `${baseURL}v1/drop24.mp4`;
export const getFrameTestVideo2 = () => `${baseURL}v1/drop24_2.mp4`;

export default getSampleVideo;
