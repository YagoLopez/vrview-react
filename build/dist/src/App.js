"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var VrviewCmp_1 = require("./vrview/VrviewCmp");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
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
        return _this;
    }
    App.prototype.changeScene = function () {
        this.setState({
            scene: { image: '../images/walrus.jpg', is_stereo: true },
            hotspots: [{ name: 'hotspot2', pitch: 0, yaw: -20, radius: 0.05, distance: 2 }]
        });
    };
    // todo: investigar contenido de this.vrview._events
    App.prototype.changeScene2 = function () {
        debugger;
        this.refs.vrviewComponent.vrview.setContent({
            image: '../images/1.jpg',
            is_stereo: false
        });
    };
    App.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("h1", null, "Virtual Reality View"),
            React.createElement(VrviewCmp_1.default, { config: this.state, ref: "vrviewComponent" }),
            React.createElement("button", { onClick: function () { return _this.changeScene(); } }, "cambiar escena"),
            React.createElement("button", { onClick: function () { return _this.changeScene2(); } }, "cambiar escena")));
    };
    return App;
}(React.Component));
exports.App = App;
