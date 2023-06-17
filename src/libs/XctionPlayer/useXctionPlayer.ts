import { create } from "zustand";
import { Video } from "../../data/types";
import { ReactNode } from "react";

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
  totalFrame: number;
  frameCallbacks: XctionFrameCallback[];
  /*** overlay ***/
  isControllerVisible: boolean;
  overlays: ReactNode[];
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
      update: () => void;
      reset: () => void;
      loadFrameCallbacks: (callbacks: XctionFrameCallback[]) => void;
    };
    control: {
      play: () => void;
      pause: () => void;
      setTime: (frame: number) => void;
    };
    overlay: {
      setControllerVisibility: (isVisible: boolean) => void;
      setOverlays: (overlays: ReactNode[]) => void;
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

const getFrameCallbacksWithInteraction = (
  interaction?: XctionPlayerVideoSource["interaction"],
): XctionFrameCallback[] => {
  if (!interaction) return [];
  if (interaction.type === "frame") return [interaction.callback];
  return [];
};

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
  totalFrame: 0,
  frameCallbacks: [],
  overlays: [],
  isControllerVisible: true,
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
          isPlaying: false,
          finishCallback: finishCallback ?? initialState.finishCallback,
          currentFrame: -1,
          totalFrame: indexSource.frames,
          frameCallbacks: getFrameCallbacksWithInteraction(
            indexSource.interaction,
          ),
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

          //prepare frame callbacks
          nextState.frameCallbacks = getFrameCallbacksWithInteraction(
            nextVideoSource.interaction,
          );

          //reset frame
          nextState.currentFrame = 0;
          nextState.totalFrame = nextVideoSource.frames;

          //reset overlays
          nextState.overlays = [];
          nextState.isControllerVisible = false;

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
      update: () => {
        const { currentVideoId, currentFrame, frameCallbacks } = get();
        const frame = currentFrame + 1;
        frameCallbacks.forEach((callback) =>
          callback(frame, currentVideoId ?? ""),
        );
        set({ currentFrame: frame });
      },
      reset: () => set({ currentFrame: 0 }),
      loadFrameCallbacks: (callbacks) => set({ frameCallbacks: callbacks }),
    },
    control: {
      play: () => set({ isPlaying: true }),
      pause: () => set({ isPlaying: false }),
      setTime: (frame) => {
        const { currentVideoRef } = get();
        if (currentVideoRef) {
          currentVideoRef.currentTime = frame / 23.976;
          set({ currentFrame: frame });
        }
      },
    },
    overlay: {
      setControllerVisibility: (isVisible) =>
        set({ isControllerVisible: isVisible }),
      setOverlays: (overlays) => set({ overlays }),
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

export const setOverlays = (overlays: ReactNode[]) =>
  useXctionPlayer.getState().actions.overlay.setOverlays(overlays);

export const clearOverlays = () =>
  useXctionPlayer.getState().actions.overlay.setOverlays([]);
