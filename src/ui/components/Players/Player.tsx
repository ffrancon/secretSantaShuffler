import { useState } from "react";
import { InputWithButtons } from "../common/InputWithButtons";

type Props = {
  player: string;
  remove: () => void;
  edit: (player: string) => void;
};

export const Player = ({ player, remove, edit }: Props) => {
  const [mode, setMode] = useState<"view" | "edit">("view");

  const createSetMode = (mode: "view" | "edit") => () => {
    setMode(mode);
  };

  const onEdit = (newPlayer: string) => {
    if (newPlayer !== player) {
      edit(newPlayer);
    }
    setMode("view");
  };

  return (
    <div className="flex justify-between items-center my-2 p-2 border border-gray-300 rounded">
      {mode === "view" ? (
        <div className="flex justify-between items-center w-full">
          <p>{player}</p>
          <div className="flex gap-2">
            <button
              onClick={createSetMode("edit")}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={remove}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <InputWithButtons
          initialValue={player}
          propagate={onEdit}
          cancel={createSetMode("view")}
        />
      )}
    </div>
  );
};
