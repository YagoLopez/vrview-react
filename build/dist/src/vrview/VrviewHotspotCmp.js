"use strict";
//todo: es subcomponente hotspot deberia recibir el objeto vrView como prop???
//todo: crear los hotspots en el evento onLoad
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
//todo: (refactor) cambiar definicion de componente de clase a funcion (componente funcional)
var React = require("react");
var VrviewHotspot = (function (_super) {
    __extends(VrviewHotspot, _super);
    function VrviewHotspot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
      constructor(props: any){
        super(props);
        // console.log('hotspot state', this.state);
        // console.log('hotspot props', this.props);
      }
    */
    VrviewHotspot.prototype.componentWillMount = function () {
        console.log('VrviewHotspot will mount');
    };
    VrviewHotspot.prototype.componentDidMount = function () {
        console.log('VrviewHotspot did mount, props: ', this.props);
        console.log('VrviewHotspot this.refs: ', this.refs);
    };
    VrviewHotspot.prototype.render = function () {
        return null;
    };
    ;
    return VrviewHotspot;
}(React.Component));
exports.default = VrviewHotspot;
