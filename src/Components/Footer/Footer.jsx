import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../Assets/BloggerJS-footer.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="left-section">
        <h4>
          Bring global news and insight straight to you. And enjoy the
          overwhelming experience of reading and writing blogs.
        </h4>
      </div>

      <div className="center-section">
        <img src={logo} alt="" />
        <span>Copyright &copy; 2022-2030 BloggerJS. All rights reserved</span>
      </div>
      <div className="right-section">
        <div className="footer-icons">
          <FaFacebook className="footer-icon" />
          <FaTwitter className="footer-icon" />
          <FaInstagram className="footer-icon" />
        </div>

        <div className="signup-btn">
          <Link to={`/register`} className="link">
            <button className="sign-up-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
