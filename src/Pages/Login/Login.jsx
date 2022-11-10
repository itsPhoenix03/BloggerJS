import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import { Request } from "../../Request";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "Login_Process_Started" });

    try {
      const res = await Request.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "Login_Successful", payload: res.data });
    } catch (error) {
      dispatch({ type: "Login_Failed" });
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit} className="login-form">
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          placeholder="Enter Your Username..."
          id="login-username"
          ref={userRef}
        />

        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          placeholder="Enter Your Password..."
          id="login-password"
          ref={passwordRef}
        />

        <button type="submit" className="login-btn" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="login-register-btn">
        <Link to="/register" className="link">
          Sign Up
        </Link>
      </button>
    </div>
  );
};

export default Login;
