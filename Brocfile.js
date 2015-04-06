/* jshint node: true */

var merge = require('broccoli-merge-trees');
var pipeline = require('./src/pipeline');
module.exports = merge([pipeline, 'tests/dummy/public']);
