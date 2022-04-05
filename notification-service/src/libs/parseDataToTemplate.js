export function parseDataToTemplate([beg, end], data) {
  const matcher = new RegExp(`${beg}(.*?)${end}`, "gm");

  return function (str) {
    const matches = str.match(matcher);
    // console.log(replaceBulk(str, matches, Object.values(data)));
    return replaceBulk(str, matches, Object.values(data));
  };

  function replaceBulk(str, findArray, replaceArray) {
    let i = 0;
    let regex = [],
      map = {};
    for (i = 0; i < findArray.length; i++) {
      regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, "\\$1"));
      map[findArray[i]] = replaceArray[i];
    }
    regex = regex.join("|");
    str = str.replace(new RegExp(regex, "g"), function (matched) {
      return map[matched];
    });
    return str;
  }
}
