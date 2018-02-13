//todo: para mayor claridad o renombrar "scene" a "config" o "data"

import {IHotspot} from "./IHotspot";

/**
 * Vrview scene configuration
 */
export interface IScene {

  scene: {

    // Scene id
    id: number | string,

    // Scene title
    title?: string,

    // Scene description
    description?: string,

    // URL pointing to a 360° video file or an adaptive streaming manifest file (.mpd or .m3u8).
    video?: string,

    // URL pointing to a 360° image file. Exactly one video or image is required.
    // Images and videos must be in /public directory
    image?: string,

    // Iframe's width attribute.
    width?:	string | number,

    // Iframe's height attribute.
    height?: string | number,

    // URL to a preview image for a 360º scene (video/image).
    preview?:	string,

    // Indicates whether the content has stereo format or not.
    is_stereo?:	boolean,

    // Turns on/off debug canvas features (like showing the FPS meter).
    is_debug?: boolean,

    // Enables/disables the VR mode button.
    is_vr_off?:	boolean,

    // Enables/disables the autopan introduction on desktop.
    is_autopan_off?: boolean,

    // When true, prevents roll and pitch. This is intended for stereo panoramas.
    is_yaw_only?:	boolean,

    // The initial volume of the media; it ranges between 0 and 1; zero equals muted.
    volume?: number,

    // Enable/disable the loop in the video
    loop?: boolean,

    // Mutes/unmutes the sound of the video
    muted?: boolean,

    // Numeric angle in degrees of the initial heading for scene.
    default_yaw?:	number,

    // By default, the camera points at the center of the image.
    // When true, the fullscreen button contained inside the VR View iframe will
    // be hidden. This parameter is useful if the user wants to use VR View's fullscreen
    // workflow (via vrView.setFullscreen() callback) with an element outside the iframe.
    hide_fullscreen_button?: boolean
  },

  // Click event handler for a hotspot
  onClickHotspot?: Function,

  // Array of clickable points on scene
  hotspots?: Array<IHotspot>
}