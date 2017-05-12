'use strict';

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

class Hash {
  
  static loadFileContents (filePath) {
    filePath = path.join(__dirname, '..', filePath);

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
          reject(err);
        }
        
        resolve(data);
      });
    });
  }

  static createHashFromFileContents (data) {
    return crypto
        .createHash('sha256')
        .update(data)
        .digest('hex');
  }

  hash (filePath) {
    console.log( "Hashing: ", filePath );
    filePath = filePath.replace( /[A-Z@]*/, '' );
    console.log( "Hashing(really): ", filePath );
    return Hash.loadFileContents(filePath)
        .then(fileData => Hash.createHashFromFileContents(fileData))
        .then(fileHash => {
          let newPath = filePath
              .replace(/\/?client/, '/static')
              .replace(/([^\.]+)\.(.+)/, `$1.${fileHash}.$2`);
          console.log( "newPath: ", newPath );

          newPath = '/static/scripts/app.js';
          
          return newPath;
        });
  }

}

module.exports = Hash;
