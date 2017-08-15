// todo: no usar estado, sencillamente pasar nuevo objeto de configuracion

import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import VrviewHotspot from './vrview/VrviewHotspotCmp';
import {IVrviewConfig} from './vrview/IVrviewConfig';

export class App extends React.Component<{}, IVrviewConfig> {

  state: IVrviewConfig = {
    width: '90%',
    height: 400,
    image: '../images/coral.jpg',
    is_stereo: true,
    is_debug: true
  };

  changeImage(){
    this.setState({image: '../images/walrus.jpg', is_stereo: true});
  }

  render(){
    return(
      <div>
        <h1>App</h1>

        <Vrview config={this.state} ref="vrview">
          <VrviewHotspot
            data={{name: 'hotspot1', pitch: 0, yaw: -35, radius: 0.05, distance: 2}}
            loadSceneOnClick={{image: '../images/walrus.jpg', is_stereo: true}} />
          <VrviewHotspot
            data={{name: 'hotspot2', pitch: 0, yaw: 0, radius: 0.05, distance: 2}}
            loadSceneOnClick={{image: '../images/1.jpg', is_stereo: false}}/>
        </Vrview>

        <button onClick={() => this.changeImage()}>cambiar imagen</button>
      </div>
    );
  }
}