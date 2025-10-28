import type { Players, Pairs, State } from "@/types/state";

const isPlayer = (entry: unknown): entry is string => {
  return typeof entry === "string" && entry.length > 0;
};

const isPlayers = (players: unknown): players is Players => {
  return Array.isArray(players) && players.every((player) => isPlayer(player));
};

const isPairs = (pairs: unknown): pairs is Pairs => {
  return (
    Array.isArray(pairs) &&
    pairs.every(
      (pair) =>
        Array.isArray(pair) &&
        pair.length === 2 &&
        pair.every((item) => isPlayer(item)),
    )
  );
};
export const isState = (state: unknown): state is State => {
  if (typeof state !== "object" || state === null) {
    return false;
  }
  const expectedKeys = ["players", "pairs", "excludedPairs"];
  const currentKeys = Object.keys(state);

  // Check that only expected properties exist
  const hasOnlyExpectedKeys = currentKeys.every((key) =>
    expectedKeys.includes(key),
  );

  return (
    hasOnlyExpectedKeys &&
    "players" in state &&
    isPlayers(state.players) &&
    "pairs" in state &&
    isPairs(state.pairs) &&
    "excludedPairs" in state &&
    isPairs(state.excludedPairs)
  );
};
