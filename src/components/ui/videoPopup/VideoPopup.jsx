import ReactPlayer from "react-player/youtube";
import "./VideoPopup.scss";

function VideoPopup({ show, setShow, videoId, setVideoId }) {
  function hidePopup() {
    setShow(false);
    setVideoId(null);
  }

  return (
    <div className={`video-popup ${show ? "visible" : ""}`}>
      <div className="video-popup-opacity-layer" onClick={hidePopup}></div>
      <div className="video-player">
        <div className="video-popup-close" onClick={hidePopup}>
          close
        </div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default VideoPopup;
