import { type Pairs, type State } from "./types";

export type AddPlayerAction = {
  type: "add_player";
  payload: string;
};

export type RemovePlayerAction = {
  type: "remove_player";
  payload: string;
};

export type ClearPlayersAction = {
  type: "clear_players";
};

export type GeneratePairsAction = {
  type: "generate_pairs";
  payload: Pairs;
};

export type ClearPairsAction = {
  type: "clear_pairs";
};

export type Action =
  | AddPlayerAction
  | RemovePlayerAction
  | ClearPlayersAction
  | GeneratePairsAction
  | ClearPairsAction;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add_player":
      return {
        players: [...state.players, action.payload],
        // Reset pairs when a new player is added
        pairs: [],
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
