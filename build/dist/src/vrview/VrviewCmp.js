"use strict";
//todo: buscar e incluir tipos (@type) para vrview
//todo: quitar # en div id de vrview
//todo: is_debug prop = true/false
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vrview.prototype.componentDidMount = function () {
        var _this = this;
        var onVrViewLoad = function () {
            //todo: (refactor) (probar en nueva branch) esto debería estar en el estado y funcionar como single source of true para subcomponentes (hotspots)
            _this.vrview = new VRView.Player('#vrview', _this.props.config);
            var hotspotsChildrenComponents = _this.props.children;
            React.Children.map(hotspotsChildrenComponents, function (hotspotChildComponent) {
                var hotspot = hotspotChildComponent.props.data;
                var loadSceneOnClick = hotspotChildComponent.props.loadSceneOnClick;
                console.log('loadSceneOnClick', loadSceneOnClick);
                _this.vrview.on('ready', function () {
                    console.log('adding hotspot', hotspot);
                    _this.vrview.addHotspot(hotspot.name, {
                        pitch: hotspot.pitch,
                        yaw: hotspot.yaw,
                        radius: hotspot.radius,
                        distance: hotspot.distance
                    });
                }); //on
                _this.vrview.on('click', function (event) {
                    if ((event.id === hotspot.name) && loadSceneOnClick) {
                        _this.vrview.setContent({
                            image: loadSceneOnClick.image,
                            is_stereo: loadSceneOnClick.is_stereo
                        });
                    }
                    if ((event.id === hotspot.name) && !loadSceneOnClick) {
                        alert('Undefined destination scene');
                    }
                }); //on
            }); //map
        };
        window.addEventListener('load', onVrViewLoad);
    };
    //todo: esto a lo mejor deberia ir en VrviewHotspotCmp
    // hotspotClick( event: {id: string}, hotspotName: string ): void {
    // }
    // shouldComponentUpdate(){
    //   return false;
    // }
    // componentWillReceiveProps(){
    //   console.log('component will recive props', this.props.config);
    // }
    Vrview.prototype.componentDidUpdate = function () {
        console.log('component did update', this.props.config);
        this.vrview.setContent(this.props.config);
    };
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: '#vrview', ref: "vrview" }, this.props.children));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
