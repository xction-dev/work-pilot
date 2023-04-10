export type AvailableVideoId = "a" | "b" | "c" | "d" | "e";
export type VideoStatus =
  | "idle"
  | "loading"
  | "loaded"
  | "playing"
  | "paused"
  | "done";

export type VideoSource = {
  id: AvailableVideoId;
  source: string;
};

export type VideoData = {
  video: VideoSource;
  status: VideoStatus;
};
