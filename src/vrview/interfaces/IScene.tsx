//todo: eliminar la propiedad "scene" para simplificar?

import {IHotspot} from "./IHotspot";

/**
 * VrView scene configuration with optional hotspots
 */
export interface IScene {
  scene: {
    id?: number | string,
    description?: string,
    title?: string,
    video?: string,               // URL pointing to a 360° video file or an adaptive streaming manifest file (.mpd or .m3u8).
    image?: string,               // URL pointing to a 360° image file. Exactly one video or image is required.
                                  // Images and videos must be in /public directory
    width?:	string | number,      // Iframe's width attribute.
    height?:	string | number,    // Iframe's height attribute.
    preview?:	string,	            // URL to a preview image for a 360º scene (video/image).
    is_stereo?:	boolean,	        // Indicates whether the content has stereo format or not.
    is_debug?:	boolean,	        // Turns on/off debug canvas features (like showing the FPS meter).
    is_vr_off?:	boolean,	        // Enables/disables the VR mode button.
    is_autopan_off?: boolean,	    // Enables/disables the autopan introduction on desktop.
    is_yaw_only?:	boolean,	      // When true, prevents roll and pitch. This is intended for stereo panoramas.
    volume?: number,              // The initial volume of the media; it ranges between 0 and 1; zero equals muted.
    loop?: boolean,               // Enable/disable the loop in the video
    muted?: boolean,              // Mutes/unmutes the sound of the video
    default_yaw?:	number,	        // Numeric angle in degrees of the initial heading for scene.
                                  // By default, the camera points at the center of the image.
    hide_fullscreen_button?: boolean // When true, the fullscreen button contained inside the VR View iframe will
                                  // be hidden. This parameter is useful if the user wants to use VR View's fullscreen
                                  // workflow (via vrView.setFullscreen() callback) with an element outside the iframe.
  },
  hotspots?: Array<IHotspot>      // Array of clickable points on scene
}