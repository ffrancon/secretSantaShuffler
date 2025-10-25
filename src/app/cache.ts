import { initialState } from "@/context";
import type { State } from "@/types/state";

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
    const parsed = JSON.parse(data) satisfies State;
    return validateCache(parsed) ? parsed : initialState;
  } catch (error) {
    console.error("Error restoring cache:", error);
    return initialState;
  }
};

const validateEntry = (entry: unknown): entry is string => {
  return typeof entry === "string" && entry.length > 0;
};

const validateCache = (state: State): boolean => {
  // Validate players structure
  const isPlayersValid =
    state.players &&
    Array.isArray(state.players) &&
    state.players.every((player) => validateEntry(player));

  // Validate pairs structure
  const isPairsValid =
    state.pairs &&
    Array.isArray(state.pairs) &&
    state.pairs.every(
      (pair) =>
        Array.isArray(pair) &&
        pair.length === 2 &&
        pair.every((item) => validateEntry(item)),
    );

  return isPlayersValid && isPairsValid;
};
