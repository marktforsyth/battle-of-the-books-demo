const check = <T>(condition: boolean, result: T, alternative: T): T => {
  if (condition) {
    return result;
  }

  return alternative;
};

const match = <TIn, TOut>(
  subject: TIn,
  scenarios: [TIn, TOut][],
  base: TOut,
): TOut => {
  for (const scenario of scenarios) {
    if (subject === scenario[0]) {
      return scenario[1];
    }
  }

  return base;
};

export { check, match };
