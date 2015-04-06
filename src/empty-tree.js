/* jshint node:true */
var quickTemp = require('quick-temp');
var fs = require('fs');
var path = require('path');

function EmptyTree(names) {
  this.names = names || [];
}

EmptyTree.prototype.read = function() {
  var dir = quickTemp.makeOrReuse(this, 'emptyTree');
  this.names.forEach(function(name) {
    fs.writeFileSync(path.join(dir, name), '');
  });
  return dir;
};

EmptyTree.prototype.cleanup = function() {
  quickTemp.remove(this, 'tmpCacheDir');
};

module.exports = EmptyTree;
