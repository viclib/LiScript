// Simple command line interface
// Example Usage:
// cat yourfile.lisp | node licompiler.js > yourfile.js   #compile and save
// cat yourfile.lisp | node licompiler.js | node -p       #compile and run
(function () {
  'use strict';

  var fs, LiScript, beautify, inputText;

  fs = require('fs');
  LiScript = require('./liscript');

  inputText = '';

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (chunk) {
    inputText += chunk;
  });

  process.stdin.on('end', function () {
    console.log(LiScript.compile(inputText));
    inputText = '';
  });

}());