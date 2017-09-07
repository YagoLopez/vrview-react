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
var Fabric_1 = require("office-ui-fabric-react/lib/Fabric");
var CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Nav_1 = require("office-ui-fabric-react/lib/Nav");
var DocumentCard_1 = require("office-ui-fabric-react/lib/DocumentCard");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Scene configuration contains images, hotspots and navigation between scenes
        // It is passed to <Vrview/> as props
        _this.sceneConfig = {
            scene: { width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true },
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
        /**
         * When <Panel> is closed, state changes and this produces vrview subcomponent to re-render
         * This is not the desired behaviour.
         * This life-cylce method avoids re-renderings when <Panel> it is closed
         */
        _this.showPanel = function () {
            _this.refs.panel.open();
        };
        _this.renderPanelFooter = function () {
            var overlay = document.querySelector('.ms-Overlay');
            overlay && overlay.addEventListener('click', function () {
                alert('hola');
            });
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        var comandBarItems = [
            {
                key: 'menuBtn',
                icon: 'CollapseMenu',
                onClick: this.showPanel,
                title: 'Left Menu'
            },
            {
                key: 'divider',
                itemType: ContextualMenu_1.ContextualMenuItemType.Divider
            },
            {
                key: 'resetScene',
                name: 'Reset Scene',
                icon: 'RevToggleKey',
                onClick: this.resetScene,
                title: 'Return to Initial Scene'
            },
            {
                key: 'toggleDebugMode',
                name: 'Toggle Debug Mode',
                icon: 'PowerBILogo',
                onClick: this.toggleDebugMode,
                title: 'Change Debug Mode State'
            },
            {
                key: 'changeScene',
                name: 'Change Scene Programatically',
                icon: 'Org',
                onClick: this.changeScene,
                title: 'Change Scene by Code'
            }
        ];
        var navGroups = [{
                links: [
                    {
                        name: 'Home',
                        url: '',
                        links: [{
                                name: 'Show Panel',
                                url: '',
                                key: 'key1',
                                onClick: this.showPanel
                            },
                            {
                                name: 'News',
                                url: 'http://msn.com',
                                key: 'key2'
                            }],
                        isExpanded: true
                    },
                    { name: 'Documents', url: 'http://example.com', key: 'key3', isExpanded: true },
                    { name: 'Pages', url: 'http://msn.com', key: 'key4' },
                    { name: 'Notebook', url: 'http://msn.com', key: 'key5' },
                    { name: 'Long Name Test for elipse', url: 'http://msn.com', key: 'key6' },
                    {
                        name: 'Edit',
                        url: 'http://cnn.com',
                        onClick: function () { alert('on click'); },
                        icon: 'Edit',
                        key: 'key8'
                    }
                ]
            }];
        return (React.createElement(Fabric_1.Fabric, null,
            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: false, items: comandBarItems, className: "command-bar" }),
            React.createElement(Panel_1.Panel, { ref: "panel", type: Panel_1.PanelType.smallFixedNear, onRenderFooter: this.renderPanelFooter, headerText: 'Panel - Small, left-aligned, fixed' },
                React.createElement("div", { className: 'ms-NavExample-LeftPane' },
                    React.createElement(Nav_1.Nav, { groups: navGroups, expandedStateText: 'expanded', collapsedStateText: 'collapsed', selectedKey: 'key3' }))),
            React.createElement("h1", { className: "centered" }, "Virtual Reality View"),
            React.createElement(DocumentCard_1.DocumentCard, { className: "layout shadow" },
                React.createElement(VrviewCmp_1.default, __assign({}, this.sceneConfig, { ref: function (vrview) { _this.vrviewCmp = vrview; } })),
                React.createElement(DocumentCard_1.DocumentCardTitle, { title: 'Revenue stream proposal fiscal year 2016 version02.pptx' }),
                React.createElement(DocumentCard_1.DocumentCardActivity, { activity: 'Created Feb 23, 2016', people: [{ name: 'Kat Larrson', profileImageSrc: require('./img/avatarkat.png') }] }))));
    };
    return App;
}(React.Component));
exports.App = App;
