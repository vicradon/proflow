const range = (rawStart, rawStop, rawStep = 1) => {
  const start = Number(rawStart);
  const stop = Number(rawStop);
  const step = Number(rawStep);

  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
};
export default range;
