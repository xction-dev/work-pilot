type VideoId = string;

type Selection = {
  to: string;
  onSelect: (to: VideoId) => void;
};

type Transition = {
  normal: {
    type: "normal";
    to: VideoId;
  };
  loop: {
    type: "loop";
  };
  select: {
    type: "select";
    selects: Selection[];
  };
};

type Video = {
  id: VideoId;
  source: string;
  transition: Transition[keyof Transition];
};

export type Film = {
  title: { kr: string; eng: string };
  description: string;
  videos: Video[];
};
