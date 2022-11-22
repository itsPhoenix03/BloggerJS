import React from "react";
import LoadingSvg from "../../Assets/LoadingScreen.svg";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-content-wrapper">
        <div className="loading-content">
          <div className="image-container">
            <img src={LoadingSvg} alt="" />
          </div>

          <div className="loading-statement">
            <span>Blogs on there way! Just few Routers away...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
