import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Context } from "../../Context/Context";
import noProfilePic from "../../Assets/no-user-profile-picture.jpg";
import "./Settings.css";

// import { user as userPic } from "../../Assets/images";
import axios from "axios";

const Settings = () => {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;

      data.append("name", filename);
      data.append("file", file);

      updatedUser.profilePicture = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.put(
        `http://localhost:5000/api/user/${user._id}`,
        updatedUser
      );

      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:5000/api/user/${user._id}`);
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
                    ? `http://localhost:5000/Images/${user.profilePicture}`
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
              onChange={(e) => setFile(e.target.files[0])}
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

          <button type="submit" className="settings-update-btn">
            Update
          </button>
        </form>

        {success && (
          <p style={{ color: "aquamarine" }}>
            Updated Your Information (Please, Login Again to see Changes!)
          </p>
        )}
      </div>

      <Sidebar />
    </div>
  );
};

export default Settings;
