import { createSlice } from "@reduxjs/toolkit";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    trendigTabState: 0,
    popularTabState: 0,
    topRatedTabState: 0,
  },
  reducers: {
    setTrendingTabState(state, action) {
      return {
        ...state,
        trendigTabState: action.payload,
      };
    },
    setPopularTabState(state, action) {
      return {
        ...state,
        popularTabState: action.payload,
      };
    },
    setTopRatedTabState(state, action) {
      return {
        ...state,
        topRatedTabState: action.payload,
      };
    },
  },
});

export const { setTrendingTabState, setPopularTabState, setTopRatedTabState } =
  tabsSlice.actions;
export default tabsSlice.reducer;
