//todo: favicon
//todo: añadir enlace a conversion de formato de cardboard
//todo: revisar hotspot id en vrview.js
//todo: usar mapa (leaflet) y markers
//todo: probar en una rama nueva con polyfill create custom event for browser compatibility
//todo: modificar la plantilla "index.html" en /node_modules/react-scripts para limar detalles
//todo: hacer algunos test
//todo: service worker y manifest.json
//todo: probar con video y las funciones de reproduccion de video
//todo: hotspot editor (user creates hotspots when clicking on scene)
//todo: test con browser stack
//todo: hacer instalacion de prueba siguiendo pasos de readme.md
//todo: usar callback function con "refs"
//todo: usar fade-in en texto pie de imagen
//todo: text to speech?
//todo: revisar toggle debug mode. debe ser mostrado u ocultado en funcion de estado de componente (declarativamente)
// no imperativamente como ahora
//todo: about page
//todo: establecer debug mode al cambiar de escena (ahora solo se hace onComponentDidMount())
//todo: habria que crear una clase scenes con findSceneById(), es decir, modelar el dominio?

import * as React from "react";
import * as VRView from  "./vrview.js";
import {IScene} from "./interfaces/IScene";
import {IHotspot} from "./interfaces/IHotspot";
import {IVrviewPlayer} from "./interfaces/IVrviewPlayer";



/**
 * Vrview Component creates a 3d scene with optional hotspots
 * It receives scene data as props from parent component
 *
 * @Props: {IVrviewConfig} Object implementing IVrviewConfig interface with scene data
 */
export default class Vrview extends React.Component<IScene, {}> {

  // Vrview Player object. Do not confuse with <Vrview> component
  vrviewPlayer: IVrviewPlayer;

  /**
   * Loads hotspot configuration data from props
   */
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
        // If there is a function defined by the user for the click event, execute it
        if(hotspot.clickFn){
          eval(hotspot.clickFn);
        } else {
          // If there is newSecene defined for this hotspot, set state to new scene
          if(hotspot.idNewScene){
            this.props.onClickHotspot && this.props.onClickHotspot(hotspot.idNewScene);
          } else {
            alert('No Scene defined for hotspot: ' + event.id);
          }
        }
      }
    })
  }

  /**
   * Component initialization after dom loading
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
   * On change event, executed after state changes
   * Note: VrviewPlayer.setContent() must be executed asynchronously
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
   * Get iframe window object from parent document where 3d canvas scene exists
   */
  getIframe = (): HTMLIFrameElement => {
    const iframe = document.querySelector('#vrview')!.querySelector('iframe') as HTMLIFrameElement;
    !iframe && console.warn('Vrview iframe not found');
    return iframe;
  };

  /**
   * Show loader text inside iframe when content is loading
   *
   * The loader will be hidden when scene is completely loaded
   * See: "public/vrview/embed.js" -> "WorldRenderer.prototype.didLoad_()"
   */
  showLoader = (): void => {
    const iframe = this.getIframe();
    const loader = iframe.contentDocument.getElementById('loader') as HTMLDivElement;
    loader && loader.classList.add('visible');
  };

  /**
   * Find out if canvas debug info is enabled
   *
   * @param {HTMLIFrameElement} iframe containing 3d scene
   * @returns {boolean}
   */
  isDebugEnabled(iframe: HTMLIFrameElement): boolean {
    return (iframe.contentDocument.querySelector('#stats') != null);
  };

  /**
   * Toggle Canvas Debug Mode
   * To enable/disable debug mode it is needed to create a new Vrview Player object and reload the scene
   * It is not enough to change 'is_debug' field in the state
   */
  toggleDebugMode(): void {
    this.clearHotspotsClickHandlers();
    const scene = this.props.scene;
    // const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    const iframe = this.getIframe();
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
   * Helper function to find scene by id in an array of scenes
   *
   * @param scenes {IScene[]} Array of scenes
   * @param id {number | string} Scene id
   * @returns {IScene} Scene searched
   */
  findSceneBydId = (scenes: IScene[], id: number | string): IScene | void => {
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