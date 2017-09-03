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
var VrviewCmp_1 = require("./vrview/VrviewCmp");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Scene configuration contains images, hotspots and navigation between scenes
        // It is passed to <Vrview/> as props
        _this.sceneConfig = {
            scene: { width: '90%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true },
            hotspots: [
                { name: 'hotspot1', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                        scene: { image: '../images/1.jpg', is_stereo: false },
                        hotspots: [
                            { name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
                                    scene: { image: '../images/petra.jpg', is_stereo: false }
                                } },
                            { name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                                    scene: { image: '../images/2.jpg', is_stereo: false }
                                } }
                        ]
                    } },
                { name: 'hotspot2', pitch: 0, yaw: -35, radius: 0.05, distance: 2 }
            ]
        };
        /**
         * Change scene programatically.
         * State is only mantained in <Vrview/>, not in this <App/> parent component
         * This is to manage the rendering of <Vrview/> with life-cycle methods
         */
        _this.changeScene = function () {
            _this.vrviewCmp.setState({
                scene: { image: '../images/walrus.jpg', is_stereo: true },
                hotspots: [
                    { name: 'hotspot5', pitch: -20, yaw: -25, radius: 0.05, distance: 2, clickFn: function () { return alert('Function executed'); } }
                ]
            });
        };
        /**
         * To reset the scene to the initial config is needed to clear hotspot click handlers
         */
        _this.resetScene = function () {
            _this.vrviewCmp.clearHotspotsClickHandlers();
            _this.vrviewCmp.setState(_this.sceneConfig);
        };
        /**
         * Debug mode: a small window shows FPS (frames per second) in canvas
         */
        _this.toggleDebugMode = function () {
            _this.vrviewCmp.toggleDebugMode();
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("h1", null, "Virtual Reality View"),
            React.createElement(VrviewCmp_1.default, __assign({}, this.sceneConfig, { ref: function (vrview) { _this.vrviewCmp = vrview; } })),
            React.createElement("button", { onClick: this.changeScene }, "Change Scene Programatically"),
            "\u00A0",
            React.createElement("button", { onClick: this.resetScene }, "Reset Scene"),
            "\u00A0",
            React.createElement("button", { onClick: this.toggleDebugMode }, "Toggle Debug Mode")));
    };
    return App;
}(React.Component));
exports.App = App;
