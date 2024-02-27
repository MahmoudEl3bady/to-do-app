import React, { useContext } from "react";
import { IoIosSettings } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { ThemeContext } from "../ThemeContext";
const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <nav className="NAV navbar navbar-expand-md  text-light d-flex justify-content-center align-items-center p-3 sticky-top shadow">
      <div className="container">
        <a
          href="#"
          className="navbar-brand fw-bold text-light d-flex justify-content-center align-items-center"
        >
          <img
            src="https://pomofocus.io/images/icon-white2.png"
            alt=""
            className="img-fluid brand-img"
          />
          To-do App
        </a>
        <div className="">
          <button className="btn" onClick={toggleTheme}>
            {theme == "dark" ? (
              <MdOutlineLightMode size={23} color="white" />
            ) : (
              <CiDark size={23} color="white" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
