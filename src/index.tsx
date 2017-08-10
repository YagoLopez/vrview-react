import * as React from "react";
import * as ReactDOM from "react-dom";
import Vrview from "./VrviewCmp";
import {IVrviewConfig} from "./IVrviewConfig";

const config: IVrviewConfig = {
  width: '90%',
  height: 400,
  image: '../images/coral.jpg',
  is_stereo: true,
  is_debug: true
};

ReactDOM.render(<Vrview config={config} />, document.getElementById('root') as HTMLElement);