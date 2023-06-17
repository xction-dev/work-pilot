import { create } from "zustand";
import { Video } from "../../data/types";

/*** external types ***/
export type XctionPlayerVideoSource = Video;
export type XctionFrameCallback = (
  frame: number,
  id: XctionPlayerVideoSource["id"],
) => void;

/*** internal types ***/
type XctionPlayerStore = {
  /*** data ***/
  isInitiated: boolean;
  allSources: XctionPlayerVideoSource[];
  /*** system ***/
  isPrimaryPlaying: boolean;
  primarySources: XctionPlayerVideoSource[];
  secondarySources: XctionPlayerVideoSource[];
  /*** player ***/
  isPlaying: boolean;
  currentVideoId: XctionPlayerVideoSource["id"] | null;
  currentVideoRef: HTMLVideoElement | null;
  finishCallback: () => void;
  /*** frame ***/
  currentFrame: number;
  frameCallbacks: XctionFrameCallback[];
  /*** dispatch actions ***/
  actions: {
    data: {
      initiateXctionPlayer: (
        allSources: XctionPlayerVideoSource[],
        finishCallback?: XctionPlayerStore["finishCallback"],
      ) => void;
    };
    system: {
      loadVideoRef: (videoRef: HTMLVideoElement) => void;
      proceedToNextSource: (
        nextVideoSource: XctionPlayerVideoSource | null,
      ) => void;
    };
    frame: {
      update: (frame: number) => void;
      loadFrameCallbacks: (callbacks: XctionFrameCallback[]) => void;
    };
  };
};

const filterNextSourcesByIds = (
  allSources: XctionPlayerVideoSource[],
  ids: string[],
) => allSources.filter((source) => ids.includes(source.id));

const getNextSourceWithTransition = (
  allSources: XctionPlayerVideoSource[],
  prepare: XctionPlayerVideoSource["prepare"],
): XctionPlayerVideoSource[] => filterNextSourcesByIds(allSources, prepare);

/*** hooks ***/
const initialState: Omit<XctionPlayerStore, "actions"> = {
  isInitiated: false,
  allSources: [],
  isPrimaryPlaying: true,
  primarySources: [],
  secondarySources: [],
  isPlaying: false,
  currentVideoId: null,
  currentVideoRef: null,
  finishCallback: () => null,
  currentFrame: 0,
  frameCallbacks: [],
};

export const useXctionPlayer = create<XctionPlayerStore>()((set, get) => ({
  ...initialState,
  actions: {
    data: {
      initiateXctionPlayer: (allSources, finishCallback) => {
        const indexSource = allSources[0];
        set({
          allSources,
          isInitiated: true,
          isPrimaryPlaying: true,
          currentVideoId: indexSource.id,
          primarySources: [indexSource],
          secondarySources: getNextSourceWithTransition(
            allSources,
            indexSource.prepare,
          ),
          isPlaying: true,
          finishCallback: finishCallback ?? initialState.finishCallback,
          currentFrame: 0,
          frameCallbacks: [],
        });
      },
    },

    system: {
      proceedToNextSource: (nextVideoSource) => {
        const {
          allSources,
          isPrimaryPlaying,
          currentVideoRef,
          finishCallback,
        } = get();
        //pause previous video
        if (currentVideoRef) currentVideoRef.pause();

        if (nextVideoSource) {
          //change state if next video source exist
          const nextState: Partial<XctionPlayerStore> = {};

          // toggle primary/secondary
          nextState.isPrimaryPlaying = !isPrimaryPlaying;

          // change current video id
          nextState.currentVideoId = nextVideoSource.id;

          //load child video if exist
          const sourcesToPrepare = getNextSourceWithTransition(
            allSources,
            nextVideoSource.prepare,
          );
          const primaryOrSecondaryToSet: keyof XctionPlayerStore =
            isPrimaryPlaying ? "primarySources" : "secondarySources";
          nextState[primaryOrSecondaryToSet] = sourcesToPrepare;

          //reset frame
          nextState.currentFrame = 0;

          //set everything
          set(nextState);
        } else {
          //if next id is null, call finish callback
          finishCallback();

          //reset to initial state
          set(initialState);
        }
      },
      loadVideoRef: (videoRef) => set({ currentVideoRef: videoRef }),
    },
    frame: {
      update: (frame) => {
        const { currentVideoId, frameCallbacks } = get();
        frameCallbacks.forEach((callback) =>
          callback(frame, currentVideoId ?? ""),
        );
        set({ currentFrame: frame });
      },
      loadFrameCallbacks: (callbacks) => set({ frameCallbacks: callbacks }),
    },
  },
}));

export const playWithId = (id: XctionPlayerVideoSource["id"]) => {
  const {
    allSources,
    actions: {
      system: { proceedToNextSource },
    },
  } = useXctionPlayer.getState();
  const nextSource = allSources.find((source) => source.id === id);
  nextSource
    ? proceedToNextSource(nextSource)
    : console.log("error: no source found");
};
