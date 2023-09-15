import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDetailsQuery } from "../../../services/tmdbApi";
import { useImageUrlQuery } from "../../../services/tmdbApi";
import dayjs from "dayjs";

import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import CIrcleRating from "../../../components/ui/circleRating/CIrcleRating";
import Genres from "../../../components/ui/genres/Genres";
import Img from "../../../components/ui/lazyLoadImage/Img";
import VideoPopup from "../../../components/ui/videoPopup/VideoPopup";
import Info from "../../../components/helpers/info/Info";
import Crew from "../../../components/helpers/crew/Crew";
import DetailsSkeleton from "../../../components/skeletons/DetailsSkeleton";
import posterImg from "../../../assets/no-poster.png";
import NoResult from "../../../assets/no-results.png";
import { PlayIcon } from "../PlayIcon";
import "./DetailsBanner.scss";

function DetailsBanner({ video, crew, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(video);

  const { mediaType, id } = useParams();
  const { data, isFetching, isError } = useDetailsQuery({ mediaType, id });
  const { data: imageUrl, isFetching: imageUrlFetching } = useImageUrlQuery();

  if (isFetching || imageUrlFetching)
    return (
      <section className="detail-banner-section">
        <DetailsSkeleton />
      </section>
    );

  if (isError)
    return (
      <div className="no-result">
        <img src={NoResult} className="no-result-img" alt="" />
      </div>
    );

  const posterPath = data?.poster_path
    ? imageUrl + data.poster_path
    : posterImg;

  return (
    <section className="detail-banner-section">
      <div className="details-banner-background">
        <Img src={imageUrl + data?.backdrop_path} />
      </div>
      <div className="details-banner-opacity-layer"></div>
      <ContentWrapper>
        <div className="detail-banner-content">
          <div className="left">
            <Img src={posterPath} />
          </div>
          <div className="right">
            <div className="title">
              {data?.title + " "}({dayjs(data?.release_date)?.format("YYYY")})
            </div>
            <div className="sub-title">{data?.tagline}</div>
            <div className="genres-list">
              <Genres data={data?.genres?.map((g) => g.id)} />
            </div>
            <div className="row">
              <CIrcleRating rating={data.vote_average?.toFixed(1)} />
              <div 
                className="play-btn"
                onClick={() => {
                  setShow(true);
                  setVideoId(video?.key);
                }}
              >
                <PlayIcon />
                Watch Trailer
              </div>
            </div>
            <div className="overview">
              <div className="overveiw-heading">Overview</div>
              <div className="overview-description">{data?.overview}</div>
            </div>
            <div className="info-items">
              <Info data={data} />
              <Crew crew={crew} data={data} />
            </div>
          </div>
        </div>
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </ContentWrapper>
    </section>
  );
}

export default DetailsBanner;
