import { Film } from "../types";
import {
  getFrameTestVideo,
  getFrameTestVideo2,
  getV1,
  getV1Audio,
  getV2,
} from "../../libs/getSampleVideo/getSampleVideo";

import PhoneNumberOverlay from "../../components/Play/overlays/PhoneNumberOverlay";
import SelectOverlay, {
  DelayedSelectOverlay,
  EndSelectOverlay,
} from "../../components/Play/overlays/SelectOverlay";
import Timer from "../../components/Play/Timer/Timer";
import CreditOverlay from "../../components/Play/overlays/CreditOverlay";

const getVideo = getV2;

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
                to: "D",
                text: "이간질하려는 건 아닌데...",
                audio: "E audio",
                delay: 3000,
              },
            ]}
          />,
          <Timer key="Timer" frames={[414, 340]} />,
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
          <Timer key="Timer" frames={[400, 496]} />,
        ],
      },
      onEnd: { type: "proceed", to: "F1" },
    },
    {
      id: "DJ",
      source: getVideo("DJ"),
      frames: [320, 312],
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
          <Timer key="Timer" frames={[320, 312]} />,
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
      frames: [450, 270],
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
          <Timer key="Timer" frames={[450, 270]} />,
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
      frames: [706, 284],
      prepare: ["DIX", "DIY", "F1"],
      onInteraction: {
        type: "overlay",
        overlays: [
          <SelectOverlay
            key="SelectOverlay"
            selects={[
              { to: "DIX", text: "얼굴 부분이 깬 티가 나" },
              { to: "DIY", text: "페인트, 핏자국 같지 않나?" },
            ]}
          />,
          <Timer key="Timer" frames={[706, 284]} />,
        ],
      },
      onEnd: {
        type: "proceed",
        to: "F1",
      },
    },
    {
      id: "DIX",
      source: getVideo("DIX"),
      frames: [2874, 324],
      prepare: ["DSuccess", "F2"],
      onInteraction: {
        type: "overlay",
        overlays: [
          <EndSelectOverlay
            key="SelectOverlay"
            selects={[
              { to: "DSuccess", text: "왜 하필 얼굴을 깼어?" },
              { to: "F2", text: "괜히 의심했어, 미안." },
            ]}
          />,
          <Timer key="Timer" frames={[2874, 324]} />,
        ],
      },
      onEnd: {
        type: "proceed",
        to: "F2",
      },
    },
    {
      id: "DIY",
      source: getVideo("DIY"),
      frames: [709, 0],
      prepare: ["F1"],
      onInteraction: {
        type: "nothing",
      },
      onEnd: {
        type: "proceed",
        to: "F1",
      },
    },
    {
      id: "DSuccess",
      source: getVideo("DSuccess"),
      frames: [5235, 0],
      prepare: [],
      onInteraction: {
        type: "nothing",
      },
      onEnd: {
        type: "finish",
      },
    },
    {
      id: "F1",
      source: getVideo("F1"),
      frames: [2102, 0],
      prepare: [],
      onInteraction: {
        type: "overlay",
        overlays: [<CreditOverlay key="CreditOverlay" />],
      },
      onEnd: {
        type: "finish",
      },
    },
    {
      id: "F2",
      source: getVideo("F2"),
      frames: [2405, 0],
      prepare: [],
      onInteraction: {
        type: "nothing",
      },
      onEnd: {
        type: "finish",
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
