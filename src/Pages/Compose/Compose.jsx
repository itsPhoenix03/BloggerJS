import React, { useMemo, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
import noImage from "../../Assets/no-image.jpg";
import "./Compose.css";
import { Request } from "../../Request";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import noProfilePic from "../../Assets/no-user-profile-picture.jpg";

const Compose = ({ user }) => {
  const [file, setFile] = useState(null);
  const [blogData, setBlogData] = useState({
    author: user.username,
    authorPic: user.profilePicture,
  });
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
      const res = await Request.post("/posts", blogData);
      window.location.replace(`#/post/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="compose-page-wrapper">
        <div className="compose">
          <div className="compose-post-info">
            <div className="post-author-date-wrapper">
              <img
                src={user.profilePicture ? user.profilePicture : noProfilePic}
                alt=""
              />
              <h4 className="compose-post-author">{user.username}</h4>

              <span className="compose-post-update">
                {new Date().toDateString().split(" ").splice(1, 2).join(" ")}
              </span>
            </div>
          </div>
          <img
            src={file ? URL.createObjectURL(file) : noImage}
            alt=""
            className="compose-post-img"
          />

          <form action="" onSubmit={handleSubmit} className="compose-form">
            <div className="compose-form-group compose-img-button-group">
              <label className="compose-icon-wrapper" htmlFor="compose-add-img">
                <FaRegFileImage className="compose-icon" />
                <span>Upload Blog Image</span>
              </label>

              <input
                type="file"
                id="compose-add-img"
                style={{ display: "none" }}
                onChange={(e) => uploadImage(e.target.files[0])}
              />
              <button
                type="submit"
                disabled={disabled}
                className="compose-publish-btn"
              >
                Publish
              </button>
            </div>

            <input
              type="text"
              className="compose-input compose-title"
              placeholder="Title..."
              autoFocus={true}
              name="title"
              onChange={(e) =>
                setBlogData((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }))
              }
            />

            <div className="compose-form-group, compose-form-content">
              <textarea
                className="compose-input compose-post-content"
                placeholder="A short one line can be your Sub Heading of your blog, please be consice and press (Enter) after you write it."
                name="description"
                rows={40}
                onChange={(e) =>
                  setBlogData((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }))
                }
              ></textarea>
            </div>
          </form>
        </div>
        {useMemo(
          () => (
            <Sidebar />
          ),
          []
        )}
      </div>
      <Footer />
    </>
  );
};

export default Compose;
