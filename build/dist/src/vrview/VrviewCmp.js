"use strict";
//todo: añadir campos "título" y "descripcion" en ISceneConfig
//todo: usar mapa (leaflet) y markers
//todo: probar en una rama nueva con polyfill create custom event
//todo: material design para react
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
        // Initial state is defined by props passed by parent component
        _this.state = _this.props;
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
        return _this;
    }
    Vrview.prototype.loadHotspots = function () {
        var _this = this;
        var hotspots = this.state.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            console.log('adding hotspot', hotspot);
            // console.log('adding hotspots, event', this.vrview._events.click);
            _this.vrviewPlayer.addHotspot(hotspot.name, {
                pitch: hotspot.pitch,
                yaw: hotspot.yaw,
                radius: hotspot.radius,
                distance: hotspot.distance
            });
        });
    };
    Vrview.prototype.addHotspotsClickHandlers = function () {
        var _this = this;
        var hotspots = this.state.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            _this.vrviewPlayer.on('click', function (event) {
                if (event.id === hotspot.name) {
                    // If there is a function defined by the user for the click event, run it
                    if (hotspot.clickFn) {
                        hotspot.clickFn();
                    }
                    else {
                        // If there is newSecene defined for this hotspot, set state to new scene
                        if (hotspot.newScene) {
                            console.log('click event for hotspot: ', hotspot);
                            _this.setState({ scene: hotspot.newScene.scene, hotspots: hotspot.newScene.hotspots });
                            _this.props.updateParent();
                        }
                        else {
                            alert('No Scene defined for hotspot');
                        }
                    }
                }
            });
        });
    };
    /**
     * Component initialization. Executed after dom load
     */
    Vrview.prototype.componentDidMount = function () {
        var _this = this;
        var onVrViewLoad = function () {
            // Vrview Player object creation
            _this.vrviewPlayer = new VRView.Player('vrview', _this.state.scene);
            _this.vrviewPlayer.on('ready', function () {
                _this.loadHotspots();
            });
            _this.addHotspotsClickHandlers();
        };
        window.addEventListener('load', onVrViewLoad);
    };
    /**
     * On change event. Executed after state changed
     */
    Vrview.prototype.componentDidUpdate = function () {
        if (this.vrviewPlayer) {
            this.vrviewPlayer.setContent(this.state.scene);
            this.loadHotspots();
            this.addHotspotsClickHandlers();
        }
    };
    Vrview.prototype.clearHotspotsClickHandlers = function () {
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
        var scene = this.state.scene;
        var iframe = document.querySelector('iframe');
        var iframeParentElement = iframe.parentElement;
        // To know debug state it is needed to search for a dom element with debug info in the vrview iframe
        // (not to use "state: scene.is_debug")
        scene.is_debug = !this.isDebugEnabled(iframe);
        scene.width = iframe.width;
        scene.height = iframe.height;
        this.setState(scene);
        iframeParentElement.removeChild(iframe);
        this.vrviewPlayer = new VRView.Player('vrview', this.state.scene);
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: 'vrview' }));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
