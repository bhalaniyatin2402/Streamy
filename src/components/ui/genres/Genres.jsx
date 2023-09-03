import { useGenresQuery } from "../../../services/tmdbApi";
import "./Genres.scss";

function Genres({ data }) {
  const { data: genres, isLoading } = useGenresQuery();

  if (isLoading) return;

  return (
    <div className="genres">
      {data.map((g) => {
        if (!genres[g]) return;
        return (
          <div className="genre" key={g}>
            {genres[g]}
          </div>
        );
      })}
    </div>
  );
}

export default Genres;
