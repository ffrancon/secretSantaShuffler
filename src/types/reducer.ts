import type { Pairs } from "./state";

export type AddPlayerAction = {
  type: "add_player";
  payload: string;
};

export type EditPlayerAction = {
  type: "edit_player";
  payload: {
    current: string;
    new: string;
  };
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
  | EditPlayerAction
  | RemovePlayerAction
  | ClearPlayersAction
  | GeneratePairsAction
  | ClearPairsAction;
