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

  return (
    <div className="flex h-full flex-col rounded-md bg-neutral-100 shadow-md">
      <div
        className={`flex flex-grow flex-col ${
          pairs.length > 0 ? "" : "items-center justify-center"
        } gap-2 overflow-y-auto p-4`}
      >
        {pairs.length > 0 ? (
          pairs.map((pair, index) => <Pair key={index} pair={pair} />)
        ) : (
          <p className="text-sm text-neutral-400">No pairs generated yet.</p>
        )}
      </div>
      <div className="flex justify-between gap-2 border-t border-neutral-300 px-4 py-3">
        <Button
          onClick={generatePairs}
          disabled={pairs.length > 0 || players.length < 2}
        >
          Generate Pairs
        </Button>
        <Button
          variant="destructive"
          onClick={clearPairs}
          disabled={pairs.length === 0}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};
