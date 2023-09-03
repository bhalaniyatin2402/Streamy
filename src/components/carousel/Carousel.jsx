import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useRef } from "react";

import ContentWrapper from "../layout/contentWrapper/ContentWrapper";
import MovieCard from "../cards/movieCard/MovieCard";
import CardSkeleton from "../skeletons/CardSkeleton";
import "./Carousel.scss";

function Carousel({ data, loading, endpoint, title }) {
  const carouselRef = useRef();

  const navigaton = (dir) => {
    const container = carouselRef.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carousel-title">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftArr arrow"
          onClick={() => navigaton("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightArr arrow"
          onClick={() => navigaton("right")}
        />
        {!loading ? (
          <div className="carousel-items" ref={carouselRef}>
            {data?.map((item) => (
              <MovieCard data={item} key={item.id} endpoint={endpoint} />
            ))}
          </div>
        ) : (
          <div className="loading-skeleton">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
