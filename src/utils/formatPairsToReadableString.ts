import type { Pairs } from "@/types/state";

export const formatPairsToReadableString = (pairs: Pairs): string => {
  return pairs.reduce(
    (str, [giver, receiver], index) =>
      str +
      `${giver} --🎁-> ${receiver}` +
      (index === pairs.length - 1 ? "" : "\n"),
    "",
  );
};
