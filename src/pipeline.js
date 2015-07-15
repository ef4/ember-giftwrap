/* jshint node: true */
var path = require('path');
var stew = require('broccoli-stew');
var merge  = require('broccoli-merge-trees');
var concat = require('broccoli-sourcemap-concat');
var derequire = require('broccoli-derequire');
var StubApp = require('./stub-app');
var EmptyTree = require('./empty-tree');

var app = new StubApp({
  name: 'giftwrap',
  tests: false,
  trees: {
    app: new EmptyTree(),
    // I'm creating these empty files because badly behaved
    // preprocessors explode if they aren't present, even though we
    // aren't going to use them.
    styles: new EmptyTree(['app.css', 'app.scss']),
    templates: new EmptyTree(),
    public: new EmptyTree()
  }
});

var internal = stew.mv(path.join(__dirname, '..', 'lib'), 'giftwrap');

var js = concat(merge([app.appAndDependencies(), internal]), {
  header: '(function(){',
  headerFiles: [
    app.bowerDirectory + '/loader.js/loader.js']
    .concat(app.legacyFilesToAppend)
    .concat(['vendor/addons.js']),
  inputFiles: ['giftwrap/**/*.js'],
  outputFile: 'addons.js',
  footer: "window.GiftWrap = require('giftwrap-internal/container-injector');})();",
  description: 'Concat: giftwrap js'
});

var styles = stew.find(app.styles(), 'assets/vendor.css');
styles = stew.rename(styles, 'assets/vendor.css', 'addons.css');

module.exports = derequire(merge([styles, js]));
