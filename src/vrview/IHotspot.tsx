import {ISceneConfig} from "./ISceneConfig";

/**
 * Hotspot: clickable point in scene
 *
 * It enables to load another 3d scene in VrView
 * Or execute an arbitrary function on click (still not implemented)
 */
export interface IHotspot {
  name: string,            // Hotspot identifier. Used on click event
  pitch: number,           // In degrees. Up is positive.
  yaw: number,             // In degrees. To the right is positive.
  radius: number,          // Radius of the circular target in meters.
  distance: number         // Distance of target from camera in meters.
  newScene?: ISceneConfig  // Destination scene on click event
}