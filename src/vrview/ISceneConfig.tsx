import {IHotspot} from "./IHotspot";

/**
 * VrView scene configuration with hotspots (optional)
 */
export interface ISceneConfig {
  scene: {
    video?: string,             // URL pointing to a 360° video file or an adaptive streaming manifest file (.mpd or .m3u8).
    image?: string              // URL pointing to a 360° image file. Exactly one video or image is required.
    width?:	string | number     // Iframe's width attribute.
    height?:	string | number   // Iframe's height attribute.
    preview?:	string	          // URL to a preview image for 360º scene (video/image).
    is_stereo?:	boolean	        // Indicates whether the image or video format is stereo or not.
    is_debug?:	boolean	        // Turns on/off debug canvas features (like showing the FPS meter).
    is_vr_off?:	boolean	        // Enables/disables the VR mode button.
    is_autopan_off?: boolean	  // Enables/disables the autopan introduction on desktop.
    is_yaw_only?:	boolean	      // When true, prevents roll and pitch. This is intended for stereo panoramas.
    default_yaw?:	number	      // Numeric angle in degrees of the initial heading for the scene content.
                                // By default, the camera points at the center of the underlying image.
  },
  hotspots?: Array<IHotspot>    // Array of clickable points on scene
}