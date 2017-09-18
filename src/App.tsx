import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {IVrviewConfig} from "./vrview/interfaces/IVrviewConfig";

import {Fabric} from "office-ui-fabric-react/lib/Fabric";
import {CommandBar} from "office-ui-fabric-react/lib/CommandBar";
import {IContextualMenuItem, ContextualMenuItemType} from "office-ui-fabric-react/lib/ContextualMenu";
import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';
import {Nav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav';
import {DocumentCard} from 'office-ui-fabric-react/lib/DocumentCard';
import {ChoiceGroup, IChoiceGroupOption} from 'office-ui-fabric-react/lib/ChoiceGroup';
import './App.css';

/**
 * List of scenes.
 *
 * Each scene object contains information like: path to images/videos, optional hotspots,
 * navigation between scenes and other parameters. (See IVrviewConfig definition)
 * Scenes can be loaded from hardcoded data or from a database.
 */
const scenes = require('./scenes.json');

export class App extends React.Component<any, IVrviewConfig> {

  // Initial state contains first scene and state for left menu
  state: IVrviewConfig = scenes[0];

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

  showLeftPanel = (): void => {
    (this.refs.panel as Panel).open();
  };

  hideLeftPanel = (): void => {
    (this.refs.panel as Panel).dismiss();
  };

  leftMenuAction = (action: Function, params?: {}): void => {
    action(params);
    this.hideLeftPanel();
  };

  handleClickHotspot = (idScene: number | string): void => {
    const newSceneObj = this.vrviewCmp.findSceneBydId(scenes, idScene) as IVrviewConfig;
    if(!newSceneObj.hotspots){
      this.setState({scene: newSceneObj.scene, hotspots: undefined});
    } else {
      this.setState({scene: newSceneObj.scene, hotspots: newSceneObj.hotspots});
    }
  };

  render(){

    const scene = this.state.scene;

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

    /* Menu link keys must be equals to scene ids to show active scene in menu */
    const leftMenuItems: INavLinkGroup[] = [{
      links:
        [
          { name: 'Reset Scene', url: '', key: 'resetScene', onClick: () => this.leftMenuAction(this.resetScene) },
          { name: 'Toggle Debug Mode', url: '', key: 'toggleDebugMode', onClick: () => this.leftMenuAction(this.toggleDebugMode)},
          { name: 'Change Scene', url: '',
            links: [{
              name: 'Scene 1',
              key: '1',
              url: 'javascript:void(0)',
              onClick: () => this.leftMenuAction(this.handleClickHotspot, 1)
            },
            {
              name: 'Scene 2',
              key: '2',
              url: 'javascript:void(0)',
              onClick: () => this.leftMenuAction(this.handleClickHotspot, 2)
            },
            {
              name: 'Scene 3',
              key: '3',
              url: 'javascript:void(0)',
              onClick: () => this.leftMenuAction(this.handleClickHotspot, 3)
            },
            {
              name: 'Scene 4',
              key: '4',
              url: 'javascript:void(0)',
              onClick: () => this.leftMenuAction(this.handleClickHotspot, 4)
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

    return(
      <Fabric>

        <CommandBar isSearchBoxVisible={ false } items={ topMenuItems } className="command-bar" />

        <Panel
          ref="panel"
          type={ PanelType.smallFixedNear }
          isLightDismiss={ true }
          headerText="Vrview React">
          <div><Nav groups={ leftMenuItems } selectedKey={ scene.id.toString() } /></div>
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
            <div className="card-title">{ scene.title }</div>
            <div>{ scene.description }</div>
          </div>
        </DocumentCard>

        <ChoiceGroup label='Change Scene Programatically' options={ choiceGroup } className="centered pad15" />

      </Fabric>
    )
  }
}