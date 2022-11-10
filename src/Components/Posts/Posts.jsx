import React from "react";
import { Link } from "react-router-dom";
import Post from "./Post/Post";
import "./Posts.css";

const Posts = ({ posts }) => {
  // Math.floor(Math.random() * arr.length)

  // console.log(posts[2]);

  return (
    <div className="posts">
      <div className="random-stories-container">
        <div className="top-stories-container">
          <div className="heading">
            <h2>Top Stories</h2>
          </div>

          <Link to={`/post/${posts[2]?._id}`} className="link">
            <div className="top-story">
              <div className="top-img-container">
                <img src={posts[2]?.image} alt="" />
              </div>

              <div className="content">
                <h3>{posts[2]?.title}</h3>

                <p>
                  {posts[2]?.description
                    .substring(0, posts[2]?.description.indexOf("\n"))
                    .trim()}
                </p>
              </div>
            </div>
          </Link>

          <Link to={`/post/${posts[1]?._id}`} className="link">
            <div className="top-story">
              <div className="top-img-container">
                <img src={posts[1]?.image} alt="" />
              </div>

              <div className="content">
                <h3>{posts[1]?.title}</h3>

                <p>
                  {posts[1]?.description
                    .substring(0, posts[1]?.description.indexOf("\n"))
                    .trim()}
                </p>
              </div>
            </div>
          </Link>
        </div>

        <Link to={`/post/${posts[0]?._id}`} className="link">
          <div className="main-story-container">
            <div className="img-contianer">
              <img src={posts[0]?.image} alt="" />
            </div>

            <div className="title">
              <span>
                {new Date(posts[0]?.updatedAt)
                  .toDateString()
                  .split(" ")
                  .splice(1, 2)
                  .join(" ")}
              </span>
              <h2>{posts[0]?.title}</h2>
              <p>
                {posts[0]?.description
                  .substring(0, posts[0]?.description.indexOf("\n"))
                  .trim()}
              </p>
            </div>
          </div>
        </Link>

        <div className="opinion-stories">
          <div className="heading opinion-stories-heading">
            <h2>Opinion</h2>
          </div>

          <Link to={`/post/${posts[3]?._id}`} className="link">
            <div className="opinion-story">
              <div className="content opinion-stories-content">
                <h3>{posts[3]?.title}</h3>

                <p>
                  {posts[3]?.description
                    .substring(0, posts[3]?.description.indexOf("\n"))
                    .trim()}
                </p>
              </div>
            </div>
          </Link>

          <Link to={`/post/${posts[4]?._id}`} className="link">
            <div className="opinion-story">
              <div className="content opinion-stories-content">
                <h3>{posts[4]?.title}</h3>

                <p>
                  {posts[4]?.description
                    .substring(0, posts[4]?.description.indexOf("\n"))
                    .trim()}
                </p>
              </div>
            </div>
          </Link>

          <Link to={`/post/${posts[5]?._id}`} className="link">
            <div className="opinion-story">
              <div className="content opinion-stories-content">
                <h3>{posts[5]?.title}</h3>

                <p>
                  {posts[5]?.description
                    .substring(0, posts[5]?.description.indexOf("\n"))
                    .trim()}
                </p>
              </div>
            </div>
          </Link>

          <Link to={`/post/${posts[6]?._id}`} className="link">
            <div className="opinion-story">
              <div className="content opinion-stories-content">
                <h3>{posts[6]?.title}</h3>

                <p>
                  {posts[6]?.description
                    .substring(0, posts[6]?.description.indexOf("\n"))
                    .trim()}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="more-posts-container">
        <div className="more-posts-top">
          <h3>More Stories</h3>

          <Link to={`/blogs`} className="link">
            <button className="more-posts-top-btn">Read More</button>
          </Link>
        </div>
        <div className="more-posts">
          {posts
            .filter(
              (post) =>
                posts.indexOf(post) >= 6 &&
                posts.indexOf(post) !== 7 &&
                posts.indexOf(post) <= 10
            )
            .map((post) => (
              <Post post={post} key={post._id} index={posts.indexOf(post)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
