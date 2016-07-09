 'use strict';

var pathFn = require('path');
var util = require('util');
var Box = require('../box');
var View = require('./view');
var I18n = require('hexo-i18n');
var _ = require('lodash');
var chalk = require('chalk');

function Theme(ctx) {
  console.log(chalk.red(__filename),chalk.yellow(">> New Theme Objects"));

  Box.call(this, ctx, ctx.theme_dir);

  this.config = {};

  this.views = {};

  this.processors = [
    require('./processors/config'),
    require('./processors/i18n'),
    require('./processors/source'),
    require('./processors/view')
  ];

  var languages = ctx.config.language;

  if (!Array.isArray(languages)) {
    languages = [languages];
  }

  languages.push('default');

  this.i18n = new I18n({
    languages: _(languages).compact().uniq().value()
  });

  var _View = this.View = function(path, data) {
    View.call(this, path, data);
  };

  util.inherits(_View, View);

  _View.prototype._theme = this;
  _View.prototype._render = ctx.render;
  _View.prototype._helper = ctx.extend.helper;
}

util.inherits(Theme, Box);

Theme.prototype.getView = function(path) {
  console.log(chalk.red(__filename),chalk.yellow(">> Get Theme View Objects"),chalk.green(path));

  // Replace backslashes on Windows
  path = path.replace(/\\/g, '/');
  var extname = pathFn.extname(path);
  var name = path.substring(0, path.length - extname.length);
  var views = this.views[name];

  if (!views) return;

  if (extname) {
    return views[extname];
  }

  return views[Object.keys(views)[0]];
};

Theme.prototype.setView = function(path, data) {
  console.log(chalk.red(__filename),chalk.yellow(">> Set Theme View Objects"),chalk.green(path));
  var extname = pathFn.extname(path);
  var name = path.substring(0, path.length - extname.length);
  var views = this.views[name] = this.views[name] || {};

  views[extname] = new this.View(path, data);
};

Theme.prototype.removeView = function(path) {
  console.log(chalk.red(__filename),chalk.yellow(">> Remove Theme View Objects"),chalk.green(path));
  var extname = pathFn.extname(path);
  var name = path.substring(0, path.length - extname.length);
  var views = this.views[name];

  if (!views) return;

  delete views[extname];
};

module.exports = Theme;
