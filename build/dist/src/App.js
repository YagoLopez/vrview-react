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
var ChoiceGroup_1 = require("office-ui-fabric-react/lib/ChoiceGroup");
require("./App.css");
/**
 * List of scenes.
 *
 * Each scene object contains information like: path to images/videos, optional hotspots,
 * navigation between scenes and other parameters. (See IScene definition)
 * Scenes can be loaded from hardcoded data or from a database.
 */
// const scenes = require('./scenes.json');
var scenes = [
    {
        "scene": {
            "id": 1,
            "width": "100%",
            "height": 400,
            "image": "../images/coral.jpg",
            "is_stereo": true,
            "is_debug": true,
            "title": "Title Scene 1",
            "description": "Initial scene with three hotspots. One hotspot has a new scene associated, other has no new scene and the third executes a function"
        },
        "hotspots": [
            { "name": "scene1-hotspot1", "pitch": 0, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 2 },
            { "name": "scene1-hotspot2", "pitch": 0, "yaw": -35, "radius": 0.05, "distance": 2 },
            { "name": "scene1-hotspot3", "pitch": -20, "yaw": -25, "radius": 0.05, "distance": 2,
                "clickFn": "alert('Function executed');" }
        ]
    },
    {
        "scene": {
            "id": 2,
            "image": "../images/landscape1.jpg",
            "is_stereo": false,
            "title": "Title Scene 2",
            "description": "Scene 2 has two hotspots with respectives scenes associated"
        },
        "hotspots": [
            { "name": "scene2-hotspot4", "pitch": 0, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 3 },
            { "name": "scene2-hotspot5", "pitch": 0, "yaw": -35, "radius": 0.05, "distance": 2, "idNewScene": 4 }
        ]
    },
    {
        "scene": {
            "id": 3,
            "image": "../images/palmbeach.jpg",
            "is_stereo": false,
            "title": "Title Scene 3",
            "description": "Scene 3 has only one hotspot associated to Scene 4"
        },
        "hotspots": [
            { "name": "scene2-hotspot4", "pitch": -10, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 4 }
        ]
    },
    {
        "scene": {
            "id": 4,
            "image": "../images/landscape2.jpg",
            "is_stereo": false,
            "title": "Title Scene 4",
            "description": "This is scene 4 without hotspots"
        }
    }
];
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Initial state contains first scene
        _this.state = scenes[0];
        /**
         * Reset state to the initial scene.
         */
        _this.resetScene = function () {
            _this.setState(scenes[0]);
        };
        /**
         * Debug mode: a small window shows FPS (frames per second) in canvas
         */
        _this.toggleDebugMode = function () {
            _this.vrviewCmp.toggleDebugMode();
        };
        /**
         * Close Left Menu Panel when clicking overlay (outside panel).
         * The left Menu Panel is created and deleted dynamically.
         * To get a reference to the overlay, renderPanelFooter() is used while Panel exists.
         */
        //todo: revisar esto
        _this.renderPanelFooter = function () {
            var overlay = document.querySelector('.ms-Overlay');
            if (overlay) {
                overlay.addEventListener('mousedown', function () {
                    _this.hideLeftPanel();
                });
            }
        };
        _this.showLeftPanel = function () {
            _this.refs.panel.open();
        };
        _this.hideLeftPanel = function () {
            _this.refs.panel.dismiss();
        };
        _this.resetSceneAndHideLeftMenu = function () {
            _this.resetScene();
            _this.hideLeftPanel();
        };
        _this.changeSceneAndHideLeftMenu = function (idScene) {
            _this.handleClickHotspot(idScene);
            _this.hideLeftPanel();
        };
        _this.toggleDebugModeAndHideLeftMenu = function () {
            _this.toggleDebugMode();
            _this.hideLeftPanel();
        };
        _this.handleClickHotspot = function (idScene) {
            var newSceneObj = _this.vrviewCmp.findSceneBydId(scenes, idScene);
            if (!newSceneObj.hotspots) {
                _this.setState({ scene: newSceneObj.scene, hotspots: undefined });
            }
            else {
                _this.setState({ scene: newSceneObj.scene, hotspots: newSceneObj.hotspots });
            }
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        var topMenuItems = [
            {
                key: 'menuBtn',
                icon: 'CollapseMenu',
                onClick: this.showLeftPanel,
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
                title: 'Show/Hide small window with canvas info in low left corner'
            }
        ];
        // Menu link keys must be equals to scene ids to show active scene in menu
        var leftMenuItems = [{
                links: [
                    { name: 'Reset Scene', url: '', key: 'resetScene', onClick: this.resetSceneAndHideLeftMenu },
                    { name: 'Toggle Debug Mode', url: '', key: 'toggleDebugMode', onClick: this.toggleDebugModeAndHideLeftMenu },
                    { name: 'Change Scene', url: '',
                        links: [{
                                name: 'Scene 1',
                                key: '1',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.changeSceneAndHideLeftMenu(1); }
                            },
                            {
                                name: 'Scene 2',
                                key: '2',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.changeSceneAndHideLeftMenu(2); }
                            },
                            {
                                name: 'Scene 3',
                                key: '3',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.changeSceneAndHideLeftMenu(3); }
                            },
                            {
                                name: 'Scene 4',
                                key: '4',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.changeSceneAndHideLeftMenu(4); }
                            }],
                        isExpanded: true
                    }
                ]
            }];
        var choiceGroup = [
            {
                key: '1',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 1',
                checked: this.state.scene.id == 1,
                onClick: function () { return _this.handleClickHotspot(1); }
            },
            {
                key: '2',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 2',
                checked: this.state.scene.id == 2,
                onClick: function () { return _this.handleClickHotspot(2); }
            },
            {
                key: '3',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 3',
                checked: this.state.scene.id == 3,
                onClick: function () { return _this.handleClickHotspot(3); }
            },
            {
                key: '4',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 4',
                checked: this.state.scene.id == 4,
                onClick: function () { return _this.handleClickHotspot(4); }
            }
        ];
        return (React.createElement(Fabric_1.Fabric, null,
            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: false, items: topMenuItems, className: "command-bar" }),
            React.createElement(Panel_1.Panel, { ref: "panel", type: Panel_1.PanelType.smallFixedNear, onRenderFooter: this.renderPanelFooter, headerText: "Vrview React" },
                React.createElement("div", null,
                    React.createElement(Nav_1.Nav, { groups: leftMenuItems, selectedKey: this.state.scene.id.toString() }))),
            React.createElement("div", { className: "pad15" },
                React.createElement("div", { className: "centered header" }, "Vrview React"),
                React.createElement("div", { className: "centered subheader" }, "React Component based on Google's Vrview Library")),
            React.createElement(DocumentCard_1.DocumentCard, { className: "layout shadow" },
                React.createElement(VrviewCmp_1.default, __assign({}, this.state, { ref: function (vrview) { _this.vrviewCmp = vrview; }, onClickHotspot: this.handleClickHotspot })),
                React.createElement("div", { className: "pad15" },
                    React.createElement("div", { className: "card-title" }, this.state.scene.title),
                    React.createElement("div", null, this.state.scene.description))),
            React.createElement(ChoiceGroup_1.ChoiceGroup, { label: 'Change Scene Programatically', options: choiceGroup, className: "centered pad15" })));
    };
    return App;
}(React.Component));
exports.App = App;
