'use strict';

var Promise = require('bluebird');
var chalk = require('chalk');

function Deployer() {
  console.log(chalk.red(__filename),chalk.yellow(">> New Deployer Object"));
  this.store = {};
}

Deployer.prototype.list = function() {
  return this.store;
};

Deployer.prototype.get = function(name) {
  console.log(chalk.red(__filename),chalk.yellow(">> Get Deployer Object"),chalk.green(name));
  return this.store[name];
};

Deployer.prototype.register = function(name, fn) {
  console.log(chalk.red(__filename),chalk.yellow(">> Register Deployer Object"),chalk.green(name));
  if (!name) throw new TypeError('name is required');
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');

  if (fn.length > 1) {
    fn = Promise.promisify(fn);
  } else {
    fn = Promise.method(fn);
  }

  this.store[name] = fn;
};

module.exports = Deployer;
