import React from "react";
// import Sidebar from "../../Components/Sidebar/Sidebar";
import SinglePost from "../../Components/SinglePost/SinglePost";
import "./SinglePostPage.css";

const SinglePostPage = ({ user }) => {
  return (
    <div className="single-post-page">
      <SinglePost user={user} />
      {/* <Sidebar /> */}
    </div>
  );
};

export default SinglePostPage;
