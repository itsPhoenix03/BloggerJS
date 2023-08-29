import React from "react";
import "./Header.css";

const Header = () => {
  const todayDate = new Date().toUTCString().slice(0, 16);
  return (
    <div className="header">
      <div className="header-title">
        <h4>The News And Reports From Around The World</h4>
        <span>{todayDate}</span>
      </div>
    </div>
  );
};

export default Header;
