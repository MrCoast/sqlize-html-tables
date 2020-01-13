'use strict';

const path = require('path');
const merge = require('webpack-merge');
const { basicConfig, sassToCss } = require('../base.config.js');
const { DIST_PATH, BOOTSTRAP_FILES_PATH } = require('../../paths.js');

function allEntries() {
    return {
        entry: {
            extension: path.resolve(BOOTSTRAP_FILES_PATH, 'DemoApp.js'),
        },
    };
}

function bundles() {
    return {
        output: {
            path: DIST_PATH,
            filename: '[name].bundle.js',
        },
    };
}

module.exports = merge([
    basicConfig(),
    allEntries(),
    bundles(),
    sassToCss(),
]);
