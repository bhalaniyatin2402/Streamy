import "./Skeletons.scss";

function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="poster-block skeleton"></div>
      <div className="text-block">
        <div className="title skeleton"></div>
        <div className="sub-title skeleton"></div>
      </div>
    </div>
  );
}

export default CardSkeleton;
