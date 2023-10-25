import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./CircleRating.scss";

function CIrcleRating({ rating }) {
  return (
    <div className="circular-rating">
      <CircularProgressbar
        value={rating}
        maxValue="10"
        text={rating}
        styles={buildStyles({
          pathColor: rating > 5 ? (rating < 7 ? "orange" : "green") : "red",
        })}
      />
    </div>
  );
}

export default CIrcleRating;
