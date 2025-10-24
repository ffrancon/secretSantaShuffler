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
    <div className="bg-neutral-100 rounded-md shadow-md flex flex-col h-full">
      <div className="p-4 flex flex-col gap-2 flex-grow overflow-y-auto">
        {pairs.map((pair, index) => (
          <Pair key={index} pair={pair} />
        ))}
      </div>
      <div className="flex justify-between px-4 py-3 gap-2 border-t border-neutral-300">
        <Button onClick={generatePairs}>Generate Pairs</Button>
        <Button variant="destructive" onClick={clearPairs}>
          Clear all
        </Button>
      </div>
    </div>
  );
};
