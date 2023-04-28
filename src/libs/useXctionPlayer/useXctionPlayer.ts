import { create } from "zustand";
import { RefObject } from "react";

/*** external types ***/
export type XctionPlayerVideoSource = {
  videoId: string;
  sourceURL: string;
  childVideoIds: string[] | null;
};

export type XctionPlayerFinishCallback = (
  lastId: XctionPlayerVideoSource["videoId"],
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
    proceedToNextSource: (
      nextVideoSource: XctionPlayerVideoSource | null,
    ) => void;
    loadVideoRef: (videoRef: HTMLVideoElement) => void;
    getCurrentVideoSource: () => XctionPlayerVideoSource | null;
    setPlayStatus: (status: XctionPlayerStore["playStatus"]) => void;
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
    proceedToNextSource: (nextVideoSource) => {
      const {
        allSources,
        isPrimaryPlaying,
        finishCallBack,
        currentVideoId,
        currentVideoRef,
        actions: { getCurrentVideoSource },
      } = get();
      //pause previous video
      if (currentVideoRef) currentVideoRef.pause();

      if (nextVideoSource) {
        //change state if next video source exist
        const nextState: Partial<XctionPlayerStore> = {};

        // toggle primary/secondary
        nextState.isPrimaryPlaying = !isPrimaryPlaying;

        // change current video id
        nextState.currentVideoId = nextVideoSource.videoId;

        //load child video if exist
        if (nextVideoSource.childVideoIds) {
          if (nextVideoSource.childVideoIds.length > 0) {
            const sourcesToPrepare = filterNextSourcesByIds(
              allSources,
              nextVideoSource.childVideoIds,
            );
            const sourceToSet: keyof XctionPlayerStore = isPrimaryPlaying
              ? "primarySources"
              : "secondarySources";
            nextState[sourceToSet] = sourcesToPrepare;
          } else {
            console.error({
              code: "useXctionPlayer_02",
              message:
                "다음 childVideoIds가 비었습니다. 다음 영상이 마지막이라면 childVideoIds에 빈 배열 대신 null을 기입하세요.",
            });
          }
        }

        //set everything
        set(nextState);
      } else {
        //if next id is null, call finish callback
        if (currentVideoId) finishCallBack(currentVideoId);

        //reset to initial state
        set(initialState);
      }
    },
    loadVideoRef: (videoRef) => set({ currentVideoRef: videoRef }),
    getCurrentVideoSource: () => {
      const { allSources, currentVideoId } = get();

      return (
        allSources.find((source) => source.videoId === currentVideoId) ?? null
      );
    },
    setPlayStatus: (status) => set({ playStatus: status }),
  },
}));
