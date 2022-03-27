export function validateMailParams(data, expectedParams) {
  const isContainedAll = expectedParams.every((element) => {
    return data.includes(element);
  });

  if (isContainedAll) {
    return true;
  }
  return false;
}
