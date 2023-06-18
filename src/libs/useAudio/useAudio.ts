import { create } from "zustand";

type AudioStore = {
  currentAudio: string | null;
  actions: {
    playAudio: (audio: string) => void;
    clearAudio: () => void;
  };
};

export const useAudio = create<AudioStore>()((set) => ({
  currentAudio: null,
  actions: {
    playAudio: (audio) => set({ currentAudio: audio }),
    clearAudio: () => set({ currentAudio: null }),
  },
}));

export const { playAudio, clearAudio } = useAudio.getState().actions;
