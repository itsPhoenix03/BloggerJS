import React from "react";
import Footer from "../../Components/Footer/Footer";
import SinglePost from "../../Components/SinglePost/SinglePost";
import "./SinglePostPage.css";

const SinglePostPage = ({ user }) => {
  return (
    <>
      <div className="single-post-page">
        <SinglePost user={user} />
      </div>
      <Footer />
    </>
  );
};

export default SinglePostPage;
