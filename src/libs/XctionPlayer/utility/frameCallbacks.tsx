import { FrameCallback } from "../../../data/types";
import { setOverlays } from "../useXctionPlayer";
import TestOverlay from "../../../components/Play/overlays/TestOverlay";
import SelectOverlay from "../../../components/Play/overlays/SelectOverlay";
import PhoneNumberOverlay from "../../../components/Play/overlays/PhoneNumberOverlay";

export type Select = {
  to: string;
  text: string;
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
