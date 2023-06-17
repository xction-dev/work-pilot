type VideoId = string;

type Transition = {
  proceed: {
    type: "proceed";
    to: VideoId;
  };
  loop: {
    type: "loop";
    onLoop?: (to: VideoId) => void;
  };
};

type Interaction = {
  frame: {
    type: "frame";
    callback: (frame: number) => void;
  };
};

export type Video = {
  id: VideoId;
  source: string;
  frames: number;
  transition: Transition[keyof Transition];
  interaction?: Interaction[keyof Interaction];
  prepare: VideoId[];
};

export type Film = {
  title: { kr: string; eng: string };
  description: string;
  videos: Video[];
};
