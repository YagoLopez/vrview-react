import {IScene} from "../vrview/interfaces/IScene";

/**
 * @Class {ScenesCollection} It represents a list of scenes.
 *
 * Each scene contains information like: path to images/videos, optional hotspots,
 * navigation between scenes and other parameters. (See IVrviewConfig definition)
 * Scenes can be loaded from hardcoded data or from an external store (Redux, MobX, Singleton Service, etc).
 */
export default class ScenesCollection {

  private scenes: IScene[];

  constructor(){
    this.scenes = require('./scenes.json');
  }

  getAll(): IScene[] {
    return this.scenes;
  }

  getSceneByArrayIndex(index: number): IScene {
    return this.scenes[index];
  }

  findSceneBydId = (id: number | string): IScene | void => {
    for(let i = 0; i < this.scenes.length; i++){
      if(this.scenes[i].scene.id === id){
        return this.scenes[i];
      }
    }
  }

}