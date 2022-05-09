import React, { useRef, useState } from "react";
import axios from "axios";
import { FaRegFileImage } from "react-icons/fa";
import noImage from "../../Assets/no-image.jpg";
import "./Compose.css";

const Compose = ({ user }) => {
  const titleRef = useRef();
  const contentRef = useRef();

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      author: user.username,
      title: titleRef.current.value,
      description: contentRef.current.value,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;

      data.append("name", filename);
      data.append("file", file);

      newBlog.image = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", newBlog);

      window.location.replace(`#/post/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="compose">
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt=""
          className="compose-post-img"
        />
      ) : (
        <img src={noImage} alt="" className="compose-post-img" />
      )}
      <form action="" onSubmit={handleSubmit} className="compose-form">
        <div className="compose-form-group">
          <label htmlFor="compose-add-img">
            <FaRegFileImage className="compose-icon" />
          </label>

          <input
            type="file"
            id="compose-add-img"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            type="text"
            className="compose-input compose-title"
            placeholder="Title..."
            autoFocus={true}
            ref={titleRef}
          />
        </div>

        <div className="compose-form-group">
          <textarea
            className="compose-input compose-post-content"
            placeholder="Enter Your Post Content..."
            ref={contentRef}
          ></textarea>
        </div>

        <button type="submit" className="compose-publish-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Compose;
