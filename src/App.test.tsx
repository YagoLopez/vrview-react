import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as TestRenderer from 'react-test-renderer';
import {App} from "./App";
import {IScene} from "./vrview/interfaces/IScene";

const scene: IScene = {
  scene: {id: 1, width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true}
};

describe('<App/>', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

});

