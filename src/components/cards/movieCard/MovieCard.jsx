import { useNavigate } from "react-router-dom";
import { useImageUrlQuery } from "../../../services/tmdbApi";
import dayjs from "dayjs";

import CIrcleRating from "../../ui/circleRating/CIrcleRating";
import Genres from "../../ui/genres/Genres";
import Img from "../../ui/lazyLoadImage/Img";
import PoseterFallbak from "../../../assets/no-poster.png";
import "./MovieCard.scss";

function MovieCard({ data, fromSearch, endpoint }) {
  const navigate = useNavigate();
  const { data: imgUrl } = useImageUrlQuery();
  const posterUrl = data.poster_path
    ? imgUrl + data.poster_path
    : PoseterFallbak;

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/${data.media_type || endpoint}/${data.id}`)}
    >
      <div className="poster-block">
        <Img src={posterUrl} />
        {!fromSearch && (
          <>
            <CIrcleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </>
        )}
      </div>
      <div className="text-block">
        <span className="title">{data.title || data.name}</span>
        <span className="sub-title">
          {dayjs(data.release_data).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
