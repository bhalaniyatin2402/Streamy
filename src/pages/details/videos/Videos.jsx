import { useState } from "react";

import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/ui/videoPopup/VideoPopup";
import VideoCard from "../../../components/cards/videoCard/VideoCard";
import VideoSkeleton from "../../../components/skeletons/VideoSkeleton";
import "./Videos.scss";

function Videos({ data, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  if (loading)
    return (
      <div className="video-skeleton-section">
        <ContentWrapper>
          <VideoSkeleton />
          <VideoSkeleton />
          <VideoSkeleton />
          <VideoSkeleton />
          <VideoSkeleton />
        </ContentWrapper>
      </div>
    );

  if (!(data.length > 0)) return;

  return (
    <section className="videos-section">
      <ContentWrapper>
        <div className="videos-title">Official Videos</div>
        <div className="videos">
          {data.map((video) => (
            <div
              className="video-item"
              key={video.key}
              onClick={() => {
                setShow(true);
                setVideoId(video.key);
              }}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </section>
  );
}

export default Videos;
