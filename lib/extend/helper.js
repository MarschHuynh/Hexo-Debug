'use strict';
var chalk = require('chalk')

function Helper() {
  console.log(chalk.red(__filename),chalk.yellow(">> New Helper Object"));
  this.store = {};
}

Helper.prototype.list = function() {
  return this.store;
};

Helper.prototype.get = function(name) {
	console.log(chalk.red(__filename),chalk.yellow(">> Get Helper Object"),chalk.green(name));
  return this.store[name];
};

Helper.prototype.register = function(name, fn) {
	console.log(chalk.red(__filename),chalk.yellow(">> Register Helper Object"),chalk.green(name));
	
  if (!name) throw new TypeError('name is required');
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');

  this.store[name] = fn;
};

module.exports = Helper;
