import { useCallback } from "react";
import { useSecretSantaCtx } from "@/context";
import { Player } from "./Player";
import { SingleInputWithButton } from "../common/SingleInputWithButton";

export const Players = () => {
  const {
    state: { players },
    dispatch,
  } = useSecretSantaCtx();

  const addPlayer = useCallback(
    (player: string) => {
      dispatch({ type: "add_player", payload: player });
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
      <SingleInputWithButton
        propagate={addPlayer}
        buttonLabel="Add"
        placeholder="Enter player name"
      />
      <ul className="mt-4">
        {players.map((player, index) => (
          <Player
            key={index}
            player={player}
            remove={createRemovePlayer(player)}
          />
        ))}
      </ul>
    </div>
  );
};
