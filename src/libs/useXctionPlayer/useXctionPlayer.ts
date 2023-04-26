import { create } from "zustand";
import { RefObject } from "react";

/*** external types ***/
export type XctionPlayerVideoSource = {
  videoId: string;
  sourceURL: string;
  childVideoIds: string[] | null;
};

export type XctionPlayerFinishCallback = (
  source: XctionPlayerVideoSource,
) => void;

/*** internal types ***/
type XctionPlayerStore = {
  allSources: XctionPlayerVideoSource[];
  isPrimaryPlaying: boolean;
  currentVideoId: XctionPlayerVideoSource["videoId"] | null;
  primarySources: XctionPlayerVideoSource[];
  secondarySources: XctionPlayerVideoSource[];
  currentVideoRef: HTMLVideoElement | null;
  finishCallBack: XctionPlayerFinishCallback;
  playStatus: "paused" | "playing";
  /*** dispatch actions ***/
  actions: {
    initiateXctionPlayer: (
      allSources: XctionPlayerVideoSource[],
      finishiCallBack: XctionPlayerFinishCallback,
    ) => void;
    proceedToNextSource: (currentSource: XctionPlayerVideoSource) => void;
    loadVideoRef: (videoRef: HTMLVideoElement) => void;
  };
};

const filterNextSourcesByIds = (
  allSources: XctionPlayerVideoSource[],
  ids: string[],
) => allSources.filter((source) => ids.includes(source.videoId));

/*** hooks ***/
const initialState: Omit<XctionPlayerStore, "actions"> = {
  allSources: [],
  isPrimaryPlaying: true,
  currentVideoId: null,
  primarySources: [],
  secondarySources: [],
  currentVideoRef: null,
  playStatus: "paused",
  finishCallBack: () => {},
};

export const useXctionPlayer = create<XctionPlayerStore>()((set, get) => ({
  ...initialState,
  actions: {
    initiateXctionPlayer: (allSources, finishCallBack) => {
      const indexSource = allSources[0];
      set({
        allSources,
        isPrimaryPlaying: true,
        currentVideoId: indexSource.videoId,
        primarySources: [indexSource],
        secondarySources: filterNextSourcesByIds(
          allSources,
          indexSource.childVideoIds ?? [],
        ),
        finishCallBack,
      });
    },
    proceedToNextSource: (currentSource) => {
      const { allSources, isPrimaryPlaying, finishCallBack } = get();
      if (currentSource.childVideoIds) {
        const nextState: Partial<XctionPlayerStore> = {};
        const nextSources = filterNextSourcesByIds(
          allSources,
          currentSource.childVideoIds,
        );
        if (nextSources.length > 0) {
          //load next cluster source to primary/secondary player
          const sourceToSet: keyof XctionPlayerStore = isPrimaryPlaying
            ? "primarySources"
            : "secondarySources";
          Object.defineProperty(nextState, sourceToSet, nextSources);
          // toggle primary/secondary
          nextState.isPrimaryPlaying = !isPrimaryPlaying;
        } else {
          //if next source doesn't exist, report error
        }
        set(nextState);
      } else {
        //if next id is null, call finish callback
        finishCallBack(currentSource);
      }
    },
    loadVideoRef: (videoRef) => set({ currentVideoRef: videoRef }),
  },
}));
