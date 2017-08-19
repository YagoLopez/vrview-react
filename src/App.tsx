import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {ISceneConfig} from './vrview/ISceneConfig';

export class App extends React.Component<{}, ISceneConfig> {

  state: ISceneConfig = {
    scene: {width: '90%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true},
    hotspots: [
      {name: 'hotspot1', pitch: 0, yaw: -35, radius: 0.05, distance: 2, loadNewSceneOnClick: {
        scene: {image: '../images/1.jpg', is_stereo: false},
        hotspots: [{name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, loadNewSceneOnClick: {
            scene: {image: '../images/2.jpg', is_stereo: false}
          }
        }]
      }},
      {name: 'hotspot2', pitch: 0, yaw: 0, radius: 0.05, distance: 2}
    ]
  };

  changeScene(): void {
    this.setState({
      scene: {image: '../images/walrus.jpg', is_stereo: true},
      hotspots: [{name: 'hotspot2', pitch: 0, yaw: -20, radius: 0.05, distance: 2}]
    });
  }

  // todo: investigar contenido de this.vrview._events
  changeScene2(){
    debugger
    (this.refs.vrviewComponent as any).vrview.setContent({
      image: '../images/1.jpg',
      is_stereo: false
    })
  }

  render(){
    return(
      <div>
        <h1>Virtual Reality View</h1>

        {/*todo: cambiar ref string por callback*/}
        <Vrview config={this.state} ref="vrviewComponent" />

        <button onClick={() => this.changeScene()}>cambiar escena</button>
        <button onClick={() => this.changeScene2()}>cambiar escena</button>
      </div>
    );
  }
}