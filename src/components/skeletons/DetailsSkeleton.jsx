import ContentWrapper from "../layout/contentWrapper/ContentWrapper";
import "./Skeletons.scss";

function DetailsSkeleton() {
  return (
    <div className="details-skeleton">
      <ContentWrapper>
        <div className="left skeleton"></div>
        <div className="right">
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
          <div className="row skeleton"></div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default DetailsSkeleton;
