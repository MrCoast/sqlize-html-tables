'use strict';

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const { SOURCE_PATH, DIST_PATH } = require('../../sharedPaths.js');
const sharedBlocks = require('../sharedBlocks.js');

module.exports = merge([
    sharedBlocks.sourceMaps('source-map'),
    sharedBlocks.resolveAliases(),
    {
        entry: [path.resolve(SOURCE_PATH, 'bootstrap', 'vendors.js')],
        output: {
            path: DIST_PATH,
            filename: 'vendors.js',
            library: 'vendors',
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.resolve(DIST_PATH, 'vendors-manifest.json'),
                name: 'vendors',
                context: SOURCE_PATH,
            }),
        ],
    },
]);
