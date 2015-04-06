/* jshint node: true */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

function StubAddon(options) {
  EmberAddon.call(this, options);
}
StubAddon.prototype = Object.create(EmberAddon.prototype);
StubAddon.prototype.constructor = StubAddon;

// We don't want any of the default legacy files. But we *do* want to
// let addons stick their own imports into the legacyFilesToAppend
// list.
StubAddon.prototype.populateLegacyFiles = function() {};

module.exports = StubAddon;
