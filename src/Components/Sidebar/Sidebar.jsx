import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Sidebar.css";

import image from "../../Assets/bgLightMobile.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");

      setCategories(res.data);
    };

    fetchCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h4 className="sidebar-title">Hello User</h4>
        <img src={image} alt="" className="sidebar-user-img" />
        <p style={{ margin: "1rem 0" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad rerum
          deleniti recusandae itaque quod iure maiores iusto consequatur.
        </p>
      </div>

      <div className="sidebar-content">
        <h4 className="sidebar-title">Categories</h4>
        <ul className="sidebar-categories">
          {categories.map((category) => (
            <li className="sidebar-category" key={category._id}>
              <Link to={`/?categories=${category.name}`} className="link">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-content">
        <h4 className="sidebar-title">Contact Us</h4>
        <div className="sidebar-icons">
          <FaFacebook className="sidebar-icon" />
          <FaTwitter className="sidebar-icon" />
          <FaInstagram className="sidebar-icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
