import React from "react";
import { IoIosSettings } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
  return (
    <nav className="NAV navbar navbar-expand-md  text-light d-flex justify-content-center align-items-center p-3 ">
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
        <div className="d-flex gap-3">
          <button className="nav-btn btn text-light btn-secondary">
            <IoIosSettings size={24} style={{ marginBottom: 5 }} />
            Settings
          </button>
          <button className="nav-btn btn text-light btn-secondary">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
