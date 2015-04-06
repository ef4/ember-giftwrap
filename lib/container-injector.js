/* global requirejs, require, define */
define('giftwrap-internal/container-injector', ['exports'], function (exports) {
  if (window.Ember) {
    define('ember', ['exports'], function(exports) {
      exports.default = window.Ember;
    });
  }
  exports.install = function(app) {
    for (var moduleName in requirejs.entries) {
      var m = /giftwrap\/([^\/]+)s\/(.*)/.exec(moduleName);
      if (m) {
        var type = m[1];
        var name = m[2];
        app.register(type + ":" + name, require(moduleName).default);
        app.register(type + ":" + require('ember')['default'].String.camelize(name), require(moduleName).default);
      }
    }
  };
  exports.require = require;
  exports.define = require;
  exports.env = require('giftwrap/config/environment').default;
});
define('giftwrap/config/environment', ['exports'], function (exports) {
  exports.default = {};
});
