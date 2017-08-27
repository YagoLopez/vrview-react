import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {ISceneConfig} from "./vrview/ISceneConfig";

export class App extends React.Component<{}, ISceneConfig> {

  initialProps: ISceneConfig = {
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

  componentDidMount(){
    // State is only mantained in Vrview Component not in this parent component
    (this.refs.vrview as Vrview).setState(this.initialProps);
  }

  changeScene = (): void => {
    (this.refs.vrview as Vrview).setState({
      scene: {image: '../images/walrus.jpg', is_stereo: true},
      hotspots: [
        {name: 'hotspot5', pitch: -20, yaw: -25, radius: 0.05, distance: 2, clickFn: () => alert('Function executed')}
      ]
    })
  }

  resetScene = (): void => {
    // Important clean onClick event when reset scene
    const vrview = this.refs.vrview as Vrview;
    vrview.clearHotspotsClickHandlers();
    vrview.setState(this.initialProps)
  }

  toggleDebugMode = (): void => {
    (this.refs.vrview as Vrview).toggleDebugMode()
  }

  render(){
    return(
      <div>
        <h1>Virtual Reality View</h1>
        <Vrview {...this.initialProps} ref="vrview" />
        <button onClick={this.changeScene}>Change Scene</button>&nbsp;
        <button onClick={this.resetScene}>Reset Scene</button>&nbsp;
        <button onClick={this.toggleDebugMode}>Toggle Debug Mode</button>
      </div>
    );
  }
}