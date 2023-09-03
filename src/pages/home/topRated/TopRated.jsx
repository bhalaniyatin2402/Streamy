import { useDispatch, useSelector } from "react-redux";
import { setTopRatedTabState } from "../../../stote/tabsSlice";
import { useTopRatedQuery } from "../../../services/tmdbApi";

import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import SwitchingTabs from "../../../components/form/switchingTabs/SwitchingTabs";
import Carousel from "../../../components/carousel/Carousel";

function TopRated() {
  const dispatch = useDispatch();
  const { topRatedTabState } = useSelector((state) => state.tabs);
  const { data, isFetching } = useTopRatedQuery(
    topRatedTabState ? "tv" : "movie"
  );

  function onTabChange(index) {
    dispatch(setTopRatedTabState(index));
  }

  return (
    <section className="carousel-section">
      <ContentWrapper>
        <span className="carousel-title">Top Rated</span>
        <SwitchingTabs
          data={["Movies", "Tv Shows"]}
          onTabChange={onTabChange}
          tabIndex={topRatedTabState}
        />
      </ContentWrapper>
      <Carousel
        data={data}
        loading={isFetching}
        endpoint={topRatedTabState ? "tv" : "movie"}
      />
    </section>
  );
}

export default TopRated;
