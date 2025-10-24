import { useState } from "react";
import { SingleInputWithButton } from "../common/SingleInputWithButton";

export const Player = ({
  player,
  remove,
  edit,
}: {
  player: string;
  remove: () => void;
  edit: (player: string) => void;
}) => {
  const [mode, setMode] = useState<"view" | "edit">("view");

  const createSetMode = (mode: "view" | "edit") => () => {
    setMode(mode);
  };

  const onEdit = (newPlayer: string) => {
    edit(newPlayer);
    setMode("view");
  };

  return (
    <div className="flex justify-between items-center my-2 p-2 border border-gray-300 rounded">
      {mode === "view" ? (
        <div className="flex justify-between items-center w-full">
          <p>{player}</p>
          <div className="flex gap-2">
            <button
              role="button"
              onClick={createSetMode("edit")}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              role="button"
              onClick={remove}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <SingleInputWithButton initialValue={player} propagate={onEdit} />
          <button
            role="button"
            onClick={createSetMode("view")}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
