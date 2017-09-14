//todo: click on scene icon load scene in viewer
//todo: load scenes from scenes.json file
//todo: loader
//todo: usar callback function con "refs"
//todo: a lo mejor en vez de tener anidadas las escenas era mejor tener un listado (array) de escenas
//todo: y cargar la nueva escena por su id
//todo: usar fade-in en pie de imagen
//todo: text to speech?

import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {IScene} from "./vrview/interfaces/IScene";

import {Fabric} from "office-ui-fabric-react/lib/Fabric";
import {CommandBar} from "office-ui-fabric-react/lib/CommandBar";
import {IContextualMenuItem, ContextualMenuItemType} from "office-ui-fabric-react/lib/ContextualMenu";
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
import {Nav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav';
import {DocumentCard} from 'office-ui-fabric-react/lib/DocumentCard';
import {ChoiceGroup, IChoiceGroupOption} from 'office-ui-fabric-react/lib/ChoiceGroup';
import './App.css';



const URL_CODE: string = 'https://github.com/YagoLopez/vrview-react/blob/bde928cf3507e0376a058a0df36634fb800e3158/src/App.tsx#L40';

export class App extends React.Component<{}, IScene> {

  /**
   * List of scenes.
   *
   * Each scene object contains contains configuration information like: path to images/videos,
   * optional hotspots, navigation between scenes and other parameters. (See IScene interfaz definition)
   */
  scenes: IScene[] = [
    {
      "scene":
        {
          "id": 1,
          "width": "100%",
          "height": 400,
          "image": "../images/coral.jpg",
          "is_stereo": true,
          "is_debug": true,
          "title": "Title Scene 1",
          "description": "Underwater panorama with divers and coral reefs"
        },
      "hotspots": [
        {"name": "scene1-hotspot1", "pitch": 0, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 2},
        {"name": "scene1-hotspot2", "pitch": 0, "yaw": -35, "radius": 0.05, "distance": 2}
      ]
    },
    {
      "scene":
        {
          "id": 2,
          "image": "../images/landscape1.jpg",
          "is_stereo": false,
          "title": "Title Scene 2",
          "description": "This is the description of scene 2"
        },
      "hotspots": [
        {"name": "scene2-hotspot4", "pitch": 0, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 3},
        {"name": "scene2-hotspot3", "pitch": 0, "yaw": -35, "radius": 0.05, "distance": 2, "idNewScene": 4},
        {"name": "scene2-hotspot5", "pitch": -20, "yaw": -45, "radius": 0.05, "distance": 2,
          "clickFn": () => alert('Function executed')}
      ]
    },
    {
      "scene":
        {
          "id": 3,
          "image": "../images/palmbeach.jpg",
          "is_stereo": false,
          "title": "Title Scene 3",
          "description": "Tropical beach with palm trees"
        },
      "hotspots": [
        {"name": "scene2-hotspot4", "pitch": -10, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 4},
      ]
    },
    {
      "scene":
        {
          "id": 4,
          "image": "../images/landscape2.jpg",
          "is_stereo": false,
          "title": "Title Scene 4",
          "description": "This is the description of scene 4"
        }
    }
  ];

  state: IScene = this.scenes[0];

  // Reference to Vrview Component
  vrviewCmp: Vrview;

  /**
   * Change scene programatically.
   * To change scene just set state with new data. State is only mantained in <Vrview>, not in <App> component
   * Reason for this is to manage the rendering of <Vrview> with its life-cycle methods
   */
  changeScene = (): void => {
    this.setState({scene: this.scenes[2].scene, hotspots: this.scenes[2].hotspots})
  };

  /**
   * Reset scene to the initial state. It is needed to clear hotspot click handlers
   */
  resetScene = (): void => {
    this.setState({scene: this.scenes[0].scene, hotspots: this.scenes[0].hotspots})
  };

  /**
   * Debug mode: a small window shows FPS (frames per second) in canvas
   */
  toggleDebugMode = (): void => {
    this.vrviewCmp.toggleDebugMode()
  };

  /**
   * This function is used to close Left Menu Panel when clicking overlay (outside panel).
   * The left Menu Panel is created and deleted dynamically.
   * To get a reference to the overlay, renderPanelFooter() is used while Panel exists.
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

  handleClickHotspot = (idScene: number | string): void => {
    const newSceneObj: IScene = this.vrviewCmp.findSceneBydId(this.scenes, idScene) as IScene;
    if(!newSceneObj.hotspots){
      this.setState({scene: newSceneObj.scene, hotspots: undefined});
    } else {
      this.setState({scene: newSceneObj.scene, hotspots: newSceneObj.hotspots});
    }
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

    const choiceGroup: IChoiceGroupOption[] = [
      {
        key: '1',
        iconProps: { iconName: 'Photo2' },
        text: 'Scene 1',
        checked: this.state.scene.id == 1,
        onClick: () => alert('this.state.scene.id: ' + this.state.scene.id)
      },
      {
        key: '2',
        iconProps: { iconName: 'Photo2' },
        text: 'Scene 2',
        checked: this.state.scene.id == 2,
        onClick: () => alert('this.state.scene.id: ' + this.state.scene.id)
      },
      {
        key: '3',
        iconProps: { iconName: 'Photo2' },
        text: 'Scene 3',
        checked: this.state.scene.id == 3,
        onClick: () => alert('this.state.scene.id: ' + this.state.scene.id)
      },
      {
        key: '4',
        iconProps: { iconName: 'Photo2' },
        text: 'Scene 4',
        checked: this.state.scene.id == 4,
        onClick: () => alert('this.state.scene.id: ' + this.state.scene.id)
      }
    ];

    return(
      <Fabric>

        <CommandBar isSearchBoxVisible={ false } items={ topMenuItems } className="command-bar" />

        <Panel
          ref="panel"
          type={ PanelType.smallFixedNear }
          onRenderFooter={ this.renderPanelFooter }
          headerText="Vrview React">
          <div><Nav groups={ leftMenuItems } selectedKey={ 'resetScene' } /></div>
        </Panel>

        <div className="pad15">
          <div className="centered header">Vrview React</div>
          <div className="centered subheader">React Component based on Google&apos;s Vrview Library</div>
        </div>

        <DocumentCard className="layout shadow">
          {/* Vrview Component ----------------------------------------------------------- */}
          <Vrview {...this.state}
            ref={ (vrview: Vrview) => {this.vrviewCmp = vrview} }
            onClickHotspot={ this.handleClickHotspot } />
          {/* /Vrview Component ---------------------------------------------------------- */}
          <div className="pad15">
            <div className="card-title">{this.state.scene.title}</div>
            <div>{this.state.scene.description}</div>
          </div>
        </DocumentCard>

        <ChoiceGroup label='Change Scene Programatically' options={ choiceGroup } className="centered pad15" />

      </Fabric>
    );
  }
}