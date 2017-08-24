import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {ISceneConfig} from "./vrview/ISceneConfig";

export class App extends React.Component<{}, ISceneConfig> {

  initialState: ISceneConfig = {
    scene: {width: '90%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true},
    hotspots: [
      {name: 'hotspot1', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
        scene: {image: '../images/1.jpg', is_stereo: false},
        hotspots: [
          {name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
            scene: {image: '../images/petra.jpg', is_stereo: false}
          }},
          {name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
            scene: {image: '../images/2.jpg', is_stereo: false}}}
        ]
      }},
      {name: 'hotspot2', pitch: 0, yaw: -35, radius: 0.05, distance: 2}
    ]
  };

  constructor(){
    super();
    this.state = this.initialState;
  }

  changeScene = (): void => {
    this.setState({
      scene: {image: '../images/walrus.jpg', is_stereo: true},
      hotspots: []
    })
  };

  resetScene = (): void => {
    this.setState(this.initialState);
  };

  render(){
    return(
      <div>
        <h1>Virtual Reality View</h1>
        <Vrview {...this.state} />
        <button onClick={this.changeScene}>Change Scene</button>&nbsp;
        <button onClick={this.resetScene}>Reset Scene</button>
      </div>
    );
  }
}