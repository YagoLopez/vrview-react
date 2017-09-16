import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {IScene} from "./vrview/interfaces/IScene";

// import {Fabric} from "office-ui-fabric-react/lib/Fabric";
// import {CommandBar} from "office-ui-fabric-react/lib/CommandBar";
// import {IContextualMenuItem, ContextualMenuItemType} from "office-ui-fabric-react/lib/ContextualMenu";
// import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
// import {Nav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav';
// import {DocumentCard} from 'office-ui-fabric-react/lib/DocumentCard';
// import {ChoiceGroup, IChoiceGroupOption} from 'office-ui-fabric-react/lib/ChoiceGroup';
import './App.css';



/**
 * List of scenes.
 *
 * Each scene object contains information like: path to images/videos, optional hotspots,
 * navigation between scenes and other parameters. (See IScene definition)
 * Scenes can be loaded from hardcoded data or from a database.
 */
// const scenes = require('./scenes.json');

const scenes = [
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
        "description": "Initial scene with three hotspots. One hotspot has a new scene associated, other has no new scene and the third executes a function"
      },
    "hotspots": [
      {"name": "scene1-hotspot1", "pitch": 0, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 2},
      {"name": "scene1-hotspot2", "pitch": 0, "yaw": -35, "radius": 0.05, "distance": 2},
      {"name": "scene1-hotspot3", "pitch": -20, "yaw": -25, "radius": 0.05, "distance": 2,
        "clickFn": "alert('Function executed');"}
    ]
  },
  {
    "scene":
      {
        "id": 2,
        "image": "../images/landscape1.jpg",
        "is_stereo": false,
        "title": "Title Scene 2",
        "description": "Scene 2 has two hotspots with respectives scenes associated"
      },
    "hotspots": [
      {"name": "scene2-hotspot4", "pitch": 0, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 3},
      {"name": "scene2-hotspot5", "pitch": 0, "yaw": -35, "radius": 0.05, "distance": 2, "idNewScene": 4}
    ]
  },
  {
    "scene":
      {
        "id": 3,
        "image": "../images/palmbeach.jpg",
        "is_stereo": false,
        "title": "Title Scene 3",
        "description": "Scene 3 has only one hotspot associated to Scene 4"
      },
    "hotspots": [
      {"name": "scene2-hotspot4", "pitch": -10, "yaw": 0, "radius": 0.05, "distance": 2, "idNewScene": 4}
    ]
  },
  {
    "scene":
      {
        "id": 4,
        "image": "../images/landscape2.jpg",
        "is_stereo": false,
        "title": "Title Scene 4",
        "description": "This is scene 4 without hotspots"
      }
  }
];

export class App extends React.Component<{}, IScene > {

  // Initial state contains first scene
  state: IScene = scenes[0];

  // Reference to Vrview Component
  vrviewCmp: Vrview;

  /**
   * Reset state to the initial scene.
   */
  resetScene = (): void => {
    this.setState(scenes[0])
  };

  /**
   * Debug mode: a small window shows FPS (frames per second) in canvas
   */
  toggleDebugMode = (): void => {
    this.vrviewCmp.toggleDebugMode()
  };

  /**
   * Close Left Menu Panel when clicking overlay (outside panel).
   * The left Menu Panel is created and deleted dynamically.
   * To get a reference to the overlay, renderPanelFooter() is used while Panel exists.
   */
    //todo: revisar esto
  renderPanelFooter = (): any => {
    const overlay = document.querySelector('.ms-Overlay') as HTMLElement;
    if (overlay){
      overlay.addEventListener('mousedown', () => {
        this.hideLeftPanel();
      })
    }
  };

  showLeftPanel = (): void => {
    // (this.refs.panel as Panel).open();
  };

  hideLeftPanel = (): void => {
    // (this.refs.panel as Panel).dismiss();
  };

  resetSceneAndHideLeftMenu = (): void => {
    this.resetScene();
    this.hideLeftPanel();
  };

