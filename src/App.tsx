import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {ISceneConfig} from "./vrview/interfaces/ISceneConfig";

export class App extends React.Component<{}, {}> {

  // Reference to Vrview component
  vrviewCmp: Vrview;

  // Scene configuration with images, hotspots and navigation
  // It is passed to <Vrview/> as props
  sceneConfig: ISceneConfig = {
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

  /**
   * Change scene programatically.
   * State is only mantained in <Vrview/>, not in this <App/> parent component
   * This is to manage rendering of <Vrview/> with life-cycle methods
   */
  changeScene = (): void => {
    this.vrviewCmp.setState({
      scene: {image: '../images/walrus.jpg', is_stereo: true},
      hotspots: [
        {name: 'hotspot5', pitch: -20, yaw: -25, radius: 0.05, distance: 2, clickFn: () => alert('Function executed')}
      ]
    })
  };

  /**
   * To reset scene is needed to clear hotspot click handlers
   */
  resetScene = (): void => {
    this.vrviewCmp.clearHotspotsClickHandlers();
    this.vrviewCmp.setState(this.sceneConfig);
  };

  /**
   * In debug mode a small window indicates FPS (frames per second) in canvas
   */
  toggleDebugMode = (): void => {
    this.vrviewCmp.toggleDebugMode()
  };

  render(){
    return(
      <div>
        <h1>Virtual Reality View</h1>
        <Vrview {...this.sceneConfig} ref={(vrview: Vrview) => {this.vrviewCmp = vrview}} />
        <button onClick={this.changeScene}>Change Scene Programatically</button>&nbsp;
        <button onClick={this.resetScene}>Reset Scene</button>&nbsp;
        <button onClick={this.toggleDebugMode}>Toggle Debug Mode</button>
      </div>
    );
  }
}