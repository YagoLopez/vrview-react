import * as React from 'react';
import * as VRView from  './lib/vrview.js';
import {IVrviewConfig} from "./IVrviewConfig";

export default class Vrview extends React.Component<{config: IVrviewConfig}, {}> {

  // constructor(props: any){
  //   super(props);
  // }

  shouldComponentUpdate(){
    return false;
  }

  componentDidMount(){
    const onVrViewLoad = () => { new VRView.Player('#vrview', this.props.config) };
    window.addEventListener('load', onVrViewLoad);
  }

  // componentWillReciveProps(){
  //
  // }

  render() {
    return (<div id="#vrview" />);
  }

}