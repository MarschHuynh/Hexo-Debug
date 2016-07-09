'use strict';

var Box = require('../box');
var util = require('util');
var chalk = require('chalk');

function Source(ctx) {
  console.log(chalk.red(__filename),chalk.yellow(">> New Source Objects"));

  Box.call(this, ctx, ctx.source_dir);

  this.processors = ctx.extend.processor.list();
}

util.inherits(Source, Box);

module.exports = Source;
