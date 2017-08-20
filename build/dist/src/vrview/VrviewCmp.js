"use strict";
//todo: no funciona el cambio de estado desde el boton
//todo: buscar e incluir tipos (@type) para vrview
//todo: quitar # en div id de vrview
//todo: is_debug prop = true/false
//todo: eliminar manejadores de eventos para evitar perdidas de memoria (vrview.on)
//todo: is_debug on/off (usar parametros url?)
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
        _this.state = _this.props;
        return _this;
    }
    Vrview.prototype.loadHotspots = function () {
        var _this = this;
        var hotspots = this.state.config.hotspots;
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
        var hotspots = this.state.config.hotspots;
        hotspots && hotspots.forEach(function (hotspot) {
            _this.vrview.on('click', function (event) {
                if (event.id === hotspot.name) {
                    console.log('hotspot click event handler', hotspot);
                    _this.setState({ config: hotspot.newScene });
                }
            });
        });
    };
    /**
     * After dom load/view init
     */
    Vrview.prototype.componentDidMount = function () {
        var _this = this;
        var onVrViewLoad = function () {
            console.log('vrview props on load', _this.props);
            console.log('vrview state on load', _this.state);
            _this.vrview = new VRView.Player('vrview', _this.state.config.scene);
            _this.vrview.on('ready', function () {
                _this.loadHotspots();
            });
            _this.addHotspotsClickHandlers();
        };
        window.addEventListener('load', onVrViewLoad);
    };
    /**
     * On State Change
     */
    Vrview.prototype.componentDidUpdate = function () {
        console.log('component did update, state:', this.state);
        if (this.state.config) {
            // Load new scene content data from state
            this.vrview.setContent(this.state.config.scene);
            this.loadHotspots();
            this.addHotspotsClickHandlers();
        }
        else {
            alert('No scene defined for hotspot');
        }
    };
    // shouldComponentUpdate(){
    //   return false;
    // }
    Vrview.prototype.componentWillReceiveProps = function () {
        console.log('component will recive props, props', this.props);
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: 'vrview' }));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
