var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Vrview from './VrviewCmp';
var scene = {
    scene: { id: 1, width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true }
};
describe('<Vrview/>', function () {
    // it('Matches snapshot', () => {
    //   const component = TestRenderer.create(
    //     <Vrview>Pag Index Component Content</Vrview>
    //   );
    //   expect(component.toJSON()).toMatchSnapshot();
    // });
    it('renders without crashing', function () {
        var div = document.createElement('div');
        ReactDOM.render(React.createElement(Vrview, __assign({}, scene)), div);
    });
});
