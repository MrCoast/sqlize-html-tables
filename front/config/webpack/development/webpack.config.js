'use strict';

const merge = require('webpack-merge');
const { devConfig, devServerWithSourcemaps } = require('../sharedBlocks.js');

module.exports = merge([
    devConfig(),
    devServerWithSourcemaps('0.0.0.0', 3000, '/'),
]);
