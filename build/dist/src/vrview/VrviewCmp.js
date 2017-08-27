"use strict";
//todo: is_debug on/off (usar parametros url?)
//todo: buscar e incluir tipos (@type) para vrview
//todo: modificar la plantilla "index.html" en /node_modules/react-scripts para limar detalles
//todo: hacer algunos test
//todo: favicon
//todo: añadir enlace a conversion de formato de cardboard
//todo: service worker y manifest.json
//todo: probar con video y las funciones de reproduccion de video
//todo: revisar hotspot id en vrview.js
//todo: material design para react
//todo: hacer scene container responsivo
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
var Vrview = (function (_super) {
    __extends(Vrview, _super);
    function Vrview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Initial state id defined by parent's props
        _this.state = _this.props;
        _this.getIframeWindow = function (iframe_object) {
            var result = undefined;
            if (iframe_object.contentWindow) {
                // return iframe_object.contentWindow;
                result = iframe_object.contentWindow;
            }
            if (iframe_object.window) {
                // return iframe_object.window;
                result = iframe_object.window;
            }
            // return undefined;
            return result;
        };
        return _this;
    }
    Vrview.prototype.loadHotspots = function () {
        var _this = this;
        var hotspots = this.state.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            console.log('adding hotspot', hotspot);
            _this.vrview.addHotspot(hotspot.name, {
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
            _this.vrview.on('click', function (event) {
                if (event.id === hotspot.name) {
                    // If there is function defined by the user on click event, run it
                    if (hotspot.clickFn) {
                        hotspot.clickFn();
                    }
                    else {
                        // If there is newSecene defined for this hotspot, set state to new scene
                        if (hotspot.newScene) {
                            console.log('click event for hotspot: ', hotspot);
                            _this.setState({ scene: hotspot.newScene.scene, hotspots: hotspot.newScene.hotspots });
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
     * Executed after dom load
     */
    Vrview.prototype.componentDidMount = function () {
        var _this = this;
        var onVrViewLoad = function () {
            // Vrview object creation
            _this.vrview = new VRView.Player('vrview', _this.state.scene);
            _this.vrview.on('ready', function () {
                _this.loadHotspots();
            });
            _this.addHotspotsClickHandlers();
        };
        window.addEventListener('load', onVrViewLoad);
    };
    /**
     * Executed after state changed
     */
    Vrview.prototype.componentDidUpdate = function () {
        console.log('component did update, this.state.scene.is_debug: ', this.state.scene.is_debug);
        if (this.vrview) {
            this.vrview.setContent(this.state.scene);
            this.loadHotspots();
            this.addHotspotsClickHandlers();
        }
    };
    Vrview.prototype.clearHotspotsClickEvents = function () {
        if (this.vrview._events.click) {
            this.vrview._events.click.length = 0;
        }
    };
    Vrview.prototype.isDebugEnabled = function (iframe) {
        return (this.getIframeWindow(iframe)).document.querySelector('#stats') != null;
    };
    /**
     * Toggle Debug Mode
     * It is needed to create a new VRView object. It is not enough to change state field 'is_debug'
     */
    Vrview.prototype.toggleDebugMode = function () {
        var scene = this.state.scene;
        var iframe = document.querySelector('iframe');
        var parentElement = iframe.parentElement;
        scene.is_debug = !this.isDebugEnabled(iframe);
        scene.width = iframe.width;
        scene.height = iframe.height;
        this.setState(scene);
        console.log('toggle debug mode, is_debug: ', scene.is_debug);
        parentElement.removeChild(iframe);
        this.vrview = new VRView.Player('vrview', this.state.scene);
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: 'vrview' }));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
