import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Request } from "../../Request";
import "./Sidebar.css";

const Sidebar = ({ postId }) => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const topStories = [];

  for (let i = 0; i < 3; ) {
    let num = Math.floor(Math.random() * 12);
    if (num > 1 && !topStories.includes(num)) {
      topStories.push(num);
      ++i;
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Request.get(`/posts/${search}`);
      setPosts(res.data.filter((post) => post._id !== postId));
    };

    fetchPosts();
  }, [search, postId]);
  console.log(topStories);

  return (
    <div className="sidebar">
      <div className="sidebar-top-stories-container">
        <div className="sidebar-heading">
          <h2>Top Stories</h2>
        </div>

        <Link
          to={`/post/${posts[topStories[0]]?._id}`}
          className="link sidebar-links"
        >
          <div className="sidebar-top-story">
            <div className="sidebar-top-img-container">
              <img src={posts[topStories[0]]?.image} alt="" />
            </div>

            <div className="sidebar-content">
              <h3>{posts[topStories[0]]?.title}</h3>

              <p>
                {posts[topStories[0]]?.description
                  .substring(0, posts[topStories[0]]?.description.indexOf("\n"))
                  .trim()}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to={`/post/${posts[topStories[1]]?._id}`}
          className="link sidebar-links"
        >
          <div className="sidebar-top-story">
            <div className="sidebar-top-img-container">
              <img src={posts[topStories[1]]?.image} alt="" />
            </div>

            <div className="sidebar-content">
              <h3>{posts[topStories[1]]?.title}</h3>

              <p>
                {posts[topStories[1]]?.description
                  .substring(0, posts[topStories[1]]?.description.indexOf("\n"))
                  .trim()}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to={`/post/${posts[topStories[2]]?._id}`}
          className="link sidebar-links"
        >
          <div className="sidebar-top-story">
            <div className="sidebar-top-img-container">
              <img src={posts[topStories[2]]?.image} alt="" />
            </div>

            <div className="sidebar-content">
              <h3>{posts[topStories[2]]?.title}</h3>

              <p>
                {posts[topStories[2]]?.description
                  .substring(0, posts[topStories[2]]?.description.indexOf("\n"))
                  .trim()}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
