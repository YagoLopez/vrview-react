import ScenesCollection from "./Scenes";
describe('SCENES CLASS (Repository of scenes)', function () {
    var scenesCollection = new ScenesCollection();
    it('getAll()', function () {
        expect(scenesCollection.getAll().length).toBe(4);
    });
    it('findSceneBydId()', function () {
        expect(scenesCollection.findSceneBydId(1).scene.id).toBe(1);
    });
    it('getSceneByArrayIndex()', function () {
        expect(scenesCollection.getSceneByArrayIndex(0).scene.id).toBe(1);
    });
});
