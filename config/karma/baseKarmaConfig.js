const path = require('path');
const webpackConfig = require('../webpack/test/webpack.config.js');
const { TESTS_PATH } = require('../paths.js');

const entrypointPath = path.resolve(TESTS_PATH, 'entrypoint.js');

module.exports = (config) => {
    const karmaConfig = {
        plugins: ['karma-*'],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],

        // list of files / patterns to load in the browser
        files: [
            entrypointPath,
        ],

        preprocessors: {
            [entrypointPath]: ['webpack', 'sourcemap'],
            [path.resolve(TESTS_PATH, '**/*.js')]: ['webpack', 'sourcemap'],
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'minimal',
        },

        reporters: ['progress'],

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        autoWatch: false,
    };

    if (config.client.watch) {
        Object.assign(karmaConfig, {
            singleRun: false,
            autoWatch: true,
        });

        Object.assign(karmaConfig.webpackMiddleware, {
            stats: 'none',
        });
    }

    return karmaConfig;
};
