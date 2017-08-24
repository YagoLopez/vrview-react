//todo: nueva rama: usar solo estado en VrviewCmp.tsx
//todo: no funciona el cambio de estado desde el boton
//todo: buscar e incluir tipos (@type) para vrview
//todo: eliminar manejadores de eventos para evitar perdidas de memoria (vrview.on)
//todo: is_debug on/off (usar parametros url?)
//todo: modificar la plantilla "index.html" en /node_modules/react-scripts para limar detalles
//todo: hacer algunos test
//todo: favicon
//todo: añadir enlace a conversion de formato de cardboard
//todo: service worker y manifest.json

import * as React from 'react';
import * as VRView from  './vrview.js';
import {ISceneConfig} from "./ISceneConfig";
import {IHotspot} from "./IHotspot";

export default class Vrview extends React.Component<ISceneConfig, ISceneConfig> {

  //todo: definir tipo/interfaz para vrview
  vrview: any;
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
          if(hotspot.newScene){
            console.log('click event for hotspot: ', hotspot);
            this.setState({scene: hotspot.newScene.scene, hotspots: hotspot.newScene.hotspots});
          } else {
            alert('No Scene defined for hotspot')
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
    if(this.state.scene){
      // Load new scene content data from state
      this.vrview.setContent(this.state.scene);
      this.loadHotspots();
      this.addHotspotsClickHandlers()
    } else {
      alert('No scene defined for hotspot');
    }
  }

  /**
   * State can be changed by the own component clicking on hotspots or
   * from parent component passing it as props to this component. In this case
   * this lifecycle method is used to change state.
   *
   * An example of this is changing state in parent component using a botton
   */
  componentWillReceiveProps(newProps: ISceneConfig){
    this.setState(newProps);
  }

  render() {
    return (<div id='vrview' />)
  }
}