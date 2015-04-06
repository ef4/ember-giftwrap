/* jshint node: true */
var stew = require('broccoli-stew');
var merge  = require('broccoli-merge-trees');
var concat = require('broccoli-sourcemap-concat');
var StubAddon = require('./src/stub-addon');

var app = new StubAddon({
  name: 'giftwrap',
  tests: false
});

var internal = stew.mv('lib', 'giftwrap');

var js = concat(merge([app.appAndDependencies(), internal]), {
  header: '(function(){',
  headerFiles: [
    app.bowerDirectory + '/loader.js/loader.js']
    .concat(app.legacyFilesToAppend)
    .concat(['vendor/addons.js']),
  inputFiles: ['giftwrap/**/*.js'],
  outputFile: 'giftwrapped-addons.js',
  footer: "window.GiftWrap = require('giftwrap-internal/container-injector');})();",
  description: 'Concat: giftwrap js'
});

var styles = stew.find(app.styles(), 'assets/vendor.css');
styles = stew.rename(styles, 'assets/vendor.css', 'giftwrapped-addons.css');

module.exports = merge([styles, js, 'tests/dummy/public']);
