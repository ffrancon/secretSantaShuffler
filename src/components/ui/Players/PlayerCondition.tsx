import { useSecretSantaCtx } from "@/app/context";
import { Fragment, memo, useMemo } from "react";
import { Dialog } from "../common/Dialog";
import { Button } from "../common/Button";
import { Select } from "../common/Select";

type Props = {
  player: string;
  isOpen: boolean;
  close: () => void;
};

export const PlayerConditionDialog = memo<Props>(
  ({ player, isOpen, close }) => {
    const {
      state: { players, excludedPairs },
      dispatch,
    } = useSecretSantaCtx();

    const { excludedPair, excludedPlayer } = useMemo(() => {
      const foundPair = excludedPairs.find((pair) => pair.includes(player));

      if (!foundPair) return { excludedPair: null, excludedPlayer: null };

      return {
        excludedPair: foundPair,
        excludedPlayer: foundPair[0] === player ? foundPair[1] : foundPair[0],
      };
    }, [excludedPairs, player]);

    const setExcludedPair = (pickedPlayer: string) => {
      if (pickedPlayer === null || !excludedPair?.includes(pickedPlayer)) {
        dispatch({
          type: "set_excluded_pair",
          payload: [player, pickedPlayer],
        });
      }
    };

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const excludedPlayer = e.target.value;
      setExcludedPair(excludedPlayer);
    };

    const clearExcludedPair = () => {
      dispatch({
        type: "remove_excluded_pair",
        payload: excludedPair,
      });
    };

    return (
      <Dialog isOpen={isOpen} close={close} title="Set condition">
        <Fragment>
          <p className="text-sm text-slate-400">
            Select who should not be paired with {player}.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Select onChange={onSelectChange} value={excludedPlayer || ""}>
              <option value="">Select a player</option>
              {players
                .filter((p) => p !== player)
                .map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
            </Select>
            <Button
              variant="destructive"
              onClick={clearExcludedPair}
              disabled={!excludedPair}
            >
              Clear condition
            </Button>
          </div>
        </Fragment>
      </Dialog>
    );
  },
);
