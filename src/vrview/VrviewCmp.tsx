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
//todo: hacer escena responsiva

import * as React from 'react';
import * as VRView from  './vrview.js';
import {ISceneConfig} from "./ISceneConfig";
import {IHotspot} from "./IHotspot";

export default class Vrview extends React.Component<ISceneConfig, ISceneConfig> {

  //todo: definir tipo/interfaz para vrview
  // Vrview object (Scene viewer)
  vrview: any;

  // Initial state comes from parent's props
  state: ISceneConfig = this.props;

  loadHotspots(): void {
    const hotspots = this.state.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      console.log('adding hotspot', hotspot);
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
      this.vrview.on( 'click', (event: {id: string}) => {
        if(event.id === hotspot.name){
          // If there are old click events, delete them
          if(this.vrview._events.click){
            this.vrview._events.click.length = 0;
          }
          // If there is newSecene defined for this hotspot click event, set state to new scene
          if(hotspot.newScene){
            console.log('click event for hotspot: ', hotspot);
            this.setState({scene: hotspot.newScene.scene, hotspots: hotspot.newScene.hotspots});
          } else {
            alert('No Scene defined for hotspot');
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

  render() {
    return (<div id='vrview' />)
  }
}