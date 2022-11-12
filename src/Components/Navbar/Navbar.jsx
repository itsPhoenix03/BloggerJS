import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegTimesCircle } from "react-icons/fa";
import noProfilePic from "../../Assets/no-user-profile-picture.jpg";
import logo from "../../Assets/BloggerJS.svg";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const currPage = useLocation().pathname;

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
      </div>

      <div className="navbar-center">
        <ul className="navbar-sections">
          <li
            className={`navbar-sections-item ${
              currPage === "/" ? "navbar-section-item-active" : ""
            }`}
          >
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li
            className={`navbar-sections-item ${
              currPage === "/compose" ? "navbar-section-item-active" : ""
            }`}
          >
            <Link to="/compose" className="link">
              Compose
            </Link>
          </li>
          <li
            className={`navbar-sections-item ${
              currPage === "/blogs" ? "navbar-section-item-active" : ""
            }`}
          >
            <Link to="/blogs" className="link">
              Blogs
            </Link>
          </li>
          <li
            className={`navbar-sections-item ${
              currPage === "/settings" ? "navbar-section-item-active" : ""
            }`}
          >
            <Link to="/settings" className="link">
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <>
          {!user ? (
            !(currPage === "/register" || currPage === "/login") && (
              <>
                <button className="navbar-login">
                  <Link to="/login" className="link">
                    Login
                  </Link>
                </button>
                <button className="navbar-register">
                  <Link to="/register" className="link">
                    Sign Up
                  </Link>
                </button>
              </>
            )
          ) : (
            <>
              <div className="navbar-user-profile">
                <p>{user.username}</p>
                <img
                  src={user.profilePicture ? user.profilePicture : noProfilePic}
                  alt="user-img"
                />
              </div>
            </>
          )}
        </>

        <div className="navbar-small-screen">
          <GiHamburgerMenu
            className="navbar-open-overlay"
            onClick={() => setToggleMenu(true)}
          />
          {toggleMenu && (
            <div className="navbar-overlay">
              <FaRegTimesCircle
                className="navbar-close-overlay"
                onClick={() => setToggleMenu(false)}
              />
              <ul className="navbar-sections-sm">
                <li className="navbar-sections-item-sm">
                  <Link
                    to="/"
                    className="link"
                    onClick={() => setToggleMenu(false)}
                  >
                    Home
                  </Link>
                </li>
                <li className="navbar-sections-item-sm">
                  <Link
                    to="/compose"
                    className="link"
                    onClick={() => setToggleMenu(false)}
                  >
                    Compose
                  </Link>
                </li>
                <li className="navbar-sections-item-sm">
                  <Link
                    to="/blogs"
                    className="link"
                    onClick={() => setToggleMenu(false)}
                  >
                    Blogs
                  </Link>
                </li>
                <li className="navbar-sections-item-sm">
                  <Link
                    to="/settings"
                    className="link"
                    onClick={() => setToggleMenu(false)}
                  >
                    Settings
                  </Link>
                </li>
                {!user && (
                  <>
                    <li className="navbar-sections-item-sm">
                      <Link
                        to="/login"
                        className="link"
                        onClick={() => setToggleMenu(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="navbar-sections-item-sm">
                      <Link
                        to="/register"
                        className="link"
                        onClick={() => setToggleMenu(false)}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
