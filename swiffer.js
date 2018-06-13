#!/usr/bin/env node

const fs = require('fs');
const { JSDOM } = require('jsdom');

let file = fs.readFileSync(__dirname + '/' + process.argv[2]).toString('utf8');
let jsdom = new JSDOM(file);

const { window } = jsdom;

[].slice
  .call(window.document.querySelectorAll('style, link[rel=stylesheet]'))
  .forEach(stylesheet => {
    stylesheet.sheet.cssRules.forEach(rule => {
      if (!window.document.querySelector(rule.selectorText)) {
        console.log(rule.selectorText + ' is not in use.');
      }
    });
  });
