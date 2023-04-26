import { VideoSource } from "../../types/video";
import getSampleVideo from "../../libs/getSampleVideo/getSampleVideo";

export const allSampleVideoSource: VideoSource[] = [
  { id: "a", source: getSampleVideo("a") },
  { id: "b", source: getSampleVideo("b") },
  { id: "d", source: getSampleVideo("d") },
];
