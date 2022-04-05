export function extractExpectedParams([beg, end]) {
  const matcher = new RegExp(`${beg}(.*?)${end}`, "gm");
  const normalise = (str) => str.slice(beg.length, end.length * -1);
  return function (str) {
    return new Promise((resolve, _) => {
      const result = str.match(matcher).map(normalise);

      resolve(result);
    });
  };
}
