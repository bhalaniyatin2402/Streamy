import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useHeroBannerBgQuery } from "../../../services/tmdbApi";
import { useImageUrlQuery } from "../../../services/tmdbApi";
import { fetchSearchData, setEmptySearch } from "../../../stote/searchSlice";
import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import Img from "../../../components/ui/lazyLoadImage/Img";
import "./HeroBanner.scss";

function HeroBanner() {
  const dispatch = useDispatch();
  const [background, setBackground] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigate();
  const { data: imageUrl } = useImageUrlQuery();
  const { data: heroBannerBg, isLoading } = useHeroBannerBgQuery();

  function handleHomeSearchQuery(e) {
    if (e.key === "Enter" && searchQuery.length > 0) {
      setSearchQuery("");
      navigation(`/search/${searchQuery}`);
      dispatch(setEmptySearch());
      dispatch(fetchSearchData(searchQuery));
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
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleHomeSearchQuery}
            />
            <button
              onClick={() => {
                if (searchQuery.length > 0) {
                  setSearchQuery("");
                  navigation(`/search/${searchQuery}`);
                  dispatch(setEmptySearch());
                  dispatch(fetchSearchData(searchQuery));
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
