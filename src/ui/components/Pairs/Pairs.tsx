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
    <div className="w-[400px] mx-auto">
      <div className="flex gap-2 mb-4">
        <Button onClick={generatePairs}>Generate Pairs</Button>
        <Button variant="destructive" onClick={clearPairs}>
          Clear Pairs
        </Button>
      </div>
      <ul>
        {pairs.map((pair, index) => (
          <Pair key={index} pair={pair} />
        ))}
      </ul>
    </div>
  );
};
