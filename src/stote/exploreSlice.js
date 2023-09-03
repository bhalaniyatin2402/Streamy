import { createSlice } from "@reduxjs/toolkit";
import { headers } from "./searchSlice";
import axios from "axios";

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    loading: false,
    pageNo: 0,
    noResult: false,
    genre: null,
    sortBy: null,
    filters: {},
    mediaType: "",
    results: [],
  },
  reducers: {
    setExploreData(state, action) {
      return {
        ...state,
        total_pages: action.payload.total_pages,
        results: [...state.results, ...action.payload.results],
      };
    },
    setExploreEmptyState(state, action) {
      return {
        ...state,
        loading: false,
        pageNo: 0,
        noResult: "",
        total_pages: undefined,
        results: [],
      };
    },
    setExplorePageNo(state, action) {
      return {
        ...state,
        pageNo: state.pageNo + 1,
      };
    },
    setExploreLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setExploreGenres(state, action) {
      return {
        ...state,
        genre: action.payload,
      };
    },
    setExploreSortBy(state, action) {
      return {
        ...state,
        sortBy: action.payload,
      };
    },
    setExploreFilter(state, action) {
      let genreId = state.genre.map((g) => g.value);
      genreId = JSON.stringify(genreId).slice(1, -1);
      if (genreId) {
        state.filters.with_genres = genreId;
      } else {
        delete state.filters.with_genres;
      }
      if (state.sortBy) {
        state.filters.sort_by = state.sortBy.value;
      } else {
        delete state.filters.sort_by;
      }
    },
    setExploreMediaType(state, action) {
      if (state.mediaType !== action.payload) {
        return {
          ...state,
          mediaType: action.payload,
          genre: null,
          sortBy: null,
          filters: {},
        };
      }
    },
    setExploreNoResult(state, action) {
      return {
        ...state,
        noResult: action.payload,
      };
    },
  },
});

export const {
  setExploreData,
  setExploreEmptyState,
  setExploreLoading,
  setExplorePageNo,
  setExploreGenres,
  setExploreSortBy,
  setExploreFilter,
  setExploreMediaType,
  setExploreNoResult,
} = exploreSlice.actions;
export default exploreSlice.reducer;

// middleware for fetch data
export function fetchExploreData() {
  return async function fetchExploreDataThunk(dispatch, getStatus) {
    if (getStatus().explore.pageNo >= getStatus().explore.total_pages) return;
    try {
      dispatch(setExploreLoading(true));
      dispatch(setExplorePageNo());
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${
          getStatus().explore.mediaType
        }?page=${getStatus().explore.pageNo}`,
        {
          headers,
          params: getStatus().explore.filters,
        }
      );
      const result = await response.data;
      dispatch(setExploreData(result));
      dispatch(setExploreLoading(false));
      if (result.results.length === 0 && result.total_pages <= 1) {
        dispatch(setExploreNoResult(true));
      } else {
        dispatch(setExploreNoResult(false));
      }
    } catch (error) {
      console.log("explore fetch err : ", error);
    }
  };
}
