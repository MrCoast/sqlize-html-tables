import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import DemoApp from 'components/demo/App';

import 'scss/demo.scss';

ReactDOM.render(<DemoApp />, document.getElementById('root'));
