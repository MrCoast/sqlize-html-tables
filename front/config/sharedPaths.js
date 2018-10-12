'use strict';

const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..');
const SOURCE_PATH = path.resolve(ROOT_PATH, 'src');
const CONFIG_PATH = path.resolve(ROOT_PATH, 'config');
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const BOOTSTRAP_FILES_PATH = path.resolve(SOURCE_PATH, 'bootstrap');
const SASS_PATH = path.resolve(ROOT_PATH, 'scss');
const TYPINGS_PATH = path.resolve(ROOT_PATH, 'typings');

module.exports = {
    ROOT_PATH,
    SOURCE_PATH,
    CONFIG_PATH,
    NODE_MODULES_PATH,
    DIST_PATH,
    BOOTSTRAP_FILES_PATH,
    SASS_PATH,
    TYPINGS_PATH,
};
