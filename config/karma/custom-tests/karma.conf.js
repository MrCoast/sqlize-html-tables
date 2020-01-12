const path = require('path');
const glob = require('glob');
const { TESTS_PATH } = require('../../sharedPaths.js');
const baseKarmaConfigGenerator = require('../baseKarmaConfig.js');

function showUsageAndExit() {
    global.console.log('You must specify "filter" argument with regexp which matches files you want to test.');
    global.console.log('For example: grunt karma:custom --filter=mymodule');
    global.console.log('If you want to run all test use "grunt karma:all" command instead.');
    global.console.log('Aborting.');
    process.exit(1);
}

module.exports = function (config) {
    var filterRegexpString = config.client.filterRegexp;
    if (!filterRegexpString) {
        showUsageAndExit();
    }

    const filterRegexp = new RegExp(filterRegexpString, 'i');
    const testFilesGlob = path.resolve(TESTS_PATH, 'spec', '**/*.js');
    const matchingTestFiles = glob.sync(testFilesGlob).filter((path) => filterRegexp.test(path));

    const baseKarmaConfig = baseKarmaConfigGenerator(config);
    baseKarmaConfig.files = baseKarmaConfig.files.concat(matchingTestFiles);
    baseKarmaConfig.preprocessors[testFilesGlob] = ['webpack', 'sourcemap'];

    config.set(baseKarmaConfig);
};
