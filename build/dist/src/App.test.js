import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from "./App";
var scene = {
    scene: { id: 1, width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true }
};
describe('<App/>', function () {
    it('renders without crashing', function () {
        var div = document.createElement('div');
        ReactDOM.render(React.createElement(App, null), div);
    });
});
