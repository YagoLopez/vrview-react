/**
 * Hotspot: clickable point in scene
 *
 * It enables to load another 3d scene
 * or arbitrary function execution on click (still not implemented)
 */
export interface IHotspot {

  // Hotspot identifier. Used on click event
  name: string;

  // The latitude of center, specified in degrees, between -90 and 90, with 0 at the horizon.
  pitch: number;

  // The longitude of center, specified in degrees, between -180 and 180, with 0 at the image center.
  yaw: number;

  // The radius of the hotspot, specified in meters.
  radius: number;

  // The distance of the hotspot from camera, specified in meters.
  distance: number;

  // Destination scene for on click event
  idNewScene?: number | string;

  // Arbitrary function to run on hotspot click event. (Function call must be string to be valid JSON)
  clickFn?: string;

}