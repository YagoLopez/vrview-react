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
 * navigation between scenes and other parameters. (See IVrviewConfig definition)
 * Scenes can be loaded from hardcoded data or from a database.
 */
var scenes = require('./scenes.json');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Initial state contains first scene and state for left menu
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
        // renderPanelFooter = (): any => {
        //   const overlay = document.querySelector('.ms-Overlay') as HTMLElement;
        //   if (overlay){
        //     overlay.addEventListener('mousedown', () => {
        //       this.hideLeftPanel();
        //     })
        //   }
        // };
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
        _this.executeActionAndCloseLeftMenu = function (action, params) {
            action(params);
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
        var scene = this.state.scene;
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
        /* Menu link keys must be equals to scene ids to show active scene in menu */
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
            React.createElement(Panel_1.Panel, { ref: "panel", type: Panel_1.PanelType.smallFixedNear, isOpen: this.state.showLeftPanelMenu, isLightDismiss: true, headerText: "Vrview React" },
                React.createElement("div", null,
                    React.createElement(Nav_1.Nav, { groups: leftMenuItems, selectedKey: scene.id.toString() }))),
            React.createElement("div", { className: "pad15" },
                React.createElement("div", { className: "centered header" }, "Vrview React"),
                React.createElement("div", { className: "centered subheader" }, "React Component based on Google's Vrview Library")),
            React.createElement(DocumentCard_1.DocumentCard, { className: "layout shadow" },
                React.createElement(VrviewCmp_1.default, __assign({}, this.state, { ref: function (vrview) { _this.vrviewCmp = vrview; }, onClickHotspot: this.handleClickHotspot })),
                React.createElement("div", { className: "pad15" },
                    React.createElement("div", { className: "card-title" }, scene.title),
                    React.createElement("div", null, scene.description))),
            React.createElement(ChoiceGroup_1.ChoiceGroup, { label: 'Change Scene Programatically', options: choiceGroup, className: "centered pad15" })));
    };
    return App;
}(React.Component));
exports.App = App;
