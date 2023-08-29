import React from "react";
import { PuffLoader } from "react-spinners";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-content-wrapper">
        <div className="loading-content">
          <div className="loader-container">
            <PuffLoader
              height="90"
              width="90"
              radius={1}
              color="#9d693f"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
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
