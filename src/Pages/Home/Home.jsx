import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import Footer from "../../Components/Footer/Footer";
import { Request } from "../../Request";
import "./Home.css";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Request.get(`/posts/${search}`);
      setPosts(res.data);
      setIsLoading(false);
    };

    fetchPosts();
  }, [search]);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
