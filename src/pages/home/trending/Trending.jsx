import { useDispatch, useSelector } from "react-redux";

import { useTrendingQuery } from "../../../services/tmdbApi";
import { setTrendingTabState } from "../../../stote/tabsSlice";
import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import SwitchingTabs from "../../../components/form/switchingTabs/SwitchingTabs";
import Carousel from "../../../components/carousel/Carousel";

function Trending() {
  const dispatch = useDispatch();
  const { trendigTabState } = useSelector((state) => state.tabs);
  const { data, isFetching } = useTrendingQuery(
    trendigTabState ? "week" : "day"
  );

  function onTabChange(index) {
    dispatch(setTrendingTabState(index));
  }

  return (
    <section className="carousel-section">
      <ContentWrapper>
        <span className="carousel-title">Trending</span>
        <SwitchingTabs
          data={["Day", "Week"]}
          onTabChange={onTabChange}
          tabIndex={trendigTabState}
        />
      </ContentWrapper>
      <Carousel data={data} loading={isFetching} />
    </section>
  );
}

export default Trending;
