import { useImageUrlQuery } from "../../../services/tmdbApi";

import Img from "../../ui/lazyLoadImage/Img";
import profileFallBack from "../../../assets/avatar.png";
import "./CastCard.scss";

function CastCard({ data }) {
  const { data: imageUrl } = useImageUrlQuery();

  const imagePath = data.profile_path
    ? imageUrl + data.profile_path
    : profileFallBack;

  return (
    <div className="list-item">
      <div className="profile-image">
        <Img src={imagePath} />
      </div>
      <div className="profile-name">{data.name}</div>
      <div className="profile-character">{data.character}</div>
    </div>
  );
}

export default CastCard;
