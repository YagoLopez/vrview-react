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
import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import ScenesCollection from "./scenes/Scenes";
import './App.css';
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Collection of scenes
        _this.scenes = new ScenesCollection();
        // Initial state contains first scene of the collection
        _this.state = _this.scenes.getSceneByArrayIndex(0);
        /**
         * Reset state to the initial scene.
         */
        _this.resetScene = function () {
            if (_this.state.scene.id !== 1) {
                _this.vrviewCmp.showLoader();
                _this.setState(_this.scenes.getSceneByArrayIndex(0));
            }
            else {
                alert('Current scene is initial scene');
            }
        };
        /**
         * Debug mode: a small window shows FPS (frames per second) in canvas
         */
        _this.toggleDebugMode = function () {
            _this.vrviewCmp.toggleDebugMode();
        };
        /**
         * Show left menu of the user interface
         */
        _this.showLeftPanel = function () {
            _this.refs.panel.open();
        };
        /**
         * Hide left menu of the user interface
         */
        _this.hideLeftPanel = function () {
            _this.refs.panel.dismiss();
        };
        /**
         * Invoke action on click left panel menu item
         *
         * @param action {Function}
         * @param params {} Optional. Arguments to pass to the function
         */
        _this.leftPanelAction = function (action, params) {
            action(params);
            _this.hideLeftPanel();
        };
        /**
         * Load new scene when clicking a hotspot
         *
         * @param idScene {number | string} Id new scene to load
         */
        _this.handleClickHotspot = function (idScene) {
            var newSceneObj = _this.scenes.findSceneBydId(idScene);
            if (!newSceneObj) {
                alert('No scene found for id: ' + idScene);
                return;
            }
            _this.vrviewCmp.showLoader();
            if (!newSceneObj.hotspots) {
                _this.setState({ scene: newSceneObj.scene, hotspots: undefined });
            }
            else {
                _this.setState({ scene: newSceneObj.scene, hotspots: newSceneObj.hotspots });
            }
        };
        /**
         * Use Google's Format Conversor to transform a 360 img to an apropiated format for visualization whit this component
         */
        _this.openImageFormatConversor = function () {
            window.open('https://storage.googleapis.com/cardboard-camera-converter/index.html');
            _this.hideLeftPanel();
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
                itemType: ContextualMenuItemType.Divider
            },
            {
                key: 'resetScene',
                name: 'Reset Scene',
                icon: 'RevToggleKey',
                onClick: function () { return _this.resetScene(); },
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
                    { name: 'Reset Scene', url: '', key: 'resetScene',
                        onClick: function () { return _this.leftPanelAction(_this.resetScene); } },
                    { name: 'Toggle Debug Mode', url: '', key: 'toggleDebugMode',
                        onClick: function () { return _this.leftPanelAction(_this.toggleDebugMode); } },
                    { name: 'Change Scene', url: '',
                        links: [{
                                name: 'Scene 1',
                                key: '1',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.leftPanelAction(_this.handleClickHotspot, 1); }
                            },
                            {
                                name: 'Scene 2',
                                key: '2',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.leftPanelAction(_this.handleClickHotspot, 2); }
                            },
                            {
                                name: 'Scene 3',
                                key: '3',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.leftPanelAction(_this.handleClickHotspot, 3); }
                            },
                            {
                                name: 'Scene 4',
                                key: '4',
                                url: 'javascript:void(0)',
                                onClick: function () { return _this.leftPanelAction(_this.handleClickHotspot, 4); }
                            }],
                        isExpanded: false
                    },
                    { name: 'Change Img Format', key: 'imageFormatConversor', url: '',
                        onClick: this.openImageFormatConversor }
                ]
            }];
        var choiceGroup = [
            {
                key: '1',
                imageSrc: require('./img/small-coral.jpg'),
                selectedImageSrc: require('./img/small-coral.jpg'),
                imageSize: { width: 80, height: 50 },
                text: 'Scene 1',
                checked: this.state.scene.id == 1,
                onClick: function () { return _this.handleClickHotspot(1); }
            },
            {
                key: '2',
                imageSrc: require('./img/small-landscape1.jpg'),
                selectedImageSrc: require('./img/small-landscape1.jpg'),
                imageSize: { width: 80, height: 50 },
                text: 'Scene 2',
                checked: this.state.scene.id == 2,
                onClick: function () { return _this.handleClickHotspot(2); }
            },
            {
                key: '3',
                imageSrc: require('./img/small-palmbeach.jpg'),
                selectedImageSrc: require('./img/small-palmbeach.jpg'),
                imageSize: { width: 80, height: 50 },
                text: 'Scene 3',
                checked: this.state.scene.id == 3,
                onClick: function () { return _this.handleClickHotspot(3); }
            },
            {
                key: '4',
                imageSrc: require('./img/small-landscape2.jpg'),
                selectedImageSrc: require('./img/small-landscape2.jpg'),
                imageSize: { width: 80, height: 50 },
                text: 'Scene 4',
                checked: this.state.scene.id == 4,
                onClick: function () { return _this.handleClickHotspot(4); }
            }
        ];
        return (React.createElement(Fabric, null,
            React.createElement(CommandBar, { isSearchBoxVisible: false, items: topMenuItems, className: "command-bar" }),
            React.createElement(Panel, { ref: "panel", type: PanelType.smallFixedNear, isLightDismiss: true, headerText: "Vrview React" },
                React.createElement("div", null,
                    React.createElement(Nav, { groups: leftMenuItems, selectedKey: scene.id.toString() }))),
            React.createElement("div", { className: "pad15" },
                React.createElement("div", { className: "centered header" }, "Vrview React Component"),
                React.createElement("div", { className: "centered subheader" }, "Visualization of virtual tours, 360\u00BA photos and videos")),
            React.createElement(DocumentCard, { className: "layout shadow" },
                React.createElement(Vrview, __assign({}, this.state, { ref: function (vrview) { _this.vrviewCmp = vrview; }, onClickHotspot: this.handleClickHotspot })),
                React.createElement("div", { className: "pad15" },
                    React.createElement("div", { className: "card-title" }, scene.title),
                    React.createElement("div", { dangerouslySetInnerHTML: { __html: scene.description } }))),
            React.createElement(ChoiceGroup, { label: 'Change Scene Programatically', options: choiceGroup, className: "centered pad15" })));
    };
    return App;
}(React.PureComponent));
export { App };
