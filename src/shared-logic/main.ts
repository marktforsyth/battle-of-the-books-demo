const chooseRandom = <T>(collection: T[]): T =>
  collection[Math.floor(Math.random() * collection.length)];

const indices = <T>(collection: T[]): number[] =>
  collection.map((_item: T, i: number) => i);

const last = <T>(collection: T[]): T => collection[collection.length - 1];

const check = <T>(condition: boolean, result: T, alternative: T): T => {
  if (condition) {
    return result;
  }

  return alternative;
};

export { chooseRandom, indices, last, check };
