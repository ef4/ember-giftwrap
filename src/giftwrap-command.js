/* jshint node:true */

var chalk = require('chalk');
var Builder = require('ember-cli/lib/models/builder');
var path = require('path');

module.exports = {
  name: 'giftwrap',
  description: 'Package up all the installed Ember addons for standalone use.',
  works: 'insideProject',

  availableOptions: [
    { name: 'environment', type: String, default: 'development', aliases: ['e',{'dev' : 'development'}, {'prod' : 'production'}] },
    { name: 'output-path', type: path, default: 'wrapped/', aliases: ['o'] }
  ],

  run: function(options) {
    var ui = this.ui;
    ui.startProgress(chalk.green('Building'), chalk.green('.'));

    var builder = new Builder({
      ui: ui,
      outputPath: options.outputPath,
      environment: options.environment,
      project: this.project,
      tree: require('./pipeline')
    });

    return builder.build().finally(function() {
      ui.stopProgress();
      return builder.cleanup();
    }).then(function() {
      ui.writeLine(chalk.green("Successfully packaged your addons in ./wrapped"));
    }).catch(function(err) {
        ui.writeLine(chalk.red('Build failed.'));
        ui.writeError(err);

        return 1;
    });
  }
};
