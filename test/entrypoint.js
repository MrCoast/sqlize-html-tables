'use strict';

require('babel-polyfill');
const _ = require('lodash');

window.createContext = function (rewrites) {
    return function (injectableModules, callback) {
        var rewritedModules = injectableModules.map(function (injectableModule) {
            if (_.isString(injectableModule)) {
                throw new Error(`Passing strings to createContext is no longer valid. Replace '${injectableModule}' with require('inject!${injectableModule}')`);
            }
            return injectableModule(rewrites);
        });

        callback.apply(null, rewritedModules);
    };
};
