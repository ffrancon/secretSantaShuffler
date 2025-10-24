import { useSecretSantaCtx } from "@/context";
import { generateRandomPairs } from "@/utils/generateRandomPairs";
import { useCallback } from "react";
import { Pair } from "./Pair";

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

  if (pairs.length === 0) {
    return null;
  }

  return (
    <div className="w-[400px] mx-auto">
      <div className="flex gap-2 mb-4">
        <button
          onClick={generatePairs}
          className="h-10 bg-green-500 text-white px-4 py-1 rounded shrink-0"
        >
          Generate Pairs
        </button>
        <button
          onClick={clearPairs}
          className="h-10 bg-red-500 text-white px-4 py-1 rounded shrink-0"
        >
          Clear Pairs
        </button>
      </div>
      <ul>
        {pairs.map((pair, index) => (
          <Pair key={index} pair={pair} />
        ))}
      </ul>
    </div>
  );
};
