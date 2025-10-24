const randomizeArray = <T>(array: Array<T>): Array<T> => {
  const r = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }

  return r;
};

/**
 * Generate a randomized circular mapping of items into pairs.
 *
 * Each item is paired with the next item in a shuffled order; the last
 * item wraps around to pair with the first. The result length equals
 * the input length.
 *
 * @typeParam T - Type of the input items.
 * @param items - Array of items to pair (must contain at least 2 items).
 * @returns Array of tuples [T, T] representing the pairs.
 * @throws Error if fewer than two items are provided.
 */
export const generateRandomPairs = <T>(items: T[]): Array<[T, T]> => {
  if (items.length < 2) {
    throw new Error("At least two items are required to generate pairs.");
  }

  const randomized = randomizeArray(items);
  const end = randomized.length - 1;

  return randomized.map((item, index) => {
    const next = index === end ? randomized[0] : randomized[index + 1];
    return [item, next] satisfies [T, T];
  });
};
