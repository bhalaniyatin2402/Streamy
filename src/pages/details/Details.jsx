import { useParams } from "react-router-dom";
import { useVideosQuery } from "../../services/tmdbApi";
import { useCreditsQuery } from "../../services/tmdbApi";

import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import Videos from "./videos/Videos";
import SimilarMovies from "./carousels/SimilarMovies";
import Recommendations from "./carousels/Recommendations";
import NoResult from "../../assets/no-results.png";
import "./Details.scss";

function Details() {
  const { mediaType, id } = useParams();
  const {
    data: video,
    isFetching: videoLoading,
    isError: videoError,
  } = useVideosQuery({ mediaType, id });
  const {
    data: credits,
    isFetching: creditsLoading,
    isError: creditsError,
  } = useCreditsQuery({ mediaType, id });

  if (mediaType !== "movie" && mediaType !== "tv")
    return (
      <div className="no-result">
        <img src={NoResult} className="no-result-img" />
      </div>
    );

  if (videoLoading || creditsLoading)
    return (
      <>
        <DetailsBanner loading={true} />
        <Cast loading={true} />
        <Videos loading={true} />
      </>
    );

  if (videoError || creditsError)
    return (
      <div className="no-result">
        <img src={NoResult} className="no-result-img" alt="" />
      </div>
    );

  return (
    <div>
      <DetailsBanner video={video?.length > 0 ? video[0] : ""} crew={credits} />
      <Cast data={credits.cast} />
      <Videos data={video} />
      <SimilarMovies />
      <Recommendations />
    </div>
  );
}

export default Details;
