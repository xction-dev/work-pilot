import { ReactNode } from "react";

type VideoId = string;

type OnEnd = {
  proceed: {
    type: "proceed";
    to: VideoId;
  };
  loop: {
    type: "loop";
    onLoop?: (to: VideoId) => void;
  };
  pause: {
    type: "pause";
    onPause?: () => void;
  };
  finish: {
    type: "finish";
  };
};

type OnInteraction = {
  nothing: {
    type: "nothing";
  };
  overlay: {
    type: "overlay";
    overlays: ReactNode[];
    endEarly?: number;
  };
};

export type FrameCallback = (frame: number) => void;

export type Video = {
  id: VideoId;
  source: string;
  frames: [number, number]; // [videoFrame, interactionFrame]
  prepare: VideoId[];
  onInteraction: OnInteraction[keyof OnInteraction];
  onEnd: OnEnd[keyof OnEnd];
  frameCallbacks?: FrameCallback[];
};

export type Film = {
  title: { kr: string; eng: string };
  description: string;
  videos: Video[];
};

export type VideoNode = {
  id: VideoId;
  horizontal: number;
  vertical: number;
  title: string;
  description: string;
  icon: "default" | "accuse" | "box";
};
