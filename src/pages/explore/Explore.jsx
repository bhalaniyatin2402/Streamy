import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExploreData,
  setExploreMediaType,
  setExploreEmptyState,
} from "../../stote/exploreSlice";
import "./Explore.scss";

import ContentWrapper from "../../components/layout/contentWrapper/ContentWrapper";
import MovieCard from "../../components/cards/movieCard/MovieCard";
import Spinner from "../../components/ui/spinner/Spinner";
import NoResultPng from "../../assets/no-results.png";
import Filter from "../../components/form/filter/Filter";
import { useEffect } from "react";

function Explore() {
  const dispatch = useDispatch();
  const { loading, results, noResult, mediaType } = useSelector(
    (state) => state.explore
  );
  const { mediaType: media } = useParams();

  useEffect(() => {
    if (mediaType !== media) {
      dispatch(setExploreEmptyState());
      dispatch(setExploreMediaType(media));
      dispatch(fetchExploreData());
    }
  }, [media]);

  function handleInfiniteScroll() {
    if (loading) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      dispatch(fetchExploreData());
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  });

  return (
    <section className="explore-page">
      <ContentWrapper>
        <section className="explore-header">
          <h1 className="explore-title">
            {media === "movie" ? "Explore Movies" : "Explore Tv Shows"}
          </h1>
          <div className="explore-filter">
            <Filter />
          </div>
        </section>
        <section className="explore-page-content">
          {results &&
            results.map((item) => (
              <MovieCard data={item} endpoint={media} key={item.id} />
            ))}
          {loading && <Spinner initial={true} />}
        </section>
      </ContentWrapper>
      {noResult && (
        <div className="no-result">
          <img src={NoResultPng} className="no-result-img" alt="" />
        </div>
      )}
    </section>
  );
}

export default Explore;
