"use strict";
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
var VRView = require("./lib/vrview.js");
var Vrview = (function (_super) {
    __extends(Vrview, _super);
    function Vrview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor(props: any){
    //   super(props);
    // }
    Vrview.prototype.shouldComponentUpdate = function () {
        return false;
    };
    Vrview.prototype.componentDidMount = function () {
        var _this = this;
        var onVrViewLoad = function () { new VRView.Player('#vrview', _this.props.config); };
        window.addEventListener('load', onVrViewLoad);
    };
    // componentWillReciveProps(){
    //
    // }
    Vrview.prototype.render = function () {
        return (React.createElement("div", { id: "#vrview" }));
    };
    return Vrview;
}(React.Component));
exports.default = Vrview;
