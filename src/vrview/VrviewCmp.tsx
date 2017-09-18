//todo: revisar hotspot id en vrview.js
//todo: dismiss left menu panel on click overlay
//todo: usar mapa (leaflet) y markers
//todo: probar en una rama nueva con polyfill create custom event for browser compatibility
//todo: favicon
//todo: loader
//todo: modificar la plantilla "index.html" en /node_modules/react-scripts para limar detalles
//todo: hacer algunos test
//todo: añadir enlace a conversion de formato de cardboard
//todo: service worker y manifest.json
//todo: probar con video y las funciones de reproduccion de video
//todo: hotspot editor (user creates hotspots when clicking on scene)
//todo: revisar IVrview
//todo: test con browser stack
//todo: hacer instalacion de prueba siguiendo pasos de readme.md
//todo: usar callback function con "refs"
//todo: usar fade-in en pie de imagen
//todo: text to speech?
//todo: revisar toggle debug mode. debe ser mostrado u ocultado en funcion de estado de componente (declarativamente)
// no imperativamente como ahora
//todo: about page

import * as React from "react";
//todo: parece que aqui esta el problema. usar "require()"
import * as VRView from  "./vrview.js";
import {IVrviewConfig} from "./interfaces/IVrviewConfig";
import {IHotspot} from "./interfaces/IHotspot";
import {IVrviewPlayer} from "./interfaces/IVrviewPlayer";



/**
 * Vrview component creates a 3d scene with optional hotspots
 * It receives the data of the scene as props
 *
 * @Props: IVrviewConfig
 */
export default class Vrview extends React.Component<IVrviewConfig, {}> {

  // Vrview Player object. Do not confuse with <Vrview> component
  vrviewPlayer: IVrviewPlayer;

  loadHotspots(): void {
    const hotspots = this.props.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      // console.log('adding hotspot', hotspot);
      this.createHotspot(hotspot);
      this.addClickHandler(hotspot);
    });
  }

  createHotspot(hotspot: IHotspot): void {
    this.vrviewPlayer.addHotspot(hotspot.name, {
      pitch:    hotspot.pitch,
      yaw:      hotspot.yaw,
      radius:   hotspot.radius,
      distance: hotspot.distance
    });
  }

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

  /**
   * Component initialization. Executed after dom load
   */
  componentDidMount() {
    const onVrViewLoad = () => {
      // Vrview Player object creation
      this.vrviewPlayer = new VRView.Player('vrview', this.props.scene);
      this.vrviewPlayer.on('ready', () => {
        this.loadHotspots();
      });
    };
    window.addEventListener('load', onVrViewLoad);
  }

  /**
   * On change event. Executed after state changed
   * Function setContent() must be executed asynchronously
   * This hack is due to how Vrview and EventEmmitters works in vrview.js
   */
  componentDidUpdate() {
    setTimeout( () => {
      this.clearHotspotsClickHandlers();
      if(this.vrviewPlayer){
        this.vrviewPlayer.setContent(this.props.scene);
        this.loadHotspots();
      }
    }, 0);
  }

  clearHotspotsClickHandlers(): void {
    if(this.vrviewPlayer._events){
      if(this.vrviewPlayer._events.click){
        this.vrviewPlayer._events.click.length = 0;
      }
    }
  }

  /**
   * Get window object from iframe where 3d canvas scene exists
   *
   * @param iframe_object
   * @returns {Window}
   */
  getIframeWindow = (iframe_object: any): Window => {
    let result: Window | any;
    if (iframe_object.contentWindow) {
      result = iframe_object.contentWindow;
    }
    if (iframe_object.window) {
      result = iframe_object.window;
    }
    return result;
  };

  isDebugEnabled(iframe: HTMLIFrameElement): boolean {
    return (this.getIframeWindow(iframe)).document.querySelector('#stats') != null
  }

  /**
   * Toggle Canvas Debug Mode
   * To enable/disable debug mode it is needed to create a new Vrview Player object.
   * It is not enough to change 'is_debug' field in the state
   */
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

  /**
   * Helper function to find scene by id
   *
   * @param scenes {IVrviewConfig[]} Array of scenes
   * @param id {number | string} Scene id
   * @returns {IVrviewConfig} Scene searched
   */
  findSceneBydId = (scenes: IVrviewConfig[], id: number | string): IVrviewConfig | void => {
    for(let i = 0; i < scenes.length; i++){
      if(scenes[i].scene.id === id){
        return scenes[i];
      }
    }
  };

  render() {
    return (<div id='vrview' />)
  }
}