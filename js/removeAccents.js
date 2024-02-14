function removeAccents(str) {
  // Replace accented characters
  const accentedCharsMap = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
    n: /\xF1/g
  };

  for (let char in accentedCharsMap) {
    const regex = accentedCharsMap[char];
    str = str.replace(regex, char);
  }

  // Replace special characters
  str = str.replace(/[^a-zA-Z0-9]/g, ' ');

  return str;
}
