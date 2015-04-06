/* jshint node: true */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

function StubApp(options) {
  EmberApp.call(this, options);
}
StubApp.prototype = Object.create(EmberApp.prototype);
StubApp.prototype.constructor = StubApp;

// We don't want any of the default legacy files. But we *do* want to
// let addons stick their own imports into the legacyFilesToAppend
// list.
StubApp.prototype.populateLegacyFiles = function() {};

module.exports = StubApp;
