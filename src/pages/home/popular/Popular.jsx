import { useDispatch, useSelector } from "react-redux";

import { setPopularTabState } from "../../../stote/tabsSlice";
import { usePopularQuery } from "../../../services/tmdbApi";
import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import SwitchingTabs from "../../../components/form/switchingTabs/SwitchingTabs";
import Carousel from "../../../components/carousel/Carousel";

function Popular() {
  const dispatch = useDispatch();
  const { popularTabState } = useSelector((state) => state.tabs);
  const { data, isFetching } = usePopularQuery(
    popularTabState ? "tv" : "movie"
  );

  function onTabChange(index) {
    dispatch(setPopularTabState(index));
  }

  return (
    <section className="carousel-section">
      <ContentWrapper>
        <span className="carousel-title">What's Popular</span>
        <SwitchingTabs
          data={["Movies", "Tv Shows"]}
          onTabChange={onTabChange}
          tabIndex={popularTabState}
        />
      </ContentWrapper>
      <Carousel
        data={data}
        loading={isFetching}
        endpoint={popularTabState ? "tv" : "movie"}
      />
    </section>
  );
}

export default Popular;