  changeSceneAndHideLeftMenu = (idScene: number | string): void => {
    this.handleClickHotspot(idScene);
    this.hideLeftPanel()
  };

  toggleDebugModeAndHideLeftMenu = (): void => {
    this.toggleDebugMode();
    this.hideLeftPanel();
  };

  handleClickHotspot = (idScene: number | string): void => {
    const newSceneObj = this.vrviewCmp.findSceneBydId(scenes, idScene) as IScene;
    if(!newSceneObj.hotspots){
      this.setState({scene: newSceneObj.scene, hotspots: undefined});
    } else {
      this.setState({scene: newSceneObj.scene, hotspots: newSceneObj.hotspots});
    }
  };

  render(){

/*
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
        title: 'Show/Hide small window with canvas info in low left corner'
      }
    ];

    // Menu link keys must be equals to scene ids to show active scene in menu
    const leftMenuItems: INavLinkGroup[] = [{
      links:
        [
          { name: 'Reset Scene', url: '', key: 'resetScene', onClick: this.resetSceneAndHideLeftMenu },
          { name: 'Toggle Debug Mode', url: '', key: 'toggleDebugMode', onClick: this.toggleDebugModeAndHideLeftMenu },
          { name: 'Change Scene', url: '',
            links: [{
              name: 'Scene 1',
              key: '1',
              url: 'javascript:void(0)',
              onClick: () => this.changeSceneAndHideLeftMenu(1)
            },
            {
              name: 'Scene 2',
              key: '2',
              url: 'javascript:void(0)',
              onClick: () => this.changeSceneAndHideLeftMenu(2)
            },
            {
              name: 'Scene 3',
              key: '3',
              url: 'javascript:void(0)',
              onClick: () => this.changeSceneAndHideLeftMenu(3)
            },
            {
              name: 'Scene 4',
              key: '4',
              url: 'javascript:void(0)',
              onClick: () => this.changeSceneAndHideLeftMenu(4)
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
        onClick: () => this.handleClickHotspot(1)
      },
      {
        key: '2',
        iconProps: { iconName: 'Photo2' },
        text: 'Scene 2',
        checked: this.state.scene.id == 2,
        onClick: () => this.handleClickHotspot(2)
      },
      {
        key: '3',
        iconProps: { iconName: 'Photo2' },
        text: 'Scene 3',
        checked: this.state.scene.id == 3,
        onClick: () => this.handleClickHotspot(3)
      },
      {
        key: '4',
        iconProps: { iconName: 'Photo2' },
        text: 'Scene 4',
        checked: this.state.scene.id == 4,
        onClick: () => this.handleClickHotspot(4)
      }
    ];
*/

    return(
      <div>
        TEST

      {/*<Fabric>*/}

{/*
        <CommandBar isSearchBoxVisible={ false } items={ topMenuItems } className="command-bar" />

        <Panel
          ref="panel"
          type={ PanelType.smallFixedNear }
          onRenderFooter={ this.renderPanelFooter }
          headerText="Vrview React">
          <div><Nav groups={ leftMenuItems } selectedKey={ this.state.scene.id.toString() } /></div>
        </Panel>
*/}

        <div className="pad15">
          <div className="centered header">Vrview React</div>
          <div className="centered subheader">React Component based on Google&apos;s Vrview Library</div>
        </div>

        {/*<DocumentCard className="layout shadow">*/}
          {/* Vrview Component ----------------------------------------------------------- */}
          <Vrview {...this.state}
            ref={ (vrview: Vrview) => {this.vrviewCmp = vrview} }
            onClickHotspot={ this.handleClickHotspot } />
          {/* /Vrview Component ---------------------------------------------------------- */}
          <div className="pad15">
            <div className="card-title">{this.state.scene.title}</div>
            <div>{this.state.scene.description}</div>
          </div>
        {/*</DocumentCard>*/}

{/*
        <ChoiceGroup label='Change Scene Programatically' options={ choiceGroup } className="centered pad15" />
*/}

      </div>
      // </Fabric>
    );
  }
}