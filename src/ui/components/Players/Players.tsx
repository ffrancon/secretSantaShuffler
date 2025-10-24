import { useCallback } from "react";
import { useSecretSantaCtx } from "@/context";
import { Player } from "./Player";
import { InputWithButtons } from "../common/InputWithButtons";

export const Players = () => {
  const {
    state: { players },
    dispatch,
  } = useSecretSantaCtx();

  const addPlayer = useCallback(
    (player: string) => {
      if (players.includes(player)) return;
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
        />
      </div>
      <div
        className={`mt-3 flex min-h-[200px] flex-col ${
          players.length > 0 ? "" : "items-center justify-center"
        } divide-y divide-slate-700 rounded-md border border-slate-700 bg-slate-800 shadow-md`}
      >
        {players.length > 0 ? (
          players.map((player, index) => (
            <Player
              key={index}
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
};
