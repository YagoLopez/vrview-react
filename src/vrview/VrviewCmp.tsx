//todo: buscar e incluir tipos (@type) para vrview
//todo: quitar # en div id de vrview
//todo: is_debug prop = true/false

import * as React from 'react';
import * as VRView from  './vrview.js';
import {IVrviewConfig} from './IVrviewConfig';

export default class Vrview extends React.Component<{config: IVrviewConfig}, {}> {

  //todo: definir tipo/interfaz para vrview
  vrview: any;

  componentDidMount() {
    const onVrViewLoad = () => {

      //todo: (refactor) (probar en nueva branch) esto debería estar en el estado y funcionar como single source of true para subcomponentes (hotspots)
      this.vrview = new VRView.Player('#vrview', this.props.config);
      const hotspotsChildrenComponents = this.props.children;

      React.Children.map( hotspotsChildrenComponents, (hotspotChildComponent) => {

        const hotspot = (hotspotChildComponent as any).props.data;
        const loadSceneOnClick = (hotspotChildComponent as any).props.loadSceneOnClick;
        console.log('loadSceneOnClick', loadSceneOnClick);

        this.vrview.on('ready', () => {
          console.log('adding hotspot', hotspot);
          this.vrview.addHotspot(hotspot.name, {
            pitch: hotspot.pitch,
            yaw: hotspot.yaw,
            radius: hotspot.radius,
            distance: hotspot.distance
          })
        }); //on

        this.vrview.on('click', (event: {id: string}) => {
          if ( (event.id === hotspot.name) && loadSceneOnClick ) {
            this.vrview.setContent({
              image: loadSceneOnClick.image,
              is_stereo: loadSceneOnClick.is_stereo
            });
          }
          if( (event.id === hotspot.name) && !loadSceneOnClick) {
            alert('Undefined destination scene');
          }
        }); //on

      }); //map

    };

    window.addEventListener('load', onVrViewLoad);

  }

  //todo: esto a lo mejor deberia ir en VrviewHotspotCmp
  // hotspotClick( event: {id: string}, hotspotName: string ): void {
  // }

  // shouldComponentUpdate(){
  //   return false;
  // }

  // componentWillReceiveProps(){
  //   console.log('component will recive props', this.props.config);
  // }

  componentDidUpdate() {
    console.log('component did update', this.props.config);
    this.vrview.setContent(this.props.config);
  }

  render() {
    return (
      <div id='#vrview' ref="vrview">
        {this.props.children}
      </div>
    );
  }
}