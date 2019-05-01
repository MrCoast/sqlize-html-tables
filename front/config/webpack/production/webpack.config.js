'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const { basicConfig, sourceMaps } = require('../sharedBlocks.js');
const { DIST_PATH, BOOTSTRAP_FILES_PATH, SASS_PATH } = require('../../sharedPaths.js');

function allEntries() {
    return {
        entry: [
            path.resolve(BOOTSTRAP_FILES_PATH, 'DemoApp.js'),
        ],
    };
}

function bundles() {
    return {
        output: {
            path: DIST_PATH,
            filename: 'bundle.js',
        },
    };
}

function sassToCss() {
    return {
        module: {
            rules: [{
                test: /\.scss/,
                include: [
                    SASS_PATH,
                ],
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                localIdentName: '[hash:base64:5]',
                                minimize: true,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'collapsed',
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            }],
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
        ],
    };
}

module.exports = merge([
    sourceMaps('source-map'),
    basicConfig(),
    allEntries(),
    bundles(),
    sassToCss(),
]);
