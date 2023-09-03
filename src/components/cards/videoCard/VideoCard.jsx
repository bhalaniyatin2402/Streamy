import Img from "../../ui/lazyLoadImage/Img";
import { PlayIcon } from "../../../pages/details/PlayIcon";
import "./VideoCard.scss";

function VideoCard({ video }) {
  return (
    <>
      <div className="video-thumbnail">
        <Img
          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
          className="video-thumbnail-image"
        />
        <PlayIcon />
      </div>
      <div className="video-name">{video.name}</div>
    </>
  );
}

export default VideoCard;
