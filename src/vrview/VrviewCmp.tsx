//todo: buscar e incluir tipos (@type) para vrview
//todo: quitar # en div id de vrview
//todo: is_debug prop = true/false
//todo: eliminar manejadores de eventos para evitar perdidas de memoria (vrview.on)

import * as React from 'react';
import * as VRView from  './vrview.js';
import {ISceneConfig} from './ISceneConfig';
import {IHotspot} from "./IHotspot";

export default class Vrview extends React.Component<{config: ISceneConfig}, {}> {

  //todo: definir tipo/interfaz para vrview
  vrview: any;
  //todo: add type information to state
  state: any = this.props;

  //todo: refactor this fn
  loadHotspots(): void {
    // this.vrview.on('ready', () => {
      const hotspots = this.state.config.hotspots as IHotspot[];
      hotspots && hotspots.forEach( (hotspot: IHotspot) => {
        console.log('adding hotspot', hotspot);
        this.vrview.addHotspot(hotspot.name, {
          pitch: hotspot.pitch,
          yaw: hotspot.yaw,
          radius: hotspot.radius,
          distance: hotspot.distance
        });
      });
    // });
  }

  addHotspotsClickHandlers() : void {
    const hotspots = this.props.config.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      this.vrview.on( 'click', (event: {id: string}) => {
        if(event.id === hotspot.name){
          console.log('hotspot click event handler', hotspot);
          this.setState({config: hotspot.newScene})
        }
      })
    });
  }

  /**
   * After view init
   */
  componentDidMount() {
    const onVrViewLoad = () => {
      console.log('vrview props on load', this.props);
      console.log('vrview state on load', this.state);
      this.vrview = new VRView.Player('vrview', this.state.config.scene);
      this.vrview.on('ready', () => {
        this.loadHotspots();
      });
      this.addHotspotsClickHandlers();
    };
    window.addEventListener('load', onVrViewLoad);
  }

  // shouldComponentUpdate(){
  //   return false;
  // }

  componentWillReceiveProps(){
    console.log('component will recive props, props', this.props);
  }

  /**
   * On State Change
   */
  componentDidUpdate() {
    console.log('component did update, state:', this.state);

    // Load new scene content data from state
    this.vrview.setContent(this.state.config.scene);

    // Load hotspots
    this.loadHotspots();

    // Load hotspots event handlers
    // debugger
    const hotspots = this.state.config.hotspots as IHotspot[];
    hotspots && hotspots.forEach( (hotspot: IHotspot) => {
      this.vrview.on( 'click', (event: {id: string}) => {
        if(event.id === hotspot.name){
          console.log('hotspot click event handler', hotspot);
          this.setState({config: hotspot.newScene})
        }
      })
    });
  }

  render() {
    return (<div id='vrview' />)
  }
}