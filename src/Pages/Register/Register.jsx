import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { Request } from "../../Request";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await Request.post("/auth/register", {
        username,
        email,
        password,
      });

      res.data && window.location.replace("#/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form action="" onSubmit={handleSubmit} className="register-form">
        <label htmlFor="registre-username">Username</label>
        <input
          type="text"
          placeholder="Enter Your Username..."
          id="register-username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="register-email">Email</label>
        <input
          type="text"
          placeholder="Enter Your Email..."
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          placeholder="Enter Your Password..."
          id="register-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="register-btn">
          Register
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "0.15rem" }}>
            Oop's Someting went Wrong!
          </p>
        )}
      </form>
      <button className="register-login-btn">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
};

export default Register;
