import { useSecretSantaCtx } from "@/app/context";
import { Fragment, memo, useMemo } from "react";
import { Dialog } from "../common/Dialog";
import { Button } from "../common/Button";

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

    const addExcludedPair = (excludedPlayer: string) => {
      if (excludedPlayer && excludedPair?.includes(excludedPlayer))
        dispatch({
          type: "add_excluded_pair",
          payload: [player, excludedPlayer],
        });
    };

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const excludedPlayer = e.target.value;
      addExcludedPair(excludedPlayer);
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
            Select who should not be paired with {player}
          </p>
          <select onChange={onSelectChange} value={excludedPlayer || ""}>
            <option value="">-- Select a player --</option>
            {players
              .filter((p) => p !== player)
              .map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
          </select>
          <Button
            variant="destructive"
            className="mt-4"
            onClick={clearExcludedPair}
            disabled={!excludedPair}
          >
            Clear condition
          </Button>
        </Fragment>
      </Dialog>
    );
  },
);
