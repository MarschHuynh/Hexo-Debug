'use strict';

var Promise = require('bluebird');
var chalk = require('chalk');

var typeAlias = {
  pre: 'before_post_render',
  post: 'after_post_render'
};

function Filter() {
  console.log(chalk.red(__filename),chalk.yellow(">> New Filter Object"));
  this.store = {};
}

Filter.prototype.list = function(type) {
  if (!type) return this.store;
  return this.store[type] || [];
};

Filter.prototype.register = function(type, fn, priority) {
  console.log(chalk.red(__filename),chalk.yellow(">> Register Filter Object"),chalk.green(type));
  if (!priority) {
    if (typeof type === 'function') {
      priority = fn;
      fn = type;
      type = 'after_post_render';
    }
  }

  if (typeof fn !== 'function') throw new TypeError('fn must be a function');

  type = typeAlias[type] || type;
  priority = priority == null ? 10 : priority;

  var store = this.store[type] = this.store[type] || [];

  fn.priority = priority;
  store.push(fn);

  store.sort(function(a, b) {
    return a.priority - b.priority;
  });
};

Filter.prototype.unregister = function(type, fn) {
  console.log(chalk.red(__filename),chalk.yellow(">> UnRegister Filter Object"),chalk.green(type));
  if (!type) throw new TypeError('type is required');
  if (typeof fn !== 'function') throw new TypeError('fn must be a function');

  var list = this.list(type);
  if (!list || !list.length) return;

  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i] === fn) {
      list.splice(i, 1);
      break;
    }
  }
};

Filter.prototype.exec = function(type, data, options) {
  console.log(chalk.red(__filename),chalk.yellow(">> Exec Filter Object"),chalk.green(type));
  options = options || {};

  var filters = this.list(type);
  var ctx = options.context;
  var args = options.args || [];
  
  args.unshift(data);

  return Promise.each(filters, function(filter) {
    return Promise.method(filter).apply(ctx, args).then(function(result) {
      args[0] = result == null ? data : result;

      return args[0];
    });
  }).then(function() {
    
    return args[0];
  });
};

Filter.prototype.execSync = function(type, data, options) {
  console.log(chalk.red(__filename),chalk.yellow(">> ExecSync Filter Object"),chalk.green(type));
  options = options || {};

  var filters = this.list(type);
  var ctx = options.context;
  var args = options.args || [];
  var result;

  args.unshift(data);

  for (var i = 0, len = filters.length; i < len; i++) {
    result = filters[i].apply(ctx, args);
    args[0] = result == null ? data : result;
  }

  return args[0];
};

module.exports = Filter;
