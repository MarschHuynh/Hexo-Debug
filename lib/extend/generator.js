'use strict';

var Promise = require('bluebird');
var chalk = require('chalk');

function Generator() {
  console.log(chalk.red(__filename),chalk.yellow(">> New Generator Object"));
  this.id = 0;
  this.store = {};
}

Generator.prototype.list = function() {
  return this.store;
};

Generator.prototype.get = function(name) {
  console.log(chalk.red(__filename),chalk.yellow(">> Get Generator Object"),chalk.green(name));
  return this.store[name];
};

Generator.prototype.register = function(name, fn) {
  console.log(chalk.red(__filename),chalk.yellow(">> Register Generator Object"),chalk.green(name));
  if (!fn) {
    if (typeof name === 'function') {
      fn = name;
      name = 'generator-' + this.id++;
    } else {
      throw new TypeError('fn must be a function');
    }
  }

  if (fn.length > 1) fn = Promise.promisify(fn);
  this.store[name] = Promise.method(fn);
};

module.exports = Generator;
