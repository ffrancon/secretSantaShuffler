import { memo, useCallback } from "react";
import { useSecretSantaCtx } from "@/context";
import { Player } from "./Player";
import { InputWithButtons } from "@/components/ui/common/InputWithButtons";

export const Players = memo(() => {
  const {
    state: { players },
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

  return (
    <div className="mx-auto w-full">
      <div className="rounded-md border border-slate-700 bg-slate-800 px-3 py-4 shadow-md">
        <InputWithButtons
          propagate={addPlayer}
          confirmButtonLabel="Add player"
          placeholder="Enter player name"
          clearAfterConfirm
          aria-label="Add player input"
        />
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
  );
});
