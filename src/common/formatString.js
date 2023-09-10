module.exports = formatString = (str, val) => {
  for (let index = 0; index <= val.length; index++) {
    const inxString = index + 1;

    const dRegex = new RegExp("\\{" + inxString + "\\}", "g");

    str = str.replace(dRegex, val[index]);
  }

  return str;
};
