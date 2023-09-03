import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { fetchSearchData, setEmptySearch } from "../../../stote/searchSlice";

import ContentWrapper from "../../layout/contentWrapper/ContentWrapper";
import logo from "../../../assets/Streamy_logo.png";
import logoName from "../../../assets/Streamy_name.png";
import "./Header.scss";

function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [opacityLayer, setOpacityLayer] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", controllScroller);
    return () => window.removeEventListener("scroll", controllScroller);
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowSearch(false);
    setMobileMenu(false);
    setOpacityLayer(false);
  }, [location]);

  useEffect(() => {}, [query]);

  const controllScroller = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  function handleSearchQuery(e) {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      dispatch(setEmptySearch());
      dispatch(fetchSearchData(query));
      setTimeout(() => {
        setShowSearch(false);
      }, 500);
    }
  }

  function openSearch() {
    setOpacityLayer(true);
    setShowSearch(true);
    setMobileMenu(false);
  }

  function openMobileMenu() {
    setOpacityLayer(true);
    setShowSearch(false);
    setMobileMenu(true);
  }

  return (
    <>
      <div className={opacityLayer ? "opacity-layer" : ""}></div>
      <header className={`header ${mobileMenu ? "mobile-view" : ""} ${show}`}>
        <ContentWrapper>
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="logo-icon" />
            <img src={logoName} alt="" className="logo-name" />
          </div>
          <ul className="nav-items">
            <li className="nav-item" onClick={() => navigate("explore/movie")}>
              Movies
            </li>
            <li className="nav-item" onClick={() => navigate("explore/tv")}>
              Tv Shows
            </li>
            <li className="nav-item" onClick={openSearch}>
              <HiOutlineSearch />
            </li>
          </ul>

          <div className="mobile-menu-items">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose
                onClick={() => {
                  setMobileMenu(false);
                  setOpacityLayer(false);
                }}
              />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )}
          </div>
        </ContentWrapper>
        <div className="search-bar">
          <ContentWrapper>
            {showSearch && (
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search for movies or tv shows"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={handleSearchQuery}
                />
                <VscChromeClose
                  onClick={() => {
                    setShowSearch(false);
                    setOpacityLayer(false);
                  }}
                />
              </div>
            )}
          </ContentWrapper>
        </div>
      </header>
    </>
  );
}

export default Header;
