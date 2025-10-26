import { initialState } from "@/app/context";
import type { State } from "@/types/state";
import { isStateValid } from "@/utils/validators";

const CACHE_KEY = "secretSantaShufflerCache";

// Save the entire state to localStorage
export const saveStateToCache = (state: State) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(CACHE_KEY, serialized);
  } catch (error) {
    console.error("Error saving cache:", error);
  }
};

// Restore the state from localStorage
export const restoreStateFromCache = (): State => {
  try {
    const data = localStorage.getItem(CACHE_KEY);
    if (data === null) {
      return initialState;
    }
    const parsed = JSON.parse(data) as unknown;
    return isStateValid(parsed) ? parsed : initialState;
  } catch (error) {
    console.error("Error restoring cache:", error);
    return initialState;
  }
};
