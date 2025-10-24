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
    [dispatch, players]
  );

  const createEditPlayer = useCallback(
    (current: string) => (newPlayer: string) => {
      dispatch({
        type: "edit_player",
        payload: { current, new: newPlayer },
      });
    },
    [dispatch]
  );

  const createRemovePlayer = useCallback(
    (player: string) => () => {
      dispatch({ type: "remove_player", payload: player });
    },
    [dispatch]
  );

  return (
    <div className="w-[400px] mx-auto">
      <InputWithButtons
        propagate={addPlayer}
        confirmButtonLabel="Add"
        placeholder="Enter player name"
        clearAfterConfirm
      />
      <ul className="mt-4">
        {players.map((player, index) => (
          <Player
            key={index}
            player={player}
            remove={createRemovePlayer(player)}
            edit={createEditPlayer(player)}
          />
        ))}
      </ul>
    </div>
  );
};
