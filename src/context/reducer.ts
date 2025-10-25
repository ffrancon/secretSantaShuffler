import { saveStateToCache } from "@/app/cache";
import { type Action } from "@/types/reducer";
import { type State } from "@/types/state";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add_player":
      return {
        players: [...state.players, action.payload],
        // Reset pairs when a new player is added
        pairs: [],
      };
    case "edit_player":
      return {
        players: state.players.map((player) =>
          player === action.payload.current ? action.payload.new : player,
        ),
        // Update pairs to reflect the edited player name
        pairs: state.pairs.map(
          ([giver, receiver]) =>
            [
              giver === action.payload.current ? action.payload.new : giver,
              receiver === action.payload.current
                ? action.payload.new
                : receiver,
            ] satisfies [string, string],
        ),
      };
    case "remove_player":
      return {
        players: state.players.filter((player) => player !== action.payload),
        // Reset pairs when a player is removed
        pairs: [],
      };
    case "clear_players":
      return {
        players: [],
        pairs: [],
      };
    case "generate_pairs":
      return {
        ...state,
        pairs: action.payload,
      };
    case "clear_pairs":
      return {
        ...state,
        pairs: [],
      };
    default:
      return state;
  }
};

export const cachedReducer = (state: State, action: Action) => {
  const updated = reducer(state, action);
  // Persist the updated state to cache
  try {
    // Not the best way performance-wise, but sufficient for this use case
    saveStateToCache(updated);
  } catch (error) {
    console.error("Error saving cache:", error);
  }
  return updated;
};
