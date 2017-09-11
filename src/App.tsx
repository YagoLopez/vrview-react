//todo: scene description
//todo: loader
//todo: usar callback function con "refs"
//todo: a lo mejor en vez de tener anidadas las escenas era mejor tener un listado (array) de escenas
//todo: y cargar la nueva escena por su id

import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {ISceneConfig} from "./vrview/interfaces/ISceneConfig";

import {Fabric} from "office-ui-fabric-react/lib/Fabric";
import {CommandBar} from "office-ui-fabric-react/lib/CommandBar";
import {IContextualMenuItem, ContextualMenuItemType} from "office-ui-fabric-react/lib/ContextualMenu";
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
import {Nav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav';
import {DocumentCard, DocumentCardTitle} from 'office-ui-fabric-react/lib/DocumentCard';



const URL_CODE: string = 'https://github.com/YagoLopez/vrview-react/blob/bde928cf3507e0376a058a0df36634fb800e3158/src/App.tsx#L40';

export class App extends React.Component<{}, {}> {

  state: any = {};

  // Reference to Vrview Component
  vrviewCmp: Vrview;

  /**
   * Scene configuration. Contains images, hotspots and navigation between scenes
   * It is passed to <Vrview/> as props
   */
  sceneConfig: ISceneConfig = {
    scene:
      {
        id: 1,
        width: '100%',
        height: 400,
        image: '../images/coral.jpg',
        is_stereo: true,
        is_debug: true,
        title: 'Title scene 1',
        description: 'Description scene 1'
      },
    hotspots: [
      {name: 'hotspot1', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
        scene:
          {
            id: 2,
            image: '../images/landscape1.jpg',
            is_stereo: false,
            title: 'Title scene 2',
            description: 'Description scene 2'
          },
        hotspots: [
          {name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
            scene:
              {
                id: 3,
                image: '../images/palmbeach.jpg',
                is_stereo: false,
                title: 'Title scene 2',
                description: 'Description scene 3'
              }
          }},
          {name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
            scene:
              {
                id: 4,
                image: '../images/landscape2.jpg',
                is_stereo: false,
                title: 'Title scene 4',
                description: 'Description scene 4'
              }
          }}
        ]
      }},
      {name: 'hotspot2', pitch: 0, yaw: -35, radius: 0.05, distance: 2}
    ]
  };

  /**
   * Change scene programatically.
   * To change scene just set state with new data. State is only mantained in <Vrview>, not in <App> component
   * Reason for this is to manage the rendering of <Vrview> with its life-cycle methods
   */
  changeScene = (): void => {
    this.vrviewCmp.setState({
      scene: {id: 5, image: '../images/walrus.jpg', is_stereo: true},
      hotspots: [
        {name: 'hotspot5', pitch: -20, yaw: -25, radius: 0.05, distance: 2, clickFn: () => alert('Function executed')}
      ]
    })
  };

  /**
   * To reset the scene to the initial state is needed to clear hotspot click handlers
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
   * This function is used to close Left Menu Panel when clicking overlay (outside panel).
   * Left Menu Panel is created and deleted dynamically.
   * To get a reference to the overlay renderPanelFooter() is used
   */
  renderPanelFooter = (): any => {
    const overlay = document.querySelector('.ms-Overlay') as HTMLElement;
    if (overlay){
      overlay.addEventListener('mousedown', () => {
        this.hideLeftPanel();
      })
    }
  };

  showLeftPanel = (): void => {
    (this.refs.panel as Panel).open();
  };

  hideLeftPanel = (): void => {
    (this.refs.panel as Panel).dismiss();
  };

  resetSceneAndHideLeftMenu = (): void => {
    this.resetScene();
    this.hideLeftPanel();
  };

  changeSceneAndHideLeftMenu = (): void => {
    this.changeScene();
    this.hideLeftPanel()
  };

  toggleDebugModeAndHideLeftMenu = (): void => {
    this.toggleDebugMode();
    this.hideLeftPanel();
  };

  componentDidMount(){
    this.setState(this.vrviewCmp.state.scene);
  }

  updateState = (): void => {
    this.setState(this.vrviewCmp.state.scene);
  };

  render(){

    const topMenuItems: IContextualMenuItem[] = [
      {
        key: 'menuBtn',
        icon: 'CollapseMenu',
        onClick: this.showLeftPanel,
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
        key: 'more',
        name: 'Change Scene',
        icon: 'Org',
        items: [
          {
            key: 'changeScene',
            name: 'Change Scene Programatically',
            icon: 'DecreaseIndentLegacy',
            onClick: this.changeScene,
            title: 'Scene changed by code',
          },
          {
            key: 'viewCode',
            name: 'View Code',
            icon: 'IncreaseIndentLegacy',
            href: URL_CODE,
            target: '_blank'
          }
        ]
      }
    ];

    const leftMenuItems: INavLinkGroup[] = [{
      links:
        [
          { name: 'Reset Scene', url: '', key: 'resetScene', onClick: this.resetSceneAndHideLeftMenu },
          { name: 'Toggle Debug Mode', url: '', key: 'toggleDebugMode', onClick: this.toggleDebugModeAndHideLeftMenu },
          { name: 'Change Scene', url: '',
            links: [{
              name: 'Programatically',
              key: 'changeScene',
              url: '',
              onClick: this.changeSceneAndHideLeftMenu
            },
            {
              name: 'View Code',
              key: 'viewCode',
              url: URL_CODE,
              target: '_blank'
            }],
            isExpanded: true
          }
        ]
    }];

    return(
      <Fabric>

        <CommandBar isSearchBoxVisible={ false } items={ topMenuItems } className="command-bar" />

        <Panel
          ref="panel"
          type={ PanelType.smallFixedNear }
          onRenderFooter={ this.renderPanelFooter }
          headerText="React Component based on Google's Vrview Library">
          <div><Nav groups={ leftMenuItems } selectedKey={ 'resetScene' } /></div>
        </Panel>

        <h1 className="centered">Virtual Reality View</h1>

        <p>description: {(this.state as any).description}</p>
        <p>id: {(this.state as any).id}</p>


        <DocumentCard className="layout shadow">
          {/* Vrview Component ----------------------------------------------------------- */}
          <Vrview {...this.sceneConfig}
            ref={ (vrview: Vrview) => {this.vrviewCmp = vrview} }
            updateParent={ this.updateState } />
          {/* /Vrview Component ---------------------------------------------------------- */}
          <DocumentCardTitle title='Revenue stream proposal fiscal year 2016 version02.pptx'/>
        </DocumentCard>
{/*
        <p>
          <a href="javascript:void(0)"><img src="http://placehold.it/500x250" onClick={ this.changeScene } /></a>
        </p>
*/}

      </Fabric>
    );
  }
}