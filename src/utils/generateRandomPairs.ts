const randomizeArray = <T>(
  array: Array<T>,
  forbiddenConsecutiveEntries: Array<[T, T]>,
  attempts = 0,
): Array<T> => {
  const result = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  // Ensure no forbidden consecutive entries
  for (const [a, b] of forbiddenConsecutiveEntries) {
    const indexA = result.indexOf(a);
    const indexB = result.indexOf(b);
    if (
      indexA !== -1 &&
      indexB !== -1 &&
      (Math.abs(indexA - indexB) === 1 ||
        Math.abs(indexA - indexB) === result.length - 1) && // Check for circular adjacency
      attempts < 10 // Limit to 10 attempts to avoid infinite recursion
    ) {
      // If the forbidden pair is found, re-randomize the array
      return randomizeArray(array, forbiddenConsecutiveEntries, attempts + 1);
    }
  }

  return result;
};

export const generateRandomPairs = <T>(
  items: T[],
  forbiddenConsecutiveEntries: Array<[T, T]>,
): Array<[T, T]> => {
  if (items.length < 2) {
    throw new Error("At least two items are required to generate pairs.");
  }

  const randomized = randomizeArray(items, forbiddenConsecutiveEntries);
  const end = randomized.length - 1;

  // Circular pairing
  return randomized.map((item, index) => {
    const next = index === end ? randomized[0] : randomized[index + 1];
    return [item, next] as [T, T];
  });
};
