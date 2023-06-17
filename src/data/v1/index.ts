import { Film } from "../types";

const theExhibition: Film = {
  title: { kr: "졸업전시회", eng: "The Exhibition" },
  description: "",
  videos: [
    {
      id: "A",
      source: "",
      transition: {
        type: "proceed",
        to: "A2",
      },
      prepare: ["A2"],
    },
    {
      id: "A2",
      source: "",
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
      source: "",
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
