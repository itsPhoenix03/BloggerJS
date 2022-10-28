import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Request } from "../../Request";
import noImage from "../../Assets/no-image.jpg";
import "./SinglePost.css";

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
        <img src={post.image ? post.image : noImage} alt="blog-img" />

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
            <h1 className="single-post-title">{title}</h1>

            <div className="single-post-info">
              <h4 className="single-post-author">
                Auhtor:
                <Link
                  to={`/?author=${post.author}`}
                  className="link single-post-author-name"
                >
                  {post.author}
                </Link>
              </h4>
              <div className="single-post-divider" />
              <p className="single-post-update">
                ({new Date(post.updatedAt).toDateString()})
              </p>

              {post.author === user?.username && (
                <div className="single-post-edit-btn">
                  <FaRegEdit
                    className="post-edit-btn"
                    onClick={() => setUpdateMode(true)}
                  />
                  <FaRegTrashAlt
                    className="post-delete-btn"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {updateMode ? (
          <textarea
            value={content}
            className="single-post-content-update"
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="single-post-content">{content}</p>
        )}

        {updateMode && (
          <button onClick={handleEdit} className="single-post-update-btn">
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
