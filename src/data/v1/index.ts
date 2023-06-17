import { Film } from "../types";
import getSampleVideo, {
  getFrameTestVideo,
  getFrameTestVideo2,
  getV1,
} from "../../libs/getSampleVideo/getSampleVideo";
import { setOverlays } from "../../libs/XctionPlayer/useXctionPlayer";
import {
  phoneNumberCallback,
  selectFrameCallback,
  testFrameCallback,
} from "../../libs/XctionPlayer/utility/frameCallbacks";

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
      interaction: { type: "frame", callback: phoneNumberCallback(0) },
      prepare: ["B"],
    },
    {
      id: "B",
      source: getV1("B"),
      frames: 4446,
      transition: {
        type: "proceed",
        to: "B2",
      },
      prepare: ["B2"],
    },
    {
      id: "B2",
      source: getV1("B2"),
      frames: 824,
      transition: {
        type: "proceed",
        to: "F1",
      },
      interaction: {
        type: "frame",
        callback: selectFrameCallback(
          [
            { to: "D", text: "범인이 남긴 흔적 없나?" },
            { to: "E", text: "사실 어제 본 게 있는데" },
          ],
          10,
        ),
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
