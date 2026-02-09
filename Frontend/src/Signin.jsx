import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import GoogleLoginButton from "./GoogleLoginButton";
import facebookImg from "./assets/facebook.png";
import linkedinImg from "./assets/linkedin.png";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        alert(`Welcome back, ${data.data.user.firstName}!`);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please check if the server is running.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign">
      <h1 className="log">Login</h1>
      <div className="svgs">
        <GoogleLoginButton />
        <img src={facebookImg} alt="Facebook" />
        <img src={linkedinImg} alt="LinkedIn" />
      </div>
      <p>or use your email account</p>
      
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button className="btn-4" type="submit" disabled={loading}>
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>

      <p>
        You don't have an account?
        <Link className="dont" to="/register">
          {" "}Sign up
        </Link>
      </p>
      <a className="fog" href="#">
        Forgot your password?
      </a>
    </div>
  );
};

export default Signin;
