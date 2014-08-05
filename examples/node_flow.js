'use strict';
/*global console*/

var Thenjs = require('../then.js');
var fs = require('fs');

//TODO: very good pattern
function fileStats(path) {
  return function (callback) {
    fs.stat(path, callback);
  };
}

Thenjs.
  each(['demo.js', '../then.min.js', '../.gitignore'], function (cont, path) {
        //fancy argument.
        fileStats(path)(cont);
  }).
  then(function (cont, result) {
    console.log('Success: ', result);
    //TODO: mean to fail
    fileStats('none.js')(cont);
  }).
  fail(function (cont, error) {
    console.error('A file path error: ', error);
  });
