export type Select = {
  to: string;
  text: string;
};

export type DelayedSelect = Select & {
  audio: string;
  delay: number;
};
