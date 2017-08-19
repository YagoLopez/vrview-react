//todo: es subcomponente hotspot deberia recibir el objeto vrView como prop???
//todo: crear los hotspots en el evento onLoad

//todo: (refactor) cambiar definicion de componente de clase a funcion (componente funcional)

import * as React from 'react';
import {IHotspot} from './IHotspot';
import {ISceneConfig} from "./IVrviewConfig";

export default class VrviewHotspot extends React.Component<{data: IHotspot, newScene?: ISceneConfig}, {}> {

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
    console.log('VrviewHotspot did mount, props: ', this.props);
    console.log('VrviewHotspot this.refs: ', this.refs);
  }

  render(){
    return null;
  };
}