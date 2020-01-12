import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import DemoApp from 'components/DemoApp';

import 'scss/demo.scss';

ReactDOM.render(<DemoApp></DemoApp>, document.getElementById('root'));
