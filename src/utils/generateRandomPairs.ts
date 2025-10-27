const randomizeArray = <T>(array: Array<T>): Array<T> => {
  const r = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }

  return r;
};

export const generateRandomPairs = <T>(items: T[]): Array<[T, T]> => {
  if (items.length < 2) {
    throw new Error("At least two items are required to generate pairs.");
  }

  const randomized = randomizeArray(items);
  const end = randomized.length - 1;

  return randomized.map((item, index) => {
    const next = index === end ? randomized[0] : randomized[index + 1];
    return [item, next] as [T, T];
  });
};
