'use strict';

const merge = require('webpack-merge');
const { devConfig, devServerWithSourcemaps } = require('../sharedBlocks.js');

const bundleUrlPrefix = '/';

module.exports = merge([
    devConfig(bundleUrlPrefix),
    devServerWithSourcemaps('0.0.0.0', 3000, bundleUrlPrefix),
]);
