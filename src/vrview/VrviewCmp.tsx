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
//todo: hotspot editor (user creates hotspots when clicking on scene)

import * as React from "react";
import * as VRView from  "./vrview.js";
import {ISceneConfig} from "./ISceneConfig";
import {IHotspot} from "./IHotspot";

export default class Vrview extends React.Component<ISceneConfig, ISceneConfig> {

  //todo: definir tipo/interfaz para vrview
  // Vrview object (or scene object)
  vrview: any;

  // Initial state id defined by parent's props
  state: ISceneConfig = this.props;

  loadHotspots(): void {
    const hotspots = this.state.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      console.log('adding hotspot', hotspot);
      // console.log('adding hotspots, event', this.vrview._events.click);
      this.vrview.addHotspot(hotspot.name, {
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
      // Hotspot clicked
      this.vrview.on( 'click', (event: {id: string}) => {
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
      // Vrview object creation
      this.vrview = new VRView.Player('vrview', this.state.scene);
      this.vrview.on('ready', () => {
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
    if(this.vrview){
      this.vrview.setContent(this.state.scene);
      this.loadHotspots();
      this.addHotspotsClickHandlers()
    }
  }

  clearHotspotsClickHandlers(): void {
    if(this.vrview._events){
      if(this.vrview._events.click){
        this.vrview._events.click.length = 0;
      }
    }
  }

  /**
   * Get iframe window where is 3d canvas scene
   * @param iframe_object
   * @returns {Window}
   */
  getIframeWindow = (iframe_object: any): Window => {
    let result: any = undefined;
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
   * To enable/disable debug mode it is needed to create a new VRView object.
   * It is not enough to change state field 'is_debug'
   */
  toggleDebugMode(): void {
    this.clearHotspotsClickHandlers();
    const scene = this.state.scene;
    const iframe: HTMLIFrameElement = document.querySelector('iframe') as HTMLIFrameElement;
    const parentElement: HTMLDivElement = iframe.parentElement as HTMLDivElement;
    scene.is_debug = !this.isDebugEnabled(iframe);
    scene.width = iframe.width;
    scene.height = iframe.height;
    this.setState(scene as any);
    parentElement.removeChild(iframe);
    this.vrview = new VRView.Player('vrview', this.state.scene);
  }

  render() {
    return (<div id='vrview' />)
  }
}