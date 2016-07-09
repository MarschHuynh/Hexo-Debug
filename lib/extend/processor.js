'use strict';

var Promise = require('bluebird');
var Pattern = require('hexo-util').Pattern;
var chalk = require('chalk');

function Processor() {
  console.log(chalk.red(__filename),chalk.yellow(">> New Processor Object"));
  this.store = [];
}

Processor.prototype.list = function() {
  console.log(chalk.red(__filename),chalk.yellow(">> Get List Processor"));
  return this.store;
};

Processor.prototype.register = function(pattern, fn) {
  console.log(chalk.red(__filename),chalk.yellow(">> Register Processor Object"));
  if (!fn) {
    if (typeof pattern === 'function') {
      fn = pattern;
      pattern = /(.*)/;
    } else {
      throw new TypeError('fn must be a function');
    }
  }

  if (fn.length > 1) {
    fn = Promise.promisify(fn);
  } else {
    fn = Promise.method(fn);
  }

  this.store.push({
    pattern: new Pattern(pattern),
    process: fn
  });
};

module.exports = Processor;
