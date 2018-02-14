import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
