import { create } from "zustand";
import type { StateCreator } from "zustand";

import { devtools } from "zustand/middleware";

export interface GlobalState {
  isthema: boolean;

  openThema: () => void;
}
const storeApi: StateCreator<GlobalState> = (set) => ({
  isthema: false,

  openThema: () => {
    set((state) => ({
      isthema: !state.isthema,
    }));
  },
});

export const useGlobalStore = create<GlobalState>()(devtools(storeApi));
