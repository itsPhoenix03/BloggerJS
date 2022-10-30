import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../../Assets/no-image.jpg";
import "./Post.css";

const Post = ({ post, index }) => {
  return (
    <Link to={`/post/${post._id}`} className="link">
      <div className="post">
        <img
          src={post.image ? post.image : noImage}
          alt="blog-img"
          style={{
            height: `${!(index % 2) && index !== 8 ? "30rem" : "25rem"}`,
          }}
        />

        <div className="post-info">
          <h3 className="post-title">{post.title}</h3>

          <p className="post-date">
            {new Date(post?.updatedAt)
              .toDateString()
              .split(" ")
              .splice(1, 2)
              .join(" ")}
          </p>
        </div>

        <p className="post-description">
          {post.description.substring(0, post.description.indexOf("\n")).trim()}
        </p>
      </div>
    </Link>
  );
};

export default Post;
