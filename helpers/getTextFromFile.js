const fs = require('fs');

function getTextFromFile(pathFile) {
  const textFile = fs.readFileSync(pathFile, 'utf-8');
  // console.log(textFile);
  return textFile;
}
// const text =
//   "/Users/linnvazquez/repositories/CDMX010-md-links/ejem1/ejem2/message.md";
// console.log(getTextFromFile(text));

module.exports = getTextFromFile;
