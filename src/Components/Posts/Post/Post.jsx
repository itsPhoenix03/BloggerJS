import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../../Assets/no-image.jpg";
import { URL } from "../../../Request";
import "./Post.css";

const Post = ({ post }) => {
  const isEmpty = post.categories.length === 0 ? true : false;
  return (
    <div className="post">
      <img
        src={post.image ? `${URL}/Images/${post.image}` : noImage}
        alt="blog-img"
      />

      <div className="post-info">
        <Link to={`/post/${post._id}`} className="link">
          <h3 className="post-title">{post.title}</h3>
        </Link>

        <div className="post-sub-info">
          <h4 className="post-author">{post.author}</h4>

          <div className="divider" />

          <div className="post-categories">
            {!isEmpty ? (
              post.categories.map((category) => (
                <h6 className="post-category" key={category._id}>
                  {category.name}
                </h6>
              ))
            ) : (
              <h6 className="post-category">No Category Specified</h6>
            )}
          </div>
        </div>
        <p className="post-date">({new Date(post.updatedAt).toDateString()})</p>
      </div>

      <p className="post-description">{post.description}</p>
    </div>
  );
};

export default Post;
