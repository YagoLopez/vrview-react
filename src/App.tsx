import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {ISceneConfig} from "./vrview/interfaces/ISceneConfig";

import {Fabric} from "office-ui-fabric-react/lib/Fabric";
import {CommandBar} from "office-ui-fabric-react/lib/CommandBar";
import {IContextualMenuItem, ContextualMenuItemType} from "office-ui-fabric-react/lib/ContextualMenu";
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
import {Nav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav';
import {DocumentCard, DocumentCardTitle, DocumentCardActivity}
  from 'office-ui-fabric-react/lib/DocumentCard';



export class App extends React.Component<{}, {}> {

  // Reference to Vrview component
  vrviewCmp: Vrview;

  // Scene configuration contains images, hotspots and navigation between scenes
  // It is passed to <Vrview/> as props
  sceneConfig: ISceneConfig = {
    scene: {width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true},
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
   * This is to manage the rendering of <Vrview/> with life-cycle methods
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
   * To reset the scene to the initial config is needed to clear hotspot click handlers
   */
  resetScene = (): void => {
    this.vrviewCmp.clearHotspotsClickHandlers();
    this.vrviewCmp.setState(this.sceneConfig);
  };

  /**
   * Debug mode: a small window shows FPS (frames per second) in canvas
   */
  toggleDebugMode = (): void => {
    this.vrviewCmp.toggleDebugMode()
  };

  /**
   * When <Panel> is closed, state changes and this produces vrview subcomponent to re-render
   * This is not the desired behaviour.
   * This life-cylce method avoids re-renderings when <Panel> it is closed
   */

  showPanel = (): void => {
    (this.refs.panel as Panel).open();
  };

  renderPanelFooter = (): any => {
    const overlay: HTMLElement = document.querySelector('.ms-Overlay') as HTMLElement;
    overlay && overlay.addEventListener('click', function(){
      alert('hola');
    });
  };

  render(){

    const comandBarItems: IContextualMenuItem[] = [
      {
        key: 'menuBtn',
        icon: 'CollapseMenu',
        onClick: this.showPanel,
        title: 'Left Menu'
      },
      {
        key: 'divider',
        itemType: ContextualMenuItemType.Divider
      },
      {
        key: 'resetScene',
        name: 'Reset Scene',
        icon: 'RevToggleKey',
        onClick: this.resetScene,
        title: 'Return to Initial Scene'
      },
      {
        key: 'toggleDebugMode',
        name: 'Toggle Debug Mode',
        icon: 'PowerBILogo',
        onClick: this.toggleDebugMode,
        title: 'Change Debug Mode State'
      },
      {
        key: 'changeScene',
        name: 'Change Scene Programatically',
        icon: 'Org',
        onClick: this.changeScene,
        title: 'Change Scene by Code'
      }
    ];

    const navGroups: INavLinkGroup[] = [{
      links:
        [
          {
            name: 'Home',
            url: '',
            links: [{
              name: 'Show Panel',
              url: '',
              key: 'key1',
              onClick: this.showPanel
            },
              {
                name: 'News',
                url: 'http://msn.com',
                key: 'key2'
              }],
            isExpanded: true
          },
          { name: 'Documents', url: 'http://example.com', key: 'key3', isExpanded: true },
          { name: 'Pages', url: 'http://msn.com', key: 'key4' },
          { name: 'Notebook', url: 'http://msn.com', key: 'key5' },
          { name: 'Long Name Test for elipse', url: 'http://msn.com', key: 'key6' },
          {
            name: 'Edit',
            url: 'http://cnn.com',
            onClick: () => {alert('on click')},
            icon: 'Edit',
            key: 'key8'
          }
        ]
    }];

    return(
      <Fabric>

        <CommandBar isSearchBoxVisible={ false } items={ comandBarItems } className="command-bar" />

        <Panel ref="panel"
          type={ PanelType.smallFixedNear }
          onRenderFooter={ this.renderPanelFooter }
          headerText='Panel - Small, left-aligned, fixed'>
          <div className='ms-NavExample-LeftPane'>
            <Nav groups={ navGroups } expandedStateText={ 'expanded' } collapsedStateText={ 'collapsed' }
              selectedKey={ 'key3' } />
          </div>
        </Panel>

        <h1 className="centered">Virtual Reality View</h1>

        <DocumentCard className="layout shadow">
          {/* Vrview Component ------------------------------------------------------------- */}
          <Vrview {...this.sceneConfig} ref={ (vrview: Vrview) => {this.vrviewCmp = vrview} } />
          {/* /Vrview Component ------------------------------------------------------------ */}
          <DocumentCardTitle title='Revenue stream proposal fiscal year 2016 version02.pptx'/>
          <DocumentCardActivity
            activity='Created Feb 23, 2016'
            people={ [{name: 'Kat Larrson', profileImageSrc: require('./img/avatarkat.png')}] } />
        </DocumentCard>

      </Fabric>
    );
  }
}