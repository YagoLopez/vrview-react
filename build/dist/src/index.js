"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var VrviewCmp_1 = require("./VrviewCmp");
var config = {
    width: '90%',
    height: 400,
    image: '../images/coral.jpg',
    is_stereo: true,
    is_debug: true
};
ReactDOM.render(React.createElement(VrviewCmp_1.default, { config: config }), document.getElementById('root'));
