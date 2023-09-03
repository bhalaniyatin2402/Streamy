import { useRecommendationsQuery } from "../../../services/tmdbApi";
import { useParams } from "react-router-dom";

import Carousel from "../../../components/carousel/Carousel";

function Recommendations() {
  const { mediaType, id } = useParams();
  const { data, isFetching } = useRecommendationsQuery({ mediaType, id });

  if (!data?.length > 0) return;

  return (
    <section className="recommendtion-section">
      <Carousel
        data={data}
        loading={isFetching}
        endpoint={mediaType}
        title="Recommendations"
      />
    </section>
  );
}

export default Recommendations;
