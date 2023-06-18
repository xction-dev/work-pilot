import { FrameCallback } from "../../../data/types";
import { setOverlays } from "../useXctionPlayer";
import TestOverlay from "../../../components/Play/overlays/TestOverlay";
import SelectOverlay, {
  DelayedSelectOverlay,
} from "../../../components/Play/overlays/SelectOverlay";
import PhoneNumberOverlay from "../../../components/Play/overlays/PhoneNumberOverlay";

export type Select = {
  to: string;
  text: string;
};

export type DelayedSelect = Select & {
  audio: string;
  delay: number;
};

let isTestOn = false;
let fired = false;

export const testFrameCallback =
  (startAt: number): FrameCallback =>
  (frame) => {
    if (frame > startAt && !isTestOn) {
      setOverlays([<TestOverlay key="test" />]);
      isTestOn = true;
    }
  };

export const selectFrameCallback =
  (selects: Select[], startAt: number): FrameCallback =>
  (frame) => {
    if (frame > startAt) {
      if (!fired) {
        setOverlays([<SelectOverlay key="SelectOverlay" selects={selects} />]);
        fired = true;
      }
    } else {
      if (fired) {
        fired = false;
      }
    }
  };

export const delayedSelectFrameCallback =
  (selects: DelayedSelect[], startAt: number, endAt: number): FrameCallback =>
  (frame) => {
    if (frame > startAt) {
      if (frame > endAt) {
        setOverlays([<div key="nothing" />]);
      } else {
        if (!fired) {
          setOverlays([
            <DelayedSelectOverlay
              key="SelectOverlay"
              delayedSelects={selects}
            />,
          ]);
          fired = true;
        }
      }
    } else {
      if (fired) {
        fired = false;
      }
    }
  };

export const phoneNumberCallback =
  (startAt: number): FrameCallback =>
  (frame) => {
    if (frame > startAt) {
      if (!fired) {
        setOverlays([<PhoneNumberOverlay />]);
        fired = true;
      }
    } else {
      if (fired) {
        fired = false;
      }
    }
  };
