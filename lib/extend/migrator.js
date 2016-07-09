'use strict';

var Promise = require('bluebird');
var chalk = require('chalk')

function Migrator() {
  console.log(chalk.red(__filename),chalk.yellow(">> Register Migrator Object"));
  this.store = {};
}

Migrator.prototype.list = function() {
  return this.store;
};

Migrator.prototype.get = function(name) {
  console.log(chalk.red(__filename),chalk.yellow(">> Get Migrator Object"),chalk.green(name));
  return this.store[name];
};

Migrator.prototype.register = function(name, fn) {
  console.log(chalk.red(__filename),chalk.yellow(">> Register Migrator Object"),chalk.green(name));
  if (!name) throw new TypeError('name is required');
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');

  if (fn.length > 1) {
    fn = Promise.promisify(fn);
  } else {
    fn = Promise.method(fn);
  }

  this.store[name] = fn;
};

module.exports = Migrator;
