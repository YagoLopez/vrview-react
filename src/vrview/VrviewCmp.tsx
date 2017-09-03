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

import * as React from "react";
import * as VRView from  "./vrview.js";
import {ISceneConfig} from "./interfaces/ISceneConfig";
import {IHotspot} from "./interfaces/IHotspot";
import {IVrviewPlayer} from "./interfaces/IVrviewPlayer";

/**
 * Vrview component creates a 3d scene with optional hotspots
 * @Props: ISceneConfig
 * @State: ISceneConfig
 */
export default class Vrview extends React.Component<ISceneConfig, ISceneConfig> {

  // Vrview Player object. Do not confuse with <Vrview/> component
  vrviewPlayer: IVrviewPlayer;

  // Initial state is defined by props passed by parent component
  state: ISceneConfig = this.props;

  loadHotspots(): void {
    const hotspots = this.state.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      console.log('adding hotspot', hotspot);
      // console.log('adding hotspots, event', this.vrview._events.click);
      this.vrviewPlayer.addHotspot(hotspot.name, {
        pitch:    hotspot.pitch,
        yaw:      hotspot.yaw,
        radius:   hotspot.radius,
        distance: hotspot.distance
      });
    });
  }

  addHotspotsClickHandlers(): void {
    const hotspots = this.state.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      this.vrviewPlayer.on( 'click', (event: {id: string}) => {
        if(event.id === hotspot.name){
          // If there is function defined by the user for the click event, run it
          if(hotspot.clickFn){
            hotspot.clickFn();
          } else {
            // If there is newSecene defined for this hotspot, set state to new scene
            if(hotspot.newScene){
              console.log('click event for hotspot: ', hotspot);
              this.setState({scene: hotspot.newScene.scene, hotspots: hotspot.newScene.hotspots});
            } else {
              alert('No Scene defined for hotspot');
            }
          }
        }
      })
    });
  }

  /**
   * Executed after dom load
   */
  componentDidMount() {
    const onVrViewLoad = () => {
      // Vrview Player object creation
      this.vrviewPlayer = new VRView.Player('vrview', this.state.scene);
      this.vrviewPlayer.on('ready', () => {
        this.loadHotspots();
      });
      this.addHotspotsClickHandlers();
    };
    window.addEventListener('load', onVrViewLoad);
  }

  /**
   * Executed after state changed
   */
  componentDidUpdate() {
    if(this.vrviewPlayer){
      this.vrviewPlayer.setContent(this.state.scene);
      this.loadHotspots();
      this.addHotspotsClickHandlers()
    }
  }

  clearHotspotsClickHandlers(): void {
    if(this.vrviewPlayer._events){
      if((this.vrviewPlayer._events as any).click){
        (this.vrviewPlayer._events as any).click.length = 0;
      }
    }
  }

  /**
   * Get window object from iframe where 3d canvas scene exists
   * @param iframe_object
   * @returns {Window}
   */
  getIframeWindow = (iframe_object: any): Window => {
    let result: Window | any = undefined;
    if (iframe_object.contentWindow) {
      result = iframe_object.contentWindow;
    }
    if (iframe_object.window) {
      result = iframe_object.window;
    }
    return result;
  }

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
    const scene = this.state.scene;
    const iframe: HTMLIFrameElement = document.querySelector('iframe') as HTMLIFrameElement;
    const iframeParentElement: HTMLDivElement = iframe.parentElement as HTMLDivElement;
    // To know debug state it is needed to search for a dom element with debug info in the vrview iframe
    // (not to use "state: scene.is_debug")
    scene.is_debug = !this.isDebugEnabled(iframe);
    scene.width = iframe.width;
    scene.height = iframe.height;
    this.setState(scene as any);
    iframeParentElement.removeChild(iframe);
    this.vrviewPlayer = new VRView.Player('vrview', this.state.scene);
  }

  render() {
    return (<div id='vrview' />)
  }
}