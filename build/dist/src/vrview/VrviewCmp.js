//todo: consultar digarama uml
//todo: test browserstack ios
//todo: favicon
//todo: revisar hotspot id en vrview.js
//todo: usar mapa (leaflet) y markers
//todo: probar en una rama nueva con polyfill create custom event for browser compatibility
//todo: modificar la plantilla "index.html" en /node_modules/react-scripts para limar detalles => usar home: "." en package.json
//todo: hacer test
//todo: service worker y manifest.json
//todo: probar con video y las funciones de reproduccion de video
//todo: test con browser stack
//todo: hacer instalacion de prueba siguiendo pasos de readme.md
//todo: usar callback function con "refs"
//todo: usar fade-in en texto pie de imagen
//todo: revisar toggle debug mode. debe ser mostrado u ocultado en funcion de estado de componente (declarativamente)
// no imperativamente como ahora
//todo: about page
//todo: establecer debug mode al cambiar de escena (ahora solo se hace onComponentDidMount())
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
import * as React from "react";
import * as VRView from "./vrview.js";
/**
 * Vrview creates a 3d scene with optional hotspots
 * It receives scene data as props from parent component
 *
 * @Props: {IVrviewConfig} Object implementing IVrviewConfig interface with scene data
 */
var Vrview = (function (_super) {
    __extends(Vrview, _super);
    function Vrview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Show loader text inside iframe when content is loading
         *
         * The loader will be hidden when scene is completely loaded
         * See: "public/vrview/embed.js" -> "WorldRenderer.prototype.didLoad_()"
         */
        _this.showLoader = function () {
            var iframe = _this.vrviewPlayer.iframe;
            var loader = iframe.contentDocument.getElementById('loader');
            loader && loader.classList.add('visible');
        };
        return _this;
    }
    /**
     * Loads hotspot configuration data from props
     */
    Vrview.prototype.loadHotspots = function () {
        var _this = this;
        var hotspots = this.props.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            // console.log('adding hotspot', hotspot);
            _this.createHotspot(hotspot);
            _this.addClickHandler(hotspot);
        });
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
            if (event.id === hotspot.name) {
                // If there is a function defined by the user for the click event, execute it
                if (hotspot.clickFn) {
                    eval(hotspot.clickFn);
                }
                else {
                    // If there is newSecene defined for this hotspot, set state to new scene
                    if (hotspot.idNewScene) {
                        _this.props.onClickHotspot && _this.props.onClickHotspot(hotspot.idNewScene);
                    }
                    else {
                        alert('No Scene defined for hotspot: ' + event.id);
                    }
                }
            }
        });
    };
    /**
     * Component initialization after dom loading
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
     * On change event, executed after state changes
     * Note: VrviewPlayer.setContent() must be executed asynchronously
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
        if (this.vrviewPlayer._events) {
            if (this.vrviewPlayer._events.click) {
                this.vrviewPlayer._events.click.length = 0;
            }
        }
    };
    /**
     * Find out if canvas debug info is enabled
     *
     * @param {HTMLIFrameElement} iframe containing 3d scene
     * @returns {boolean}
     */
    Vrview.prototype.isDebugEnabled = function (iframe) {
        return (iframe.contentDocument.querySelector('#stats') != null);
    };
    ;
    /**
     * Toggle Canvas Debug Mode
     * To enable/disable debug mode it is needed to create a new Vrview Player object and reload the scene
     * It is not enough to change 'is_debug' field in the state
     */
    Vrview.prototype.toggleDebugMode = function () {
        this.clearHotspotsClickHandlers();
        var scene = this.props.scene;
        var iframe = this.vrviewPlayer.iframe;
        var iframeParentElement = iframe.parentElement;
        // To know debug state it is needed to search for a dom element with debug info in the vrview iframe
        // (not to use "state: scene.is_debug")
        scene.is_debug = !this.isDebugEnabled(iframe);
        scene.width = iframe.width;
        scene.height = iframe.height;
        iframeParentElement.removeChild(iframe);
        this.vrviewPlayer = new VRView.Player('vrview', this.props.scene);
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: 'vrview' }));
    };
    return Vrview;
}(React.PureComponent));
export default Vrview;
