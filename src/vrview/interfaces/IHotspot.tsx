/**
 * Hotspot: clickable point in scene
 *
 * It enables to load another 3d scene in VrView
 * Or execute an arbitrary function on click (still not implemented)
 */
export interface IHotspot {
  name: string,               // Hotspot identifier. Used on click event
  pitch: number,              // The latitude of center, specified in degrees, between -90 and 90, with 0 at the horizon.
  yaw: number,                // The longitude of center, specified in degrees, between -180 and 180, with 0 at the image center.
  radius: number,             // The radius of the hotspot, specified in meters.
  distance: number            // The distance of the hotspot from camera, specified in meters.
  idScene?: number | string   // Destination scene on click event
  clickFn?: Function          // Arbitrary function to run on hotspot click event
}