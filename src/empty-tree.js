/* jshint node:true */
var quickTemp = require('quick-temp');

function EmptyTree() {}

EmptyTree.prototype.read = function() {
  return quickTemp.makeOrReuse(this, 'emptyTree');
};

EmptyTree.prototype.cleanup = function() {
  quickTemp.remove(this, 'tmpCacheDir');
};

module.exports = EmptyTree;
