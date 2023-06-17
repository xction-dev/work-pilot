import { FrameCallback } from "../../../data/types";

type Select = {
  to: string;
};

export const selects =
  (selects: Select[]): FrameCallback =>
  () => {};
