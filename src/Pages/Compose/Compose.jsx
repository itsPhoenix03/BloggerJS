import React, { useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
import noImage from "../../Assets/no-image.jpg";
import "./Compose.css";
import { Request } from "../../Request";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const Compose = ({ user }) => {
  const [file, setFile] = useState(null);
  const [blogData, setBlogData] = useState({ author: user.username });
  const [disabled, setDisabled] = useState(false);

  const uploadImage = async (file) => {
    if (file) {
      setFile(file);
      setDisabled(true);

      const filename = Date.now() + file.name;

      //Firebase Upload
      const storageRef = ref(storage, filename);
      const uploadImage = uploadBytesResumable(storageRef, file);

      await uploadImage.on(
        "state_changed",
        (snapshot) => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            setBlogData((p) => ({ ...p, image: downloadURL }));
            setDisabled(false);
          });
        }
      );
    } else {
      setBlogData((p) => ({ ...p, image: "null" }));
      setDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(blogData);
      const res = await Request.post("/posts", blogData);
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
            onChange={(e) => uploadImage(e.target.files[0])}
          />

          <input
            type="text"
            className="compose-input compose-title"
            placeholder="Title..."
            autoFocus={true}
            name="title"
            onChange={(e) =>
              setBlogData((p) => ({ ...p, [e.target.name]: e.target.value }))
            }
          />
        </div>

        <div className="compose-form-group">
          <textarea
            className="compose-input compose-post-content"
            placeholder="Enter Your Post Content..."
            name="description"
            onChange={(e) =>
              setBlogData((p) => ({ ...p, [e.target.name]: e.target.value }))
            }
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="compose-publish-btn"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Compose;
