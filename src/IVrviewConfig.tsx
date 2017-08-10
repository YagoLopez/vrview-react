export interface IVrviewConfig {
  video?: string,           // URL to a 360° video file or an adaptive streaming manifest file (.mpd or .m3u8).
                            // Exactly one of video or image is required.
  image?: string            // URL to a 360° image file. Exactly one of video or image is required.
  width:	string | number   // Iframe's width attribute.
  height:	string | number   // Iframe's height attribute.
  preview?:	string	        // URL to a preview image for a 360° image file.
  is_stereo?:	boolean	      // Indicates whether the content at the image or video URL is stereo or not.
  is_debug?:	boolean	      // When true, turns on debug features like rendering hotspots ad showing the FPS meter.
  is_vr_off?:	boolean	      // When true, disables the VR mode button.
  is_autopan_off?: boolean	// When true, disables the autopan introduction on desktop.
  is_yaw_only?:	boolean	    // When true, prevents roll and pitch. This is intended for stereo panoramas.
  default_yaw?:	number	    // Numeric angle in degrees of the initial heading for the 360° content.
                            // By default, the camera points at the center of the underlying image.
}