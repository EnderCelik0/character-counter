import { create } from "zustand";

type State = {
  sentence: string;
  characterLimit: number | null;
  includeSpaces: boolean;
};

type Action = {
  updateSentence: (sentence: State["sentence"]) => void;
  updateCharacterLimit: (characterLimit: State["characterLimit"]) => void;
  updateIncludeSpaces: (includeSpace: State["includeSpaces"]) => void;
};

export const useSentenceStore = create<State & Action>((set) => ({
  sentence: "",
  characterLimit: null,
  includeSpaces: true,

  updateSentence: (newSentence) => set({ sentence: newSentence }),
  updateCharacterLimit: (newCharacterLimit) =>
    set({ characterLimit: newCharacterLimit }),
  updateIncludeSpaces: (newIncludeSpace) =>
    set({ includeSpaces: newIncludeSpace }),
}));
