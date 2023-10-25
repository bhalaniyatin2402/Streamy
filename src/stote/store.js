import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/tmdbApi";
import searchReducer from "./searchSlice";
import exploreReducer from "./exploreSlice";
import tabsReducer from "./tabsSlice";

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    search: searchReducer,
    explore: exploreReducer,
    tabs: tabsReducer,
  },
  middleware: (gDM) => gDM().concat(tmdbApi.middleware),
  devTools: false
});

export default store;
