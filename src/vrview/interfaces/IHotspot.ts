/**
 * Hotspot: clickable point in scene
 *
 * It enables to load another 3d scene
 * or arbitrary function execution on click (still not implemented)
 */
export interface IHotspot {
  name: string,                   // Hotspot identifier. Used on click event
  pitch: number,                  // The latitude of center, specified in degrees, between -90 and 90, with 0 at the horizon.
  yaw: number,                    // The longitude of center, specified in degrees, between -180 and 180, with 0 at the image center.
  radius: number,                 // The radius of the hotspot, specified in meters.
  distance: number                // The distance of the hotspot from camera, specified in meters.
  idNewScene?: number | string    // Destination scene for on click event
  clickFn?: string                // Arbitrary function to run on hotspot click event. (Function call must be string
                                  // to be valid JSON)
}