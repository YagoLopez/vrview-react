"use strict";
//todo: scene description
//todo: loader
//todo: usar callback function con "refs"
//todo: a lo mejor en vez de tener anidadas las escenas era mejor tener un listado (array) de escenas
//todo: y cargar la nueva escena por su id
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
var URL_CODE = 'https://github.com/YagoLopez/vrview-react/blob/bde928cf3507e0376a058a0df36634fb800e3158/src/App.tsx#L40';
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { scene: {}, hotspots: [] };
        /**
         * Scene configuration. It contains images, hotspots and navigation between scenes
         * It is passed to <Vrview/> as props
         */
        _this.sceneConfig = {
            scene: {
                id: 1,
                width: '100%',
                height: 400,
                image: '../images/coral.jpg',
                is_stereo: true,
                is_debug: true,
                title: 'Title Scene 1',
                description: 'Underwater panorama with divers and coral reefs'
            },
            hotspots: [
                { name: 'hotspot1', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                        scene: {
                            id: 2,
                            image: '../images/landscape1.jpg',
                            is_stereo: false,
                            title: 'Title Scene 2',
                            description: 'This is the description of scene 2'
                        },
                        hotspots: [
                            { name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
                                    scene: {
                                        id: 3,
                                        image: '../images/palmbeach.jpg',
                                        is_stereo: false,
                                        title: 'Title Scene 3',
                                        description: 'Tropical beach with palm trees'
                                    }
                                } },
                            { name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                                    scene: {
                                        id: 4,
                                        image: '../images/landscape2.jpg',
                                        is_stereo: false,
                                        title: 'Title Scene 4',
                                        description: 'This is the description of scene 4'
                                    }
                                } }
                        ]
                    } },
                { name: 'hotspot2', pitch: 0, yaw: -35, radius: 0.05, distance: 2 }
            ]
        };
        /**
         * Change scene programatically.
         * To change scene just set state with new data. State is only mantained in <Vrview>, not in <App> component
         * Reason for this is to manage the rendering of <Vrview> with its life-cycle methods
         */
        _this.changeScene = function () {
            var newScene = {
                scene: { id: 5, image: '../images/walrus.jpg', is_stereo: true, title: 'New Scene', description: 'New Description' },
                hotspots: [
                    { name: 'hotspot5', pitch: -20, yaw: -25, radius: 0.05, distance: 2, clickFn: function () { return alert('Function executed'); } }
                ]
            };
            _this.vrviewCmp.setState(newScene);
            _this.setState(newScene);
        };
        /**
         * To reset the scene to the initial state is needed to clear hotspot click handlers
         */
        _this.resetScene = function () {
            _this.vrviewCmp.clearHotspotsClickHandlers();
            _this.vrviewCmp.setState(_this.sceneConfig);
            _this.setState(_this.sceneConfig);
        };
        /**
         * Debug mode: a small window shows FPS (frames per second) in canvas
         */
        _this.toggleDebugMode = function () {
            _this.vrviewCmp.toggleDebugMode();
        };
        /**
         * This function is used to close Left Menu Panel when clicking overlay (outside panel).
         * The left Menu Panel is created and deleted dynamically.
         * To get a reference to the overlay, renderPanelFooter() is used while Panel exists.
         */
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
        _this.changeSceneAndHideLeftMenu = function () {
            _this.changeScene();
            _this.hideLeftPanel();
        };
        _this.toggleDebugModeAndHideLeftMenu = function () {
            _this.toggleDebugMode();
            _this.hideLeftPanel();
        };
        _this.updateState = function () {
            _this.setState(_this.vrviewCmp.state);
        };
        /**
         * Find Scene By Id
         *
         * @param scene {IScene}
         * @param id {number | string}
         */
        _this.findSceneById = function (scene, id) {
            debugger;
            var result;
            if (scene.hasOwnProperty("id") && scene["id"] == id) {
                result = scene;
            }
            for (var i = 0; i < Object.keys(scene).length; i++) {
                if (typeof scene[Object.keys(scene)[i]] == "object") {
                    var obj = _this.findSceneById(scene[Object.keys(scene)[i]], id);
                    if (obj != null) {
                        result = obj;
                    }
                }
            }
            return result;
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.setState(this.vrviewCmp.state);
    };
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
                title: 'Change Debug Mode State'
            },
            {
                key: 'more',
                name: 'Change Scene',
                icon: 'Org',
                items: [
                    {
                        key: 'changeScene',
                        name: 'Change Scene Programatically',
                        icon: 'DecreaseIndentLegacy',
                        onClick: this.changeScene,
                        title: 'Scene changed by code',
                    },
                    {
                        key: 'viewCode',
                        name: 'View Code',
                        icon: 'IncreaseIndentLegacy',
                        href: URL_CODE,
                        target: '_blank'
                    }
                ]
            }
        ];
        var leftMenuItems = [{
                links: [
                    { name: 'Reset Scene', url: '', key: 'resetScene', onClick: this.resetSceneAndHideLeftMenu },
                    { name: 'Toggle Debug Mode', url: '', key: 'toggleDebugMode', onClick: this.toggleDebugModeAndHideLeftMenu },
                    { name: 'Change Scene', url: '',
                        links: [{
                                name: 'Programatically',
                                key: 'changeScene',
                                url: '',
                                onClick: this.changeSceneAndHideLeftMenu
                            },
                            {
                                name: 'View Code',
                                key: 'viewCode',
                                url: URL_CODE,
                                target: '_blank'
                            }],
                        isExpanded: true
                    }
                ]
            }];
        var changeSceneOptions = [
            {
                key: '1',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 1',
                checked: this.state.scene.id == 1,
                onClick: function () { return alert('this.state.scene.id: ' + _this.state.scene.id); }
            },
            {
                key: '2',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 2',
                checked: this.state.scene.id == 2,
                onClick: function () { return alert('this.state.scene.id: ' + _this.state.scene.id); }
            },
            {
                key: '3',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 3',
                checked: this.state.scene.id == 3,
                onClick: function () { return alert('this.state.scene.id: ' + _this.state.scene.id); }
            },
            {
                key: '4',
                iconProps: { iconName: 'Photo2' },
                text: 'Scene 4',
                checked: this.state.scene.id == 4,
                onClick: function () { return alert('this.state.scene.id: ' + _this.state.scene.id); }
            }
        ];
        return (React.createElement(Fabric_1.Fabric, null,
            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: false, items: topMenuItems, className: "command-bar" }),
            React.createElement(Panel_1.Panel, { ref: "panel", type: Panel_1.PanelType.smallFixedNear, onRenderFooter: this.renderPanelFooter, headerText: "Vrview React" },
                React.createElement("div", null,
                    React.createElement(Nav_1.Nav, { groups: leftMenuItems, selectedKey: 'resetScene' }))),
            React.createElement("div", { className: "pad15" },
                React.createElement("div", { className: "centered header" }, "Vrview React"),
                React.createElement("div", { className: "centered subheader" }, "React Component based on Google's Vrview Library")),
            React.createElement(DocumentCard_1.DocumentCard, { className: "layout shadow" },
                React.createElement(VrviewCmp_1.default, __assign({}, this.sceneConfig, { ref: function (vrview) { _this.vrviewCmp = vrview; }, updateParent: this.updateState })),
                React.createElement("div", { className: "pad15" },
                    React.createElement("div", { className: "card-title" }, this.state.scene.title),
                    React.createElement("div", null, this.state.scene.description))),
            React.createElement(ChoiceGroup_1.ChoiceGroup, { label: 'Change Scene Programatically', options: changeSceneOptions, className: "centered pad15" })));
    };
    return App;
}(React.Component));
exports.App = App;
