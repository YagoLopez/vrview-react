"use strict";
//todo: no funciona el cambio de estado desde el boton
//todo: buscar e incluir tipos (@type) para vrview
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
                    if (hotspot.newScene) {
                        console.log('click event for hotspot: ', hotspot);
                        _this.setState({ scene: hotspot.newScene.scene, hotspots: hotspot.newScene.hotspots });
                    }
                    else {
                        alert('No Scene defined for hotspot');
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
        if (this.state.scene) {
            // Load new scene content data from state
            this.vrview.setContent(this.state.scene);
            this.loadHotspots();
            this.addHotspotsClickHandlers();
        }
        else {
            alert('No scene defined for hotspot');
        }
    };
    /**
     * State change can be defined by the own component clicking hotspots or
     * changing state in parent component and passing it as props. In this case
     * this lifecycle method is used.
     *
     * An example of this is changing state in parent component using the botton
     */
    Vrview.prototype.componentWillReceiveProps = function (newProps) {
        this.setState(newProps);
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: 'vrview' }));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
