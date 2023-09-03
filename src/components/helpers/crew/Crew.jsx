import "./Crew.scss";

function Crew({ data, crew }) {
  const creator = data.created_by?.map((c) => c.name);

  const fixCommas = (items) => {
    return items.map((item, i) => {
      return i === items.length - 1 ? item : item + ", ";
    });
  };

  if (!crew) return;

  return (
    <div className="crew">
      {crew.director?.length !== 0 && (
        <div className="info">
          <span className="bold text">Director:</span>
          <span className="text">{fixCommas(crew.director)}</span>
        </div>
      )}
      {crew.writer?.length !== 0 && (
        <div className="info">
          <span className="bold text">Writer:</span>
          <span className="text">{fixCommas(crew.writer)}</span>
        </div>
      )}
      {creator?.length !== 0 && creator !== undefined && (
        <div className="info">
          <span className="bold text">Creator:</span>
          <span className="text">{fixCommas(creator)}</span>
        </div>
      )}
    </div>
  );
}

export default Crew;
