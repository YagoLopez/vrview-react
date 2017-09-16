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
//todo: parece que aqui esta el problema. usar "require()"
var VRView = require("./vrview.js");
// import {IScene} from "./interfaces/IScene";
// import {IHotspot} from "./interfaces/IHotspot";
// import {IVrviewPlayer} from "./interfaces/IVrviewPlayer";
/**
 * Vrview component creates a 3d scene with optional hotspots
 * It receives the data of the scene as props
 *
 * @Props: ISceneConfig
 */
var Vrview2 = (function (_super) {
    __extends(Vrview2, _super);
    function Vrview2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Vrview Player object. Do not confuse with <Vrview> component
    // vrviewPlayer: IVrviewPlayer;
    /*
      loadHotspots(): void {
        const hotspots = this.props.hotspots as IHotspot[];
        hotspots && hotspots.forEach( (hotspot: IHotspot) => {
          // console.log('adding hotspot', hotspot);
          this.createHotspot(hotspot);
          this.addClickHandler(hotspot);
        });
      }
    */
    /*
      createHotspot(hotspot: IHotspot): void {
        this.vrviewPlayer.addHotspot(hotspot.name, {
          pitch:    hotspot.pitch,
          yaw:      hotspot.yaw,
          radius:   hotspot.radius,
          distance: hotspot.distance
        });
      }
    */
    /*
      addClickHandler(hotspot: IHotspot): void {
        this.vrviewPlayer.on( 'click', (event: {id: string}) => {
          if(event.id === hotspot.name){
            // If there is a function defined by the user for the click event, run it
            if(hotspot.clickFn){
              eval(hotspot.clickFn);
            } else {
              // If there is newSecene defined for this hotspot, set state to new scene
              if(hotspot.idNewScene){
                this.props.onClickHotspot && this.props.onClickHotspot(hotspot.idNewScene);
              } else {
                alert('No Scene defined for hotspot');
              }
            }
          }
        })
      }
    */
    /**
     * Component initialization. Executed after dom load
     */
    Vrview2.prototype.componentDidMount = function () {
        debugger;
        console.log('VRView, ', VRView);
        /*
        const onVrViewLoad = () => {
          // Vrview Player object creation
          this.vrviewPlayer = new VRView.Player('vrview', this.props.scene);
          this.vrviewPlayer.on('ready', () => {
            // this.loadHotspots();
          });
        };
        window.addEventListener('load', onVrViewLoad);
    */
    };
    /**
     * On change event. Executed after state changed
     * Function setContent() must be executed asynchronously
     * This hack is due to how Vrview and EventEmmitters works in vrview.js
     */
    /*
      componentDidUpdate() {
        setTimeout( () => {
          this.clearHotspotsClickHandlers();
          if(this.vrviewPlayer){
            this.vrviewPlayer.setContent(this.props.scene);
            this.loadHotspots();
          }
        }, 0);
      }
    */
    /*
      clearHotspotsClickHandlers(): void {
        if(this.vrviewPlayer._events){
          if(this.vrviewPlayer._events.click){
            this.vrviewPlayer._events.click.length = 0;
          }
        }
      }
    */
    /**
     * Get window object from iframe where 3d canvas scene exists
     *
     * @param iframe_object
     * @returns {Window}
     */
    /*
      getIframeWindow = (iframe_object: any): Window => {
        let result: Window | any = undefined;
        if (iframe_object.contentWindow) {
          result = iframe_object.contentWindow;
        }
        if (iframe_object.window) {
          result = iframe_object.window;
        }
        return result;
      };
    */
    /*
      isDebugEnabled(iframe: HTMLIFrameElement): boolean {
        return (this.getIframeWindow(iframe)).document.querySelector('#stats') != null
      }
    */
    /**
     * Toggle Canvas Debug Mode
     * To enable/disable debug mode it is needed to create a new Vrview Player object.
     * It is not enough to change 'is_debug' field in the state
     */
    /*
      toggleDebugMode(): void {
        this.clearHotspotsClickHandlers();
        const scene = this.props.scene;
        const iframe = document.querySelector('iframe') as HTMLIFrameElement;
        const iframeParentElement: HTMLDivElement = iframe.parentElement as HTMLDivElement;
        // To know debug state it is needed to search for a dom element with debug info in the vrview iframe
        // (not to use "state: scene.is_debug")
        scene.is_debug = !this.isDebugEnabled(iframe);
        scene.width = iframe.width;
        scene.height = iframe.height;
        iframeParentElement.removeChild(iframe);
        this.vrviewPlayer = new VRView.Player('vrview', this.props.scene);
      }
    */
    /**
     * Helper function to find scene by id
     *
     * @param scenes {IScene[]} Array of scenes
     * @param id {number | string} Scene id
     * @returns {IScene} Scene searched
     */
    /*
      findSceneBydId = (scenes: IScene[], id: number | string): IScene | void => {
        for(let i = 0; i < scenes.length; i++){
          if(scenes[i].scene.id === id){
            return scenes[i];
          }
        }
      };
    */
    Vrview2.prototype.render = function () {
        // return (<div id='vrview' />)
        return (React.createElement("div", null, "test"));
    };
    return Vrview2;
}(React.Component));
exports.default = Vrview2;
