import CastCard from "../../../components/cards/castCard/CastCard";
import ContentWrapper from "../../../components/layout/contentWrapper/ContentWrapper";
import CastSkeleton from "../../../components/skeletons/CastSkeleton";
import "./Cast.scss";

function Cast({ data, loading }) {
  if (loading)
    return (
      <section className="cast-skeleton-section">
        <ContentWrapper>
          <CastSkeleton />
          <CastSkeleton />
          <CastSkeleton />
          <CastSkeleton />
          <CastSkeleton />
          <CastSkeleton />
        </ContentWrapper>
      </section>
    );

  if (!data?.length > 0) return;

  return (
    <section className="cast-section">
      <ContentWrapper>
        <div className="section-heding">Top Cast</div>
        <div className="list-items">
          {data?.map((item, i) => (
            <CastCard data={item} key={item.cast_id + "i" + i} />
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
}

export default Cast;
