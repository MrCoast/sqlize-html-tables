const path = require('path');
const baseKarmaConfigGenerator = require('../baseKarmaConfig.js');

const requireAllSpecFilesModulePath = path.resolve(__dirname, 'requireAllSpecFiles.js');

module.exports = function (config) {
    const baseKarmaConfig = baseKarmaConfigGenerator(config);

    baseKarmaConfig.files.push(requireAllSpecFilesModulePath);
    baseKarmaConfig.preprocessors[requireAllSpecFilesModulePath] = ['webpack', 'sourcemap'];
    config.set(baseKarmaConfig);
};
