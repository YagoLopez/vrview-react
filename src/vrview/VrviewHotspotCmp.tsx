//todo: (refactor) cambiar definicion de componente de clase a funcion (componente funcional)

import * as React from 'react';
import {IHotspot} from './IHotspot';
import {IVrviewConfig} from "./IVrviewConfig";

export default class VrviewHotspot extends React.Component<{data: IHotspot, loadSceneOnClick?: IVrviewConfig}, {}> {

/*
  constructor(props: any){
    super(props);
    // console.log('hotspot state', this.state);
    // console.log('hotspot props', this.props);
  }
*/

  componentWillMount(){
    console.log('VrviewHotspot will mount');
  }

  componentDidMount(){
    console.log('VrviewHotspot did mount');
  }

  render(){
    return null;
  };
}