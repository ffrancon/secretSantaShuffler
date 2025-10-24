import { useSecretSantaCtx } from "@/context";
import { generateRandomPairs } from "@/utils/generateRandomPairs";
import { useCallback } from "react";
import { Pair } from "./Pair";
import { Button } from "../common/Button";

export const Pairs = () => {
  const {
    state: { players, pairs },
    dispatch,
  } = useSecretSantaCtx();

  const generatePairs = useCallback(() => {
    dispatch({
      type: "generate_pairs",
      payload: generateRandomPairs(players),
    });
  }, [dispatch, players]);

  const clearPairs = useCallback(() => {
    dispatch({ type: "clear_pairs" });
  }, [dispatch]);

  if (players.length === 0) {
    return null;
  }

  return (
    <div className="flex h-full flex-col rounded-md bg-neutral-100 shadow-md">
      <div className="flex flex-grow flex-col gap-2 overflow-y-auto p-4">
        {pairs.map((pair, index) => (
          <Pair key={index} pair={pair} />
        ))}
      </div>
      <div className="flex justify-between gap-2 border-t border-neutral-300 px-4 py-3">
        <Button onClick={generatePairs}>Generate Pairs</Button>
        <Button variant="destructive" onClick={clearPairs}>
          Clear all
        </Button>
      </div>
    </div>
  );
};
