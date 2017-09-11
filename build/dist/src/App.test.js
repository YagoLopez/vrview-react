"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var VrviewCmp_1 = require("./vrview/VrviewCmp");
var scene = {
    scene: { id: 1, width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true },
    hotspots: [
        { name: 'hotspot1', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                scene: { id: 2, image: '../images/landscape1.jpg', is_stereo: false },
                hotspots: [
                    { name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
                            scene: { id: 3, image: '../images/palmbeach.jpg', is_stereo: false }
                        } },
                    { name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                            scene: { id: 4, image: '../images/landscape2.jpg', is_stereo: false }
                        } }
                ]
            } },
        { name: 'hotspot2', pitch: 0, yaw: -35, radius: 0.05, distance: 2 }
    ]
};
it('renders without crashing', function () {
    var div = document.createElement('div');
    ReactDOM.render(React.createElement(VrviewCmp_1.default, __assign({}, scene)), div);
});
