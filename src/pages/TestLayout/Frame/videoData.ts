import { XctionPlayerVideoSource } from "../../../libs/XctionPlayer/useXctionPlayer";
import { allSampleVideoSource } from "../../../data/sample/sampleVideo";

export const frameTestVideos: XctionPlayerVideoSource[] = [
  {
    videoId: "A",
    sourceURL: allSampleVideoSource[0].source,
    childVideoIds: ["B"],
  },
  {
    videoId: "B",
    sourceURL: allSampleVideoSource[1].source,
    childVideoIds: ["D"],
  },
  {
    videoId: "D",
    sourceURL: allSampleVideoSource[2].source,
    childVideoIds: null,
  },
];
