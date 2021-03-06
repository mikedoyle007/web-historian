var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(exports.paths.list, 'utf8', (err, res) => {
      if (err) {
        reject(err);
      } else {
        let listOfUrls = res.split('\n');
        callback(listOfUrls);
        resolve(listOfUrls);
      }
    });
  });
};

exports.isUrlInList = function(url, callback) {
  return new Promise(exports.readListOfUrls)
    .then((urls) => {
      callback(urls.indexOf(url) > -1);
    });
};

exports.addUrlToList = function(url, callback) {
  return new Promise((resolve, reject) => {
    fs.appendFile(exports.paths.list, url + '\n', 'utf8', (err, res) => {
      if (err) {
        reject(err);
      } else {
        callback(err, res);
        resolve(res);
      }
    });
  });
};

exports.isUrlArchived = function(url, callback) {
  return new Promise((resolve, reject) => {
    fs.readdir(exports.paths.archivedSites, 'utf8', (err, files) => {
      if (err) {
        reject(err);
      } else {
        if (files.indexOf(url) > -1) {
          callback(true);
          resolve(true);
        } else {
          callback(false);
          resolve(false);
        }
      } 
    });
  });
};

exports.downloadUrls = function(urls) {
};
  
