const _ = require('lodash');
const AdmZip = require('adm-zip');
const fs = require('fs');
const constants = require('./constants');
const Response = require('./response');
const ResponseMessage = require('./response-message');
const htmlExtractor = require('./html-extractor');
const goStealth = require('./go-stealth');
const LaunchBrowser = require('./launch-browser');
const mouseMovements = require('./mouse-movements');
const Helper = require('./helper');

async function getArrayDifference(array1, array2) {
  return _.differenceWith(array1, array2, _.isEqual);
}

const shuffleString = text => {
  const a = text.split('');
  const n = a.length;

  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};

const removeWhiteSpaces = (str) => {
  if (str) {
    return str.replace(/\n|  |\r/g, "");
  }
  return str;
}

const getNumber = (str) => {
  if (str) {
    return str.replace(/^\D+/g, '');
  }
  return str;
}

const timeDiff = (start, end) => {
  var diff = end - start;
  var mm = Math.floor(diff / 1000 / 60);
  return mm;
}

const compressScreenshotFolder = async (srcDir, destFile) => {
  const zip = new AdmZip();
  // add local file
  zip.addLocalFolder(srcDir);
  // write everything to disk. /*target file name*/
  zip.writeZip(destFile);
};

const removeFolder = async filePath => {
  try {
    const deleteFolderRecursive = path => {
      if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
          const curPath = `${path}/${file}`;
          if (fs.lstatSync(curPath).isDirectory()) {
            // recurse
            deleteFolderRecursive(curPath);
          } else {
            // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      }
    };
    deleteFolderRecursive(filePath);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  constants,
  getArrayDifference,
  Response,
  ResponseMessage,
  shuffleString,
  htmlExtractor,
  goStealth,
  LaunchBrowser,
  mouseMovements,
  Helper,
  removeWhiteSpaces,
  getNumber,
  compressScreenshotFolder,
  removeFolder,
  timeDiff
};