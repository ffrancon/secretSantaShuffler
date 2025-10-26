import { useSecretSantaCtx } from "@/app/context";
import { generateRandomPairs } from "@/utils/generateRandomPairs";
import { Fragment, memo, useCallback } from "react";
import { Pair } from "./Pair";
import { Button } from "@/components/ui/common/Button";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { useDialogState } from "@/components/hooks/useDialogState";

export const Pairs = memo(() => {
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

  const { isOpen, openDialog, closeDialog } = useDialogState();

  return (
    <Fragment>
      <ConfirmDialog
        isOpen={isOpen}
        title="Clear all pairs"
        content="Are you sure you want to clear all pairs?"
        confirm={clearPairs}
        close={closeDialog}
        isDestructive
      />
      <div className="flex h-full flex-col rounded-md border border-slate-700 bg-slate-800 shadow-md">
        <div
          className={`flex flex-grow flex-col ${
            pairs.length > 0 ? "" : "items-center justify-center"
          } divide-y divide-slate-700 overflow-y-auto`}
        >
          {pairs.length > 0 ? (
            pairs.map((pair) => (
              <Pair
                key={`pair-${pair[0].replace(/\s+/g, "-")}-${pair[1].replace(/\s+/g, "-")}`}
                pair={pair}
              />
            ))
          ) : (
            <p className="text-sm text-slate-400">No pairs generated yet.</p>
          )}
        </div>
        <div className="flex justify-between gap-2 border-t border-slate-700 p-3">
          <Button onClick={generatePairs} disabled={players.length < 2}>
            Generate Pairs
          </Button>
          <Button
            variant="destructive"
            onClick={openDialog}
            disabled={pairs.length === 0}
          >
            Clear all
          </Button>
        </div>
      </div>
    </Fragment>
  );
});
