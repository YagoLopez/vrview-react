"use strict";
//todo: revisar tipos de props y state
//todo: usar mapa (leaflet) y markers
//todo: probar en una rama nueva con polyfill create custom event
//todo: favicon
//todo: loader
//todo: is_debug on/off (usar parametros url?)
//todo: modificar la plantilla "index.html" en /node_modules/react-scripts para limar detalles
//todo: hacer algunos test
//todo: añadir enlace a conversion de formato de cardboard
//todo: service worker y manifest.json
//todo: probar con video y las funciones de reproduccion de video
//todo: revisar hotspot id en vrview.js
//todo: hotspot editor (user creates hotspots when clicking on scene)
//todo: revisar IVrview
//todo: test con browser stack
//todo: hacer instalacion de prueba siguiendo pasos de readme.md
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
var VRView = require("./vrview.js");
/**
 * Vrview component creates a 3d scene with optional hotspots
 *
 * @Props: ISceneConfig
 * @State: ISceneConfig
 */
var Vrview = (function (_super) {
    __extends(Vrview, _super);
    function Vrview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Get window object from iframe where 3d canvas scene exists
         *
         * @param iframe_object
         * @returns {Window}
         */
        _this.getIframeWindow = function (iframe_object) {
            var result = undefined;
            if (iframe_object.contentWindow) {
                result = iframe_object.contentWindow;
            }
            if (iframe_object.window) {
                result = iframe_object.window;
            }
            return result;
        };
        /**
         * Helper function to find scene by id
         *
         * @param scenes {IScene[]} Array of scenes
         * @param id {number | string} Scene id
         * @returns {IScene} Scene searched
         */
        _this.findSceneBydId = function (scenes, id) {
            for (var i = 0; i < scenes.length; i++) {
                if (scenes[i].scene.id === id) {
                    return scenes[i];
                }
            }
        };
        return _this;
    }
    Vrview.prototype.loadHotspots = function () {
        var _this = this;
        var hotspots = this.props.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            // console.log('adding hotspot', hotspot);
            _this.createHotspot(hotspot);
            _this.addClickHandler(hotspot);
        });
        // console.log('events: ', (this.vrviewPlayer as any)._events.click);
    };
    Vrview.prototype.createHotspot = function (hotspot) {
        this.vrviewPlayer.addHotspot(hotspot.name, {
            pitch: hotspot.pitch,
            yaw: hotspot.yaw,
            radius: hotspot.radius,
            distance: hotspot.distance
        });
    };
    Vrview.prototype.addClickHandler = function (hotspot) {
        var _this = this;
        this.vrviewPlayer.on('click', function (event) {
            debugger;
            if (event.id === hotspot.name) {
                // If there is a function defined by the user for the click event, run it
                if (hotspot.clickFn) {
                    hotspot.clickFn();
                }
                else {
                    // If there is newSecene defined for this hotspot, set state to new scene
                    if (hotspot.idNewScene) {
                        // console.log('hotspot clicked: ', hotspot, 'load new scene, id: ', hotspot.idScene);
                        _this.props.onClickHotspot(hotspot.idNewScene);
                    }
                    else {
                        alert('No Scene defined for hotspot');
                    }
                }
            }
        });
    };
    /**
     * Component initialization. Executed after dom load
     */
    Vrview.prototype.componentDidMount = function () {
        var _this = this;
        var onVrViewLoad = function () {
            // Vrview Player object creation
            _this.vrviewPlayer = new VRView.Player('vrview', _this.props.scene);
            _this.vrviewPlayer.on('ready', function () {
                _this.loadHotspots();
            });
        };
        window.addEventListener('load', onVrViewLoad);
    };
    /**
     * On change event. Executed after state changed
     * Function setContent() must be executed asynchronously
     * This hack is due to how Vrview and EventEmmitters works in vrview.js
     */
    Vrview.prototype.componentDidUpdate = function () {
        var _this = this;
        setTimeout(function () {
            _this.clearHotspotsClickHandlers();
            if (_this.vrviewPlayer) {
                _this.vrviewPlayer.setContent(_this.props.scene);
                _this.loadHotspots();
            }
        }, 0);
    };
    Vrview.prototype.clearHotspotsClickHandlers = function () {
        // debugger
        if (this.vrviewPlayer._events) {
            if (this.vrviewPlayer._events.click) {
                this.vrviewPlayer._events.click.length = 0;
            }
        }
    };
    Vrview.prototype.isDebugEnabled = function (iframe) {
        return (this.getIframeWindow(iframe)).document.querySelector('#stats') != null;
    };
    /**
     * Toggle Canvas Debug Mode
     * To enable/disable debug mode it is needed to create a new Vrview Player object.
     * It is not enough to change 'is_debug' field in the state
     */
    Vrview.prototype.toggleDebugMode = function () {
        this.clearHotspotsClickHandlers();
        var scene = this.props.scene;
        var iframe = document.querySelector('iframe');
        var iframeParentElement = iframe.parentElement;
        // To know debug state it is needed to search for a dom element with debug info in the vrview iframe
        // (not to use "state: scene.is_debug")
        scene.is_debug = !this.isDebugEnabled(iframe);
        scene.width = iframe.width;
        scene.height = iframe.height;
        this.setState(scene);
        iframeParentElement.removeChild(iframe);
        this.vrviewPlayer = new VRView.Player('vrview', this.props.scene);
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: 'vrview' }));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
