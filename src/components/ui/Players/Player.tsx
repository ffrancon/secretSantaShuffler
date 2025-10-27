import { memo, useState } from "react";
import { InputWithButtons } from "@/components/ui/common/InputWithButtons";
import { Button } from "@/components/ui/common/Button";
import { CheckIcon, EditIcon, Trash2Icon, XIcon } from "lucide-react";

type Props = {
  player: string;
  remove: () => void;
  edit: (player: string) => void;
};

export const Player = memo<Props>(({ player, remove, edit }) => {
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
    <li className="flex items-center justify-between px-3 py-2">
      {mode === "view" ? (
        <div className={`flex w-full items-center justify-between`}>
          <p>{player}</p>
          <div className="flex gap-2">
            <Button onClick={createSetMode("edit")} aria-label="Edit player">
              <EditIcon size={16} />
            </Button>
            <Button
              variant="destructive"
              onClick={remove}
              aria-label="Remove player"
            >
              <Trash2Icon size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <InputWithButtons
          initialValue={player}
          propagate={onEdit}
          cancel={createSetMode("view")}
          confirmButtonLabel={<CheckIcon size={16} />}
          confirmButtonAriaLabel="Confirm edit"
          cancelButtonLabel={<XIcon size={16} />}
          cancelButtonAriaLabel="Cancel edit"
          autoFocus
          aria-label="Edit player input"
        />
      )}
    </li>
  );
});
