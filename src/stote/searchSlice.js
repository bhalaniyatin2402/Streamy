import { createSlice } from "@reduxjs/toolkit";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
export const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

const searchSlice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    pageNo: 0,
    noResult: false,
    results: [],
  },
  reducers: {
    setSearchData(state, action) {
      return {
        ...state,
        total_pages: action.payload.total_pages,
        results: [...state.results, ...action.payload.results],
      };
    },
    setEmptySearch() {
      return {
        loading: false,
        pageNo: 0,
        noResult: false,
        results: [],
      };
    },
    setPageNo(state) {
      return {
        ...state,
        pageNo: state.pageNo + 1,
      };
    },
    setLoadingState(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setNoResult(state, action) {
      state.noResult = action.payload;
    },
  },
});

export const {
  setSearchData,
  setEmptySearch,
  setPageNo,
  setLoadingState,
  setNoResult,
} = searchSlice.actions;
export default searchSlice.reducer;

// middleware for fetch data
export function fetchSearchData(query) {
  return async function fetchSearchDataThunk(dispatch, getStatus) {
    if (getStatus().search.pageNo >= getStatus().search.total_pages) return;
    try {
      dispatch(setLoadingState(true));
      dispatch(setPageNo());
      const response = await fetch(
        `https://api.themoviedb.org/3//search/multi?query=${query}&page=${
          getStatus().search.pageNo
        }`,
        {
          headers,
        }
      );
      const result = await response.json();
      dispatch(setSearchData(result));
      dispatch(setLoadingState(false));
      if (result.results.length === 0 && result.total_pages <= 1) {
        dispatch(setNoResult(true));
      } else {
        dispatch(setNoResult(false));
      }
    } catch (error) {
      console.log("fetching Error : ", error);
    }
  };
}
