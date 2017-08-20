"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var VrviewCmp_1 = require("./vrview/VrviewCmp");
var config = {
    scene: { width: '90%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true },
    hotspots: [
        { name: 'hotspot1', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
                scene: { image: '../images/1.jpg', is_stereo: false },
                hotspots: [
                    { name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
                            scene: { image: '../images/2.jpg', is_stereo: false }
                        } },
                    { name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                            scene: { image: '../images/1.jpg', is_stereo: false }
                        } }
                ]
            } },
        { name: 'hotspot2', pitch: 0, yaw: 0, radius: 0.05, distance: 2 }
    ]
};
it('renders without crashing', function () {
    var div = document.createElement('div');
    ReactDOM.render(React.createElement(VrviewCmp_1.default, { config: config }), div);
});
