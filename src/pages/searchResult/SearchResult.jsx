import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSearchData } from "../../stote/searchSlice";
import ContentWrapper from "../../components/layout/contentWrapper/ContentWrapper";
import Spinner from "../../components/ui/spinner/Spinner";
import MovieCard from "../../components/cards/movieCard/MovieCard";
import NoResult from "../../assets/no-results.png";
import "./SearchResult.scss";

function SearchResult() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { loading, results, noResult } = useSelector((state) => state.search);

  function handleInfiniteScroll() {
    if (loading) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      dispatch(fetchSearchData(query));
    }
  }

  useEffect(() => {
    if (loading) return;
    if (results.length === 0) {
      dispatch(fetchSearchData(query));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.addEventListener("scroll", handleInfiniteScroll);
  });

  return (
    <section className="search-results-page">
      <h1>Search Results</h1>
      <ContentWrapper>
        {results?.map((item) => (
          <MovieCard
            data={item}
            fromSearch={true}
            endpoint={item?.mediaType}
            key={Math.random() + 1}
          />
        ))}
        {loading && <Spinner initial={true} />}
      </ContentWrapper>
      {noResult && <img className="no-result-img" src={NoResult} alt="" />}
    </section>
  );
}

export default SearchResult;
