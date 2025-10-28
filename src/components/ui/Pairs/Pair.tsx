import { formatPairToReadableString } from "@/utils/formatPairsToReadableString";
import { memo, useMemo } from "react";
import { CopyToClipboardButton } from "../common/CopyToClipboardButton";

type Props = {
  pair: [string, string];
};

export const Pair = memo<Props>(({ pair }) => {
  const toCopy = useMemo(() => formatPairToReadableString(pair), [pair]);

  return (
    <li className="flex items-center justify-between p-2">
      <p>
        <span className="font-semibold">{pair[0]}</span>
        {" gives "}
        <span className="font-semibold">{pair[1]}</span>
        {" a 🎁"}
      </p>
      <CopyToClipboardButton content={toCopy} variant="ghost" />
    </li>
  );
});
