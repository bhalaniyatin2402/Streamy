import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHeroBannerBgQuery } from "../../../services/tmdbApi";
import { useImageUrlQuery } from "../../../services/tmdbApi";
import { useDispatch } from "react-redux";
import { fetchSearchData, setEmptySearch } from "../../../stote/searchSlice";

import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import Img from "../../../components/ui/lazyLoadImage/Img";
import "./HeroBanner.scss";

function HeroBanner() {
  const dispatch = useDispatch();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigation = useNavigate();
  const { data: imageUrl } = useImageUrlQuery();
  const { data: heroBannerBg, isLoading } = useHeroBannerBgQuery();

  function handleSearchQuery(e) {
    if (e.key === "Enter" && query.length > 0) {
      navigation(`/search/${query}`);
      dispatch(setEmptySearch());
      dispatch(fetchSearchData(query));
    }
  }

  useEffect(() => {
    setBackground(imageUrl + heroBannerBg);
  }, [heroBannerBg, imageUrl]);

  return (
    <section className="hero-banner-section">
      <ContentWrapper>
        {!isLoading && (
          <div className="hero-banner-background">
            <Img src={background} className="hero-banner-img" />
          </div>
        )}
        <div className="hero-banner-opacity-layer"></div>
        <div className="hero-banner-content">
          <span className="title">Welcome</span>
          <span className="sub-title">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search for movies or tv shows"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleSearchQuery}
            />
            <button
              onClick={() => {
                if (query.length > 0) {
                  navigation(`/search/${query}`);
                  dispatch(setEmptySearch());
                  dispatch(fetchSearchData(query));
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

export default HeroBanner;
