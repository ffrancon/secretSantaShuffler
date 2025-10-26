import { Fragment, memo, useCallback, useState } from "react";
import { useSecretSantaCtx } from "@/app/context";
import { Player } from "./Player";
import { InputWithButtons } from "@/components/ui/common/InputWithButtons";
import { Button } from "../common/Button";
import { ConfirmDialog } from "../common/ConfirmDialog";

export const Players = memo(() => {
  const {
    state: { players, pairs },
    dispatch,
  } = useSecretSantaCtx();

  const addPlayer = useCallback(
    (player: string) => {
      if (
        // Prevent adding duplicate players (case-insensitive, ignoring spaces)
        players.some(
          (p) =>
            p.toLowerCase().replace(/\s+/g, "-") ===
            player.toLowerCase().replace(/\s+/g, "-"),
        )
      ) {
        // ToDo: Add user feedback here
        return;
      }
      dispatch({ type: "add_player", payload: player });
    },
    [dispatch, players],
  );

  const createEditPlayer = useCallback(
    (current: string) => (newPlayer: string) => {
      dispatch({
        type: "edit_player",
        payload: { current, new: newPlayer },
      });
    },
    [dispatch],
  );

  const createRemovePlayer = useCallback(
    (player: string) => () => {
      dispatch({ type: "remove_player", payload: player });
    },
    [dispatch],
  );

  const clearPlayers = useCallback(() => {
    dispatch({ type: "clear_players" });
  }, [dispatch]);

  const [isClearConfirmDialogOpen, setClearConfirmDialogOpen] = useState(false);
  const openClearDialog = useCallback(
    () => setClearConfirmDialogOpen(true),
    [],
  );
  const closeClearDialog = useCallback(
    () => setClearConfirmDialogOpen(false),
    [],
  );

  return (
    <Fragment>
      <ConfirmDialog
        isOpen={isClearConfirmDialogOpen}
        title="Clear all players"
        content="Are you sure you want to remove all players? Pairs will also be cleared."
        confirm={clearPlayers}
        close={closeClearDialog}
        isDestructive
      />
      <div className="mx-auto w-full">
        <div className="flex gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-4 shadow-md">
          <InputWithButtons
            propagate={addPlayer}
            confirmButtonLabel="Add player"
            placeholder="Enter player name"
            clearAfterConfirm
            aria-label="Add player input"
          />
          <Button
            variant="destructive"
            onClick={pairs.length > 0 ? openClearDialog : clearPlayers}
            disabled={players.length === 0}
          >
            Clear all
          </Button>
        </div>
        <div
          className={`mt-3 flex min-h-[200px] flex-col ${
            players.length > 0 ? "" : "items-center justify-center"
          } divide-y divide-slate-700 rounded-md border border-slate-700 bg-slate-800 shadow-md`}
        >
          {players.length > 0 ? (
            players.map((player) => (
              <Player
                key={`player-${player.replace(/\s+/g, "-")}`}
                player={player}
                remove={createRemovePlayer(player)}
                edit={createEditPlayer(player)}
              />
            ))
          ) : (
            <p className="text-sm text-slate-400">No players added yet.</p>
          )}
        </div>
      </div>
    </Fragment>
  );
});
