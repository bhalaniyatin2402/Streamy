import Select from "react-select";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGenresQuery } from "../../../services/tmdbApi";
import {
  setExploreGenres,
  setExploreSortBy,
  setExploreEmptyState,
  setExploreFilter,
  setExploreMediaType,
  fetchExploreData,
} from "../../../stote/exploreSlice";
import "./Filter.scss";

const sortByList = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Accending" },
  { value: "vote_average.desc", label: "Raating Descending" },
  { value: "vote_average.asc", label: "Rating Accending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Accending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

function Filter() {
  const { mediaType: media } = useParams();
  const dispatch = useDispatch();
  const { genre, sortBy } = useSelector((state) => state.explore);
  const { data: genreList } = useGenresQuery();
  const genresLists = [];
  for (const key in genreList) {
    genresLists.push({ value: +key, label: genreList[key] });
  }

  const onChange = (selectedItems, action) => {
    dispatch(setExploreEmptyState());

    if (action.name === "sortby") {
      dispatch(setExploreSortBy(selectedItems));
    }
    if (action.name === "genres") {
      dispatch(setExploreGenres(selectedItems));
    }

    dispatch(setExploreFilter());
    dispatch(setExploreMediaType(media));
    dispatch(fetchExploreData());
  };

  return (
    <>
      <Select
        isMulti
        name="genres"
        value={genre}
        onChange={onChange}
        closeMenuOnSelect={false}
        options={genresLists}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        isClearable={true}
        placeholder="Select genres"
        className="react-select-container genreDD"
        classNamePrefix="react-select"
      />
      <Select
        name="sortby"
        value={sortBy}
        options={sortByList}
        onChange={onChange}
        isClearable={true}
        placeholder="Sort by"
        className="react-select-container sortByDD"
        classNamePrefix="react-select"
      />
    </>
  );
}

export default Filter;
