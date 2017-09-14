//todo: revisar tipos de props y state
//todo: usar mapa (leaflet) y markers
//todo: probar en una rama nueva con polyfill create custom event
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
import {IScene} from "./interfaces/IScene";
import {IHotspot} from "./interfaces/IHotspot";
import {IVrviewPlayer} from "./interfaces/IVrviewPlayer";



/**
 * Vrview component creates a 3d scene with optional hotspots
 *
 * @Props: ISceneConfig
 * @State: ISceneConfig
 */
export default class Vrview extends React.Component<any, {}> {

  // Vrview Player object. Do not confuse with <Vrview> component
  vrviewPlayer: IVrviewPlayer;


  //todo: creacion de hotspot y click event handler individualmente para cada hotspot
  loadHotspots(): void {
    const hotspots = this.props.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      console.log('adding hotspot', hotspot);

      // Hotspot creation
      this.vrviewPlayer.addHotspot(hotspot.name, {
        pitch:    hotspot.pitch,
        yaw:      hotspot.yaw,
        radius:   hotspot.radius,
        distance: hotspot.distance
      });

      // debugger

      // Onclick event handler creation
      this.vrviewPlayer.on( 'click', (event: {id: string}) => {
        if(event.id === hotspot.name){
          // If there is a function defined by the user for the click event, run it
          hotspot.clickFn && hotspot.clickFn();

          // If there is newSecene defined for this hotspot, set state to new scene
          if(hotspot.idScene){
            console.log('hotspot clicked: ', hotspot, 'load new scene, id: ', hotspot.idScene);
            this.props.updateParent(hotspot.idScene);
          } else {
            alert('No Scene defined for hotspot');
          }
        }
      })

    });

    console.log('events: ', (this.vrviewPlayer as any)._events.click);
  }

  addHotspotsClickHandlers(): void {
    const hotspots = this.props.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      this.vrviewPlayer.on( 'click', (event: {id: string}) => {
        if(event.id === hotspot.name){
          // debugger
          // If there is a function defined by the user for the click event, run it
          if(hotspot.clickFn){
            hotspot.clickFn();
          } else {
            // If there is newSecene defined for this hotspot, set state to new scene
            if(hotspot.idScene){
              console.log('hotspot clicked: ', hotspot, 'load new scene, id: ', hotspot.idScene);
              this.props.updateParent(hotspot.idScene);
            } else {
              alert('No Scene defined for hotspot');
            }
          }
        }
      })
    });
  }

  /**
   * Component initialization. Executed after dom load
   */
  componentDidMount() {
    // console.log('component did mount');
    const onVrViewLoad = () => {
      // Vrview Player object creation
      this.vrviewPlayer = new VRView.Player('vrview', this.props.scene);
      this.vrviewPlayer.on('ready', () => {
        this.loadHotspots();
      });
      // this.addHotspotsClickHandlers();
    };
    window.addEventListener('load', onVrViewLoad);
  }

  /**
   * On change event. Executed after state changed
   */
  componentDidUpdate() {
    // setContent() must be executed asynchronously
    // This hack is due to Vrview way of working
    setTimeout( () => {
      this.clearHotspotsClickHandlers();
      if(this.vrviewPlayer){
        this.vrviewPlayer.setContent(this.props.scene);
        this.loadHotspots();
      }
    }, 0);
  }

  // componentWillReceiveProps(){
  //   console.log('component will receive props');
  // }

  clearHotspotsClickHandlers(): void {
    // debugger
    if(this.vrviewPlayer._events){
      if((this.vrviewPlayer._events as any).click){
        (this.vrviewPlayer._events as any).click.length = 0;
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
    let result: Window | any = undefined;
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
    const iframe: HTMLIFrameElement = document.querySelector('iframe') as HTMLIFrameElement;
    const iframeParentElement: HTMLDivElement = iframe.parentElement as HTMLDivElement;
    // To know debug state it is needed to search for a dom element with debug info in the vrview iframe
    // (not to use "state: scene.is_debug")
    scene.is_debug = !this.isDebugEnabled(iframe);
    scene.width = iframe.width;
    scene.height = iframe.height;
    this.setState(scene as any);
    iframeParentElement.removeChild(iframe);
    this.vrviewPlayer = new VRView.Player('vrview', this.props.scene);
  }

  /**
   * Find Scene By Id
   *
   * @param scenes {IScene}
   * @param id {number | string}
   */
/*
  findSceneById = (scenes: IScene[], id: number | string): any => {
    let result: any;
    if(scenes.hasOwnProperty("id") && scenes["id"] == id){
      result = scenes;
    }

    for( let i = 0; i < Object.keys(scenes).length; i++ ){
      if( typeof scenes[Object.keys(scenes)[i]] == "object" ){
        let obj: any = this.findSceneById( scenes[Object.keys(scenes)[i]], id );
        if(obj != null){
          result = obj;
        }
      }
    }
    return result;
  };
*/

  /**
   * Helper function to find scene by id
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