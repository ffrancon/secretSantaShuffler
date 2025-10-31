import { CheckIcon, EllipsisVertical, XIcon } from "lucide-react";
import { Fragment, memo, useState } from "react";

import { useSecretSantaCtx } from "@/app/context";
import { useDialogState } from "@/components/hooks/useDialogState";
import { Button } from "@/components/ui/common/Button";
import { InputWithButtons } from "@/components/ui/common/InputWithButtons";

import { DropdownButton } from "../common/DropdownButton";

import { PlayerConditionDialog } from "./PlayerCondition";

type Props = {
  player: string;
  remove: () => void;
  edit: (player: string) => void;
};

export const Player = memo<Props>(({ player, remove, edit }) => {
  const {
    state: { players },
  } = useSecretSantaCtx();
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

  const { isOpen, openDialog, closeDialog } = useDialogState();

  return (
    <Fragment>
      <PlayerConditionDialog
        player={player}
        isOpen={isOpen}
        close={closeDialog}
      />
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
              aria-haspopup="menu"
            >
              <div className="flex flex-col gap-2 rounded border border-slate-700 bg-slate-800 p-2 shadow-md transition-all duration-150">
                <Button
                  onClick={createSetMode("edit")}
                  variant="ghost"
                  className="pl-1 text-left"
                >
                  Edit player
                </Button>
                {players.length > 2 && (
                  <Button
                    onClick={openDialog}
                    variant="ghost"
                    className="pl-1 text-left"
                  >
                    Set condition
                  </Button>
                )}
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
            aria-label="Edit player input"
          />
        )}
      </li>
    </Fragment>
  );
});
