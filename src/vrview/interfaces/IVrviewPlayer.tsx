//todo: completar, posiblemente faltan campos del interfaz, revisar vrview.js

/**
 * Interface for Vrview Object
 * This object is responsible for creation and handling of 3d scene
 * Do not confuse Vrview Object with Vrview Component
 */
export interface IVrviewPlayer {
  _events: Object,
  iframe: HTMLIFrameElement,
  isPaused: boolean,
  sender: {iframe: Object},
  addHotspot: (hotspotName: string, hotspotData: {pitch: number, yaw: number, radius: number, distance: number}) => void,
  on: (eventName: string, eventHandler: (event: {id: string}) => void) => void,
  setContent: (sceneObj: Object) => void,
  click: Function
}