import { Film } from "../types";
import getSampleVideo, {
  getFrameTestVideo,
  getFrameTestVideo2,
  getV1,
  getV1Audio,
} from "../../libs/getSampleVideo/getSampleVideo";
import { setOverlays } from "../../libs/XctionPlayer/useXctionPlayer";
import {
  delayedSelectFrameCallback,
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
        callback: delayedSelectFrameCallback(
          [
            {
              to: "D",
              text: "범인이 남긴 흔적 없나?",
              audio: getV1Audio("D"),
              delay: 3000,
            },
            {
              to: "E",
              text: "사실 어제 본 게 있는데",
              audio: "E audio",
              delay: 3000,
            },
          ],
          10,
          750,
        ),
      },
      prepare: ["F1", "D"],
    },
    {
      id: "D",
      source: getV1("D"),
      frames: 896,
      transition: {
        type: "proceed",
        to: "F1",
      },
      interaction: {
        type: "frame",
        callback: selectFrameCallback(
          [
            {
              to: "DI",
              text: "조각은 안 이상한가?",
            },
            { to: "DJ", text: "CCTV는?" },
            { to: "DJ", text: "카드 출입기록은?" },
          ],
          200,
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
