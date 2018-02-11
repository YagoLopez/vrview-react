import ScenesCollection from "./Scenes";
import {IScene} from "../vrview/interfaces/IScene";

describe('SCENES CLASS (Repository of scenes)', () => {

  const scenesCollection = new ScenesCollection();

  it('getAll()', () => {
    expect(scenesCollection.getAll().length).toBe(4);
  });

  it('findSceneBydId()', () => {
    expect((scenesCollection.findSceneBydId(1) as IScene).scene.id).toBe(1);
  });

  it('getSceneByArrayIndex()', () => {
    expect((scenesCollection.getSceneByArrayIndex(0) as IScene).scene.id).toBe(1);
  });

});