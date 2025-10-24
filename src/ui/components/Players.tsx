import { useSecretSantaCtx } from "@/context";
import { useState } from "react";
import { Player } from "./Player";

export const Players = () => {
  const {
    state: { players },
    dispatch,
  } = useSecretSantaCtx();

  const [value, setValue] = useState("");

  const createRemovePlayer = (player: string) => () => {
    dispatch({ type: "remove_player", payload: player });
  };

  return (
    <div className="w-[400px] mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-10 border border-gray-300 rounded px-2 py-1"
          placeholder="Add player name"
        />
        <button
          onClick={() => {
            dispatch({ type: "add_player", payload: value });
            setValue("");
          }}
          className="h-10 bg-blue-500 text-white px-4 py-1 rounded shrink-0"
        >
          Add Player
        </button>
      </div>
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
