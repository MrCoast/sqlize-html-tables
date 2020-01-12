'use strict';

var testsContext = require.context('../../../test/spec', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
