import { useParams } from "react-router-dom";
import { useSimilarMoviesQuery } from "../../../services/tmdbApi";

import Carousel from "../../../components/carousel/Carousel";

function SimilarMovies() {
  const { mediaType, id } = useParams();
  const { data, isFetching } = useSimilarMoviesQuery({ mediaType, id });

  if (!data?.length > 0) return;

  return (
    <section className="similar-movie-section">
      <Carousel
        data={data}
        loading={isFetching}
        endpoint={mediaType}
        title={`Similar ${mediaType === "movie" ? "Movies" : "Tv Shows"}`}
      />
    </section>
  );
}

export default SimilarMovies;
