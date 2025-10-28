import { memo, useState } from "react";
import { InputWithButtons } from "@/components/ui/common/InputWithButtons";
import { Button } from "@/components/ui/common/Button";
import { CheckIcon, EllipsisVertical, XIcon } from "lucide-react";
import { DropdownButton } from "../common/DropdownButton";

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
    <li className="flex items-center justify-between py-2 pr-1 pl-3">
      {mode === "view" ? (
        <div className={`flex w-full items-center justify-between`}>
          <p>{player}</p>
          <DropdownButton
            buttonProps={{
              variant: "ghost",
              children: <EllipsisVertical size={16} />,
              "aria-label": "Player options",
            }}
          >
            <div className="flex flex-col gap-2 rounded border border-slate-700 bg-slate-800 p-2 shadow-md transition-all duration-150">
              <Button onClick={createSetMode("edit")} variant="ghost">
                Edit player
              </Button>
              <Button variant="destructive" onClick={remove}>
                Remove player
              </Button>
            </div>
          </DropdownButton>
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
