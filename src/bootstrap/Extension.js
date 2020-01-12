import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import DemoApp from 'components/DemoApp';

import 'scss/extension.scss';

ReactDOM.render(<DemoApp></DemoApp>, document.getElementById('root'));

// chrome.tabs.getSelected(null, (tab) => {
//     alert(JSON.stringify(tab));
// });

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    alert(JSON.stringify(tabs[0]));
});