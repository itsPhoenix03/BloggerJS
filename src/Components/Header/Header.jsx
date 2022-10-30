import React from "react";
import "./Header.css";

import { header } from "../../Assets/images";

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">
        <h4>Dive into the Ocean of Blogs!</h4>
      </div>
      {/* <img src={header} alt="" className="header-img" /> */}
    </div>
  );
};

export default Header;
