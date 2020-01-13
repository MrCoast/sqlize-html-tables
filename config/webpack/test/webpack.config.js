'use strict';

const path = require('path');
const merge = require('webpack-merge');
const { basicConfig, sourceMaps } = require('../base.config.js');
const { TESTS_PATH } = require('../../paths.js');

function modeSettings() {
    return {
        mode: 'production',
    };
}

function additionalAliases() {
    return {
        resolve: {
            alias: {
                test: path.resolve(TESTS_PATH),
                fixtures: path.resolve(TESTS_PATH, 'fixtures'),
            },
        },
    };
}

function injectifyLoader() {
    return {
        resolveLoader: {
            alias: {
                inject: 'inject-loader',
            },
        },
    };
}

module.exports = merge([
    sourceMaps('cheap-inline-module-source-map'),
    basicConfig({
        disableTypechecking: true,
        useCache: false,
        useBabelForNodeModules: true,
    }),
    additionalAliases(),
    injectifyLoader(),
    modeSettings(),
]);
