'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const { basicConfig, sourceMaps } = require('../base.config.js');
const { DIST_PATH, BOOTSTRAP_FILES_PATH, SASS_PATH } = require('../../paths.js');

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
                use: [
                    MiniCssExtractPlugin.loader,
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
            }],
        },
        plugins: [
            new MiniCssExtractPlugin('[name].css'),
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
