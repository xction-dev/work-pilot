import { Film } from "../types";
import getSampleVideo, {
  getFrameTestVideo,
  getFrameTestVideo2,
  getV1,
} from "../../libs/getSampleVideo/getSampleVideo";

const frameTest: Film = {
  title: { kr: "졸업전시회", eng: "The Exhibition" },
  description: "",
  videos: [
    {
      id: "t1",
      source: getFrameTestVideo(),
      frames: 2884,
      transition: {
        type: "proceed",
        to: "A2",
      },
      prepare: ["t2"],
    },
    {
      id: "t2",
      source: getFrameTestVideo2(),
      frames: 2884,
      transition: {
        type: "loop",
      },
      interaction: {
        type: "frame",
        callback: () => {},
      },
      prepare: [],
    },
  ],
};

const theExhibition: Film = {
  title: { kr: "졸업전시회", eng: "The Exhibition" },
  description: "",
  videos: [
    {
      id: "A",
      source: getV1("A"),
      frames: 2783,
      transition: {
        type: "proceed",
        to: "A2",
      },
      prepare: ["A2"],
    },
    {
      id: "A2",
      source: getV1("A2"),
      frames: 484,
      transition: {
        type: "loop",
      },
      interaction: {
        type: "frame",
        callback: () => {},
      },
      prepare: ["B"],
    },
    {
      id: "B",
      source: getV1("B"),
      frames: 2783,
      transition: {
        type: "proceed",
        to: "F1",
      },
      prepare: ["B1"],
    },
    {
      id: "B2",
      source: getV1("B"),
      frames: 2783,
      transition: {
        type: "proceed",
        to: "F1",
      },
      interaction: {
        type: "frame",
        callback: () => {},
      },
      prepare: ["F1"],
    },
  ],
};

const films: Record<string, Film> = {
  theExhibition,
} as const;

export type V1FilmId = keyof typeof films;

export default films;
