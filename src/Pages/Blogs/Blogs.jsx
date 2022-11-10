import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Request } from "../../Request";
import "./Blogs.css";

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Request.get(`/posts/`);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // console.log(posts[3]?.title);

  return (
    <>
      <div className="blogs-wrapper">
        <div className="blogs-container-top">
          <Link to={`/post/${posts[5]?._id}`} className="link">
            <div className="main-blog-container">
              <img src={posts[5]?.image} alt="" />

              <div className="main-blog-content">
                <span>
                  {new Date(posts[5]?.updatedAt)
                    .toDateString()
                    .split(" ")
                    .splice(1, 2)
                    .join(" ")}
                </span>

                <h3>{posts[5]?.title}</h3>

                <p>
                  {posts[5]?.description
                    .substring(0, posts[5]?.description.indexOf("\n"))
                    .trim()}
                </p>
              </div>
            </div>
          </Link>

          <div className="other-blogs-wrapper">
            <Link to={`/post/${posts[3]?._id}`} className="link">
              <div className="other-blog-container">
                <img src={posts[3]?.image} alt="" />

                <div className="other-blog-content">
                  <span>
                    {new Date(posts[3]?.updatedAt)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .join(" ")}
                  </span>

                  <h4>{posts[3]?.title}</h4>

                  <p>
                    {posts[3]?.description
                      .substring(0, posts[3]?.description.indexOf("\n"))
                      .trim()}
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`/post/${posts[7]?._id}`} className="link">
              <div className="other-blog-container">
                <img src={posts[7]?.image} alt="" />

                <div className="other-blog-content">
                  <span>
                    {new Date(posts[7]?.updatedAt)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .join(" ")}
                  </span>

                  <h4>{posts[7]?.title}</h4>

                  <p>
                    {posts[7]?.description
                      .substring(0, posts[7]?.description.indexOf("\n"))
                      .trim()}
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`/post/${posts[11]?._id}`} className="link">
              <div className="other-blog-container">
                <img src={posts[11]?.image} alt="" />

                <div className="other-blog-content">
                  <span>
                    {new Date(posts[11]?.updatedAt)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .join(" ")}
                  </span>

                  <h4>{posts[11]?.title}</h4>

                  <p>
                    {posts[11]?.description
                      .substring(0, posts[11]?.description.indexOf("\n"))
                      .trim()}
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`/post/${posts[4]?._id}`} className="link">
              <div className="other-blog-container">
                <img src={posts[4]?.image} alt="" />

                <div className="other-blog-content">
                  <span>
                    {new Date(posts[4]?.updatedAt)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .join(" ")}
                  </span>

                  <h4>{posts[4]?.title}</h4>

                  <p>
                    {posts[4]?.description
                      .substring(0, posts[4]?.description.indexOf("\n"))
                      .trim()}
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`/post/${posts[2]?._id}`} className="link">
              <div className="other-blog-container">
                <img src={posts[2]?.image} alt="" />

                <div className="other-blog-content">
                  <span>
                    {new Date(posts[2]?.updatedAt)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .join(" ")}
                  </span>

                  <h4>{posts[2]?.title}</h4>

                  <p>
                    {posts[2]?.description
                      .substring(0, posts[2]?.description.indexOf("\n"))
                      .trim()}
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`/post/${posts[1]?._id}`} className="link">
              <div className="other-blog-container">
                <img src={posts[1]?.image} alt="" />

                <div className="other-blog-content">
                  <span>
                    {new Date(posts[1]?.updatedAt)
                      .toDateString()
                      .split(" ")
                      .splice(1, 2)
                      .join(" ")}
                  </span>

                  <h4>{posts[1]?.title}</h4>

                  <p>
                    {posts[1]?.description
                      .substring(0, posts[1]?.description.indexOf("\n"))
                      .trim()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="all-blogs-container">
          {posts
            .filter(
              (post) => ![1, 2, 3, 4, 5, 7, 11].includes(posts.indexOf(post))
            )
            .map((post) => (
              <div className="single-blog-container" id={post?._id}>
                <img src={post?.image} alt="" />

                <Link to={`/post/${post?._id}`} className="link">
                  <div className="single-blog-content">
                    <span>
                      {new Date(post?.updatedAt)
                        .toDateString()
                        .split(" ")
                        .splice(1, 2)
                        .join(" ")}
                    </span>

                    <h4>{post?.title}</h4>

                    <p>
                      {post?.description
                        .substring(0, post?.description.indexOf("\n"))
                        .trim()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blogs;
