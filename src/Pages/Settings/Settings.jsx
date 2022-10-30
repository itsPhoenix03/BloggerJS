import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
// import Sidebar from "../../Components/Sidebar/Sidebar";
import { Context } from "../../Context/Context";
import { Request } from "../../Request";
import noProfilePic from "../../Assets/no-user-profile-picture.jpg";
import "./Settings.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const Settings = () => {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(
    user.profilePic ? user.profilePic : null
  );

  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  const uploadProfilePic = async (file) => {
    if (file) {
      setFile(file);
      setDisabled(true);

      const filename = Date.now() + file.name;

      //Firebase Upload
      const storageRef = ref(storage, `profilePictures/${filename}`);
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

            setProfilePic(downloadURL);
            setDisabled(false);
          });
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) updatedUser.profilePicture = profilePic;

    try {
      await Request.put(`/user/${user._id}`, updatedUser);

      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await Request.delete(`/user/${user._id}`);
      dispatch({ type: "Logout" });

      window.location.replace(`#/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-top-section">
          <h3 className="settings-update-acc">Update Your Account</h3>
          <button className="settings-delete-acc" onClick={handleDelete}>
            Delete Account
          </button>
        </div>

        <form action="" onSubmit={handleSubmit} className="settings-form">
          <h4>Profile Picture</h4>

          <div className="settings-profile">
            <img
              src={
                !file
                  ? user.profilePicture
                    ? user.profilePicture
                    : noProfilePic
                  : URL.createObjectURL(file)
              }
              alt=""
            />

            <label htmlFor="settings-profile-pic">
              <FaRegUser className="settings-profile-icon" />
            </label>

            <input
              type="file"
              id="settings-profile-pic"
              style={{ display: "none" }}
              onChange={(e) => uploadProfilePic(e.target.files[0])}
            />
          </div>

          <label htmlFor="settings-username" className="settings-username">
            Username
          </label>
          <input
            type="text"
            id="settings-username"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="settings-email" className="settings-email">
            Email ID
          </label>
          <input
            type="email"
            id="settings-email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="settings-password" className="settings-password">
            Password
          </label>
          <input
            type="password"
            id="settings-password"
            placeholder="Confirm your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={disabled}
            className="settings-update-btn"
          >
            Update
          </button>
        </form>

        {success && (
          <p style={{ color: "aquamarine" }}>
            Updated Your Information (Please, Login Again to see Changes!)
          </p>
        )}
      </div>

      {/* <Sidebar /> */}
    </div>
  );
};

export default Settings;
