"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @Class {ScenesCollection} It represents a list of scenes.
 *
 * Each scene contains information like: path to images/videos, optional hotspots,
 * navigation between scenes and other parameters. (See IVrviewConfig definition)
 * Scenes can be loaded from hardcoded data or from an external store (Redux, MobX, Singleton Service, etc).
 */
var ScenesCollection = (function () {
    function ScenesCollection() {
        var _this = this;
        this.findSceneBydId = function (id) {
            for (var i = 0; i < _this.scenes.length; i++) {
                if (_this.scenes[i].scene.id === id) {
                    return _this.scenes[i];
                }
            }
        };
        this.scenes = require('./scenes.json');
    }
    ScenesCollection.prototype.getAll = function () {
        return this.scenes;
    };
    ScenesCollection.prototype.getSceneByArrayIndex = function (index) {
        return this.scenes[index];
    };
    return ScenesCollection;
}());
exports.default = ScenesCollection;
