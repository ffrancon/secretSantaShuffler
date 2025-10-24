import { useState } from "react";
import { InputWithButtons } from "../common/InputWithButtons";
import { Button } from "../common/Button";
import { EditIcon, Trash2Icon } from "lucide-react";

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
    <div className="flex justify-between items-center my-2 p-2 border border-slate-500 rounded">
      {mode === "view" ? (
        <div className="flex justify-between items-center w-full">
          <p>{player}</p>
          <div className="flex gap-2">
            <Button onClick={createSetMode("edit")}>
              <EditIcon size={17} />
            </Button>
            <Button variant="destructive" onClick={remove}>
              <Trash2Icon size={17} />
            </Button>
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
