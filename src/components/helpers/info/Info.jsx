import dayjs from "dayjs";
import "./Info.scss";

function Info({ data }) {
  const toHours = (runtime) => {
    const hours = runtime / 60 > 1 ? Math.floor(runtime / 60) : 0;
    const minutes = (runtime - hours * 60).toFixed(0);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="info">
      <div className="info-item">
        <span className="text bold">Status:</span>
        <span className="text">{data.status}</span>
      </div>
      <div className="info-item">
        <span className="text bold">Release Date:</span>
        <span className="text">
          {dayjs(data.release_date).format("MMM DD, YYYY")}
        </span>
      </div>
      <div className="info-item">
        <span className="text bold">Runtime: </span>
        <span className="text">{toHours(data.runtime)}</span>
      </div>
    </div>
  );
}

export default Info;
