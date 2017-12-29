import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Vrview from './VrviewCmp';
import {IScene} from "./interfaces/IScene";

const scene: IScene = {
  scene: {id: 1, width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true}
};

describe('<Vrview/>', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Vrview {...scene} />, div);
  });

  // it('matches snapshot', () => {
  //   const component = TestRenderer.create(<Vrview>Pag Vrview Content</Vrview>);
  //   expect(component.toJSON()).toMatchSnapshot();
  // });

});
