'use strict';
var chalk = require('chalk');

function pageGenerator(locals) {
  console.log(chalk.red(__filename),chalk.yellow(">> Page Generator"));
  return locals.pages.map(function(page) {
    var layout = page.layout;
    var path = page.path;

    if (!layout || layout === 'false' || layout === 'off') {
      return {
        path: path,
        data: page.content
      };
    }

    var layouts = ['page', 'post', 'index'];
    if (layout !== 'page') layouts.unshift(layout);

    page.__page = true;

    return {
      path: path,
      layout: layouts,
      data: page
    };
  });
}

module.exports = pageGenerator;
