import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Request } from "../../Request";
import noImage from "../../Assets/no-image.jpg";
import noProfilePic from "../../Assets/no-user-profile-picture.jpg";

import "./SinglePost.css";
import Sidebar from "../Sidebar/Sidebar";

const SinglePost = ({ user }) => {
  const id = useLocation().pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchSinglePost = async () => {
      const res = await Request.get(`/posts/${id}`);

      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.description);

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    fetchSinglePost();
  }, [id]);

  const handleEdit = async () => {
    try {
      await Request.put(`/posts/${post._id}`, {
        author: user.username,
        title,
        description: content,
      });

      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await Request.delete(`/posts/${post._id}`, {
        data: {
          author: user.username,
        },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single-post">
      <div className="single-post-wapper">
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="single-post-title-update"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        ) : (
          <>
            <div className="single-post-info">
              <div className="post-author-date-wrapper">
                <img
                  src={post.authorPic ? post.authorPic : noProfilePic}
                  alt=""
                />
                <h4 className="single-post-author">{post.author}</h4>

                <span className="single-post-update">
                  {new Date(post.updatedAt)
                    .toDateString()
                    .split(" ")
                    .splice(1, 2)
                    .join(" ")}
                </span>
              </div>

              {post.author === user?.username && (
                <div className="single-post-edit-btn">
                  <button onClick={() => setUpdateMode(true)}>
                    <FaRegEdit className="post-edit-btn" /> Update Post
                  </button>

                  <button onClick={handleDelete}>
                    <FaRegTrashAlt className="post-delete-btn" /> Delete Post
                  </button>
                </div>
              )}
            </div>
            <h1 className="single-post-title">{title}</h1>

            <h3 className="single-post-context-line">
              {content.substring(0, content.indexOf("\n")).trim()}
            </h3>
          </>
        )}

        <img src={post.image ? post.image : noImage} alt="blog-img" />

        {updateMode ? (
          <textarea
            value={content}
            className="single-post-content-update"
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="single-post-content">
            {content.substring(content.indexOf("\n"), content.length)}
          </p>
        )}

        {updateMode && (
          <div className="updateModeBtns">
            <button onClick={handleEdit} className="single-post-update-btn">
              Update
            </button>
            <button
              onClick={() => setUpdateMode(false)}
              className="single-post-read-mode-btn"
            >
              Read Mode
            </button>
          </div>
        )}
      </div>

      {useMemo(
        () => (
          <Sidebar postId={id} />
        ),
        [id]
      )}
    </div>
  );
};

export default SinglePost;
