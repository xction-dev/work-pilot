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
  finishCallback: () => void;
  /*** system ***/
  isPrimaryPlaying: boolean;
  primarySources: XctionPlayerVideoSource[];
  secondarySources: XctionPlayerVideoSource[];
  /*** video control ***/
  isPlaying: boolean;
  currentVideoId: XctionPlayerVideoSource["id"] | null;
  currentVideoRef: HTMLVideoElement | null;
  onEnd: XctionPlayerVideoSource["onEnd"];

  /*** frame ***/
  currentFrame: number;
  totalFrame: number;
  frameCallbacks: XctionFrameCallback[];
  /*** overlay ***/
  overlayType: "controller" | "interactive";
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
    control: {
      play: () => void;
      pause: () => void;
      setTime: (frame: number) => void;
      overrideOnEnd: (onEnd: XctionPlayerStore["onEnd"]) => void;
    };
    frame: {
      update: () => void;
      reset: () => void;
      loadFrameCallbacks: (callbacks: XctionFrameCallback[]) => void;
    };
    overlay: {
      setOverlayType: (type: XctionPlayerStore["overlayType"]) => void;
      setOverlays: (overlays: ReactNode[]) => void;
    };
  };
};

const filterNextSourcesByIds = (
  allSources: XctionPlayerVideoSource[],
  ids: string[],
) => allSources.filter((source) => ids.includes(source.id));

/*** hooks ***/
const initialState: Omit<XctionPlayerStore, "actions"> = {
  isInitiated: false,
  allSources: [],
  finishCallback: () => null,
  isPrimaryPlaying: true,
  primarySources: [],
  secondarySources: [],
  isPlaying: false,
  currentVideoId: null,
  currentVideoRef: null,
  onEnd: { type: "pause" },
  currentFrame: 0,
  totalFrame: 0,
  frameCallbacks: [],
  overlayType: "controller",
  overlays: [],
};

export const useXctionPlayer = create<XctionPlayerStore>()((set, get) => ({
  ...initialState,
  actions: {
    data: {
      initiateXctionPlayer: (allSources, finishCallback) => {
        const indexSource = allSources[0];
        set({
          isInitiated: true,
          allSources,
          finishCallback: finishCallback ?? initialState.finishCallback,
          isPrimaryPlaying: true,
          primarySources: [indexSource],
          secondarySources: filterNextSourcesByIds(
            allSources,
            indexSource.prepare,
          ),
          isPlaying: false,
          currentVideoId: indexSource.id,
          onEnd: indexSource.onEnd,
          currentFrame: -1,
          totalFrame: indexSource.frames[0],
          frameCallbacks: indexSource.frameCallbacks ?? [],
          overlays:
            indexSource.onInteraction.type === "overlay"
              ? indexSource.onInteraction.overlays
              : [],
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

          // change current video id & onEnd
          nextState.currentVideoId = nextVideoSource.id;
          nextState.onEnd = nextVideoSource.onEnd;

          //load video to prepare if exist
          const sourcesToPrepare = filterNextSourcesByIds(
            allSources,
            nextVideoSource.prepare,
          );
          const primaryOrSecondaryToSet: keyof XctionPlayerStore =
            isPrimaryPlaying ? "primarySources" : "secondarySources";
          nextState[primaryOrSecondaryToSet] = sourcesToPrepare;

          //reset frame
          nextState.currentFrame = 0;
          nextState.totalFrame = nextVideoSource.frames[0];

          //prepare frame callbacks
          nextState.frameCallbacks = nextVideoSource.frameCallbacks ?? [];

          //reset overlays
          nextState.overlayType = "controller";
          nextState.overlays =
            nextVideoSource.onInteraction.type === "overlay"
              ? nextVideoSource.onInteraction.overlays
              : [];

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
        const {
          currentVideoId,
          currentFrame,
          frameCallbacks,
          totalFrame,
          overlayType,
          actions,
        } = get();
        const frame = currentFrame + 1;
        if (overlayType !== "interactive" && frame >= totalFrame) {
          actions.overlay.setOverlayType("interactive");
        }
        if (overlayType === "interactive" && frame < totalFrame) {
          actions.overlay.setOverlayType("controller");
        }
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
      overrideOnEnd: (onEnd) => set({ onEnd }),
    },
    overlay: {
      setOverlayType: (type) => set({ overlayType: type }),
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
