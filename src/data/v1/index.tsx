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
import PhoneNumberOverlay from "../../components/Play/overlays/PhoneNumberOverlay";
import SelectOverlay, {
  DelayedSelectOverlay,
} from "../../components/Play/overlays/SelectOverlay";

const getVideo = getV1;

const theExhibition: Film = {
  title: { kr: "졸업전시회", eng: "The Exhibition" },
  description: "",
  videos: [
    {
      id: "A",
      source: getVideo("A"),
      frames: [2783, 0],
      prepare: ["A2"],
      onInteraction: { type: "nothing" },
      onEnd: {
        type: "proceed",
        to: "A2",
      },
    },
    {
      id: "A2",
      source: getVideo("A2"),
      frames: [1, 483],
      prepare: ["B"],
      onInteraction: {
        type: "overlay",
        overlays: [<PhoneNumberOverlay key="phoneNumberOverlay" />],
      },
      onEnd: {
        type: "loop",
      },
    },
    {
      id: "B",
      source: getVideo("B"),
      frames: [4446, 0],
      prepare: ["B2"],
      onInteraction: { type: "nothing" },
      onEnd: {
        type: "proceed",
        to: "B2",
      },
    },
    {
      id: "B2",
      source: getVideo("B2"),
      frames: [414, 410],
      prepare: ["D", "F1"],
      onInteraction: {
        type: "overlay",
        overlays: [
          <DelayedSelectOverlay
            key="SelectOverlay"
            delayedSelects={[
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
            ]}
          />,
        ],
        endEarly: 80,
      },
      onEnd: {
        type: "proceed",
        to: "F1",
      },
    },
    {
      id: "D",
      source: getVideo("D"),
      frames: [400, 496],
      prepare: ["DI", "DJ", "DK", "F1"],
      onInteraction: {
        type: "overlay",
        overlays: [
          <SelectOverlay
            key="SelectOverlay"
            selects={[
              {
                to: "DI",
                text: "조각은 안 이상한가?",
              },
              { to: "DJ", text: "CCTV는?" },
              { to: "DK", text: "카드 출입기록은?" },
            ]}
          />,
        ],
      },
      onEnd: { type: "proceed", to: "F1" },
    },
    {
      id: "DJ",
      source: getVideo("DJ"),
      frames: [200, 432],
      prepare: ["DI", "DK", "F1"],
      onInteraction: {
        type: "overlay",
        overlays: [
          <SelectOverlay
            key="SelectOverlay"
            selects={[
              {
                to: "DI",
                text: "조각은 안 이상한가?",
              },
              { to: "DK", text: "카드 출입기록은?" },
            ]}
          />,
        ],
      },
      onEnd: {
        type: "proceed",
        to: "F1",
      },
    },
    {
      id: "DK",
      source: getVideo("DK"),
      frames: [200, 520],
      prepare: ["DI", "DJ", "F1"],
      onInteraction: {
        type: "overlay",
        overlays: [
          <SelectOverlay
            key="SelectOverlay"
            selects={[
              {
                to: "DI",
                text: "조각은 안 이상한가?",
              },
              { to: "DJ", text: "카드 출입기록은?" },
            ]}
          />,
        ],
      },
      onEnd: {
        type: "proceed",
        to: "F1",
      },
    },
    {
      id: "DI",
      source: getVideo("DI"),
      frames: [600, 390],
      prepare: ["DIX", "DIY", "F1"],
      onInteraction: {
        type: "overlay",
        overlays: [
          <SelectOverlay
            key="SelectOverlay"
            selects={[
              { to: "DIX", text: "" },
              { to: "DIY", text: "" },
            ]}
          />,
        ],
      },
      onEnd: {
        type: "proceed",
        to: "F1",
      },
    },
  ],
};

const frameTest: Film = {
  title: { kr: "졸업전시회", eng: "The Exhibition" },
  description: "",
  videos: [
    {
      id: "t1",
      source: getFrameTestVideo(),
      frames: [2884, 0],
      prepare: ["t2"],
      onInteraction: { type: "nothing" },
      onEnd: {
        type: "proceed",
        to: "t2",
      },
      frameCallbacks: [],
    },
    {
      id: "t2",
      source: getFrameTestVideo2(),
      frames: [2884, 0],
      prepare: [],
      onInteraction: { type: "nothing" },
      onEnd: {
        type: "loop",
      },
      frameCallbacks: [],
    },
  ],
};

const films: Record<string, Film> = {
  theExhibition,
} as const;

export type V1FilmId = keyof typeof films;

export default films;
