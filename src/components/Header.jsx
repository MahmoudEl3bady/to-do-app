import React, { useContext } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const token = sessionStorage.getItem("token");
const Header = () => {
  const { userData } = useAuth();

  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
  alert("Logged out successfully! ");
  };
  return (
    <nav className={`NAV navbar navbar-expand-md  text-light d-flex justify-content-center align-items-center p-3 sticky-top shadow  ${theme ==="light"&&"header-light"} `}>
      <div className="container">
        <a
          href="#"
          className="navbar-brand fw-bold text-light d-flex justify-content-center align-items-center"
        >
          <img
            src="https://pomofocus.io/images/icon-white2.png"
            alt="To do app Icon "
            className="img-fluid brand-img"
          />
          To-do App
        </a>
        {/* <h1>{token && `welcome , `}</h1> */}
        <div className="">
          <button className="btn" onClick={toggleTheme}>
            {theme == "dark" ? (
              <MdOutlineLightMode size={23} color="white" />
            ) : (
              <CiDark size={23} color="white" />
            )}
          </button>
          {token ? (
            <Link to="/login" onClick={handleLogout} className="btn btn-primary">
              Log out
            </Link>
          ) : (
            <Link to="/register" className="btn btn-primary">
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
