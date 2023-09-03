import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Details from "../pages/details/Details";
import SearchResult from "../pages/searchResult/SearchResult";
import Explore from "../pages/explore/Explore";
import PageNotFound from "../pages/404/PageNotFound";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:mediaType/:id" element={<Details />} />
      <Route path="/search/:query" element={<SearchResult />} />
      <Route path="/explore/:mediaType" element={<Explore />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default CustomRoutes;
