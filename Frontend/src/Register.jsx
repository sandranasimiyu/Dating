import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import GoogleLoginButton from "./GoogleLoginButton";
import facebookImg from "./assets/facebook.png";
import linkedinImg from "./assets/linkedin.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();
      
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        alert("Registration successful!");
        navigate("/dashboard");
      } else {
        // Handle validation errors array
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => `${err.field}: ${err.message}`).join("\n");
          setError(errorMessages);
        } else {
          setError(data.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Network error. Please check if the server is running on http://localhost:5000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Register-cont">
      <h1 className="create-name">Create Account</h1>
      <div className="svgs">
        <GoogleLoginButton />
        <img src={facebookImg} alt="Facebook" />
        <img src={linkedinImg} alt="LinkedIn" />
      </div>
      <p>or use your email for registration</p>
      
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="check">
          <input
            type="checkbox"
            id="check"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <p className="agree">
            I agree to the{" "}
            <a className="tg" href="#">
              Terms and conditions
            </a>
          </p>
        </div>

        <button className="btn-3" type="submit" disabled={loading}>
          {loading ? "SIGNING UP..." : "SIGN UP"}
        </button>
      </form>

      <p>
        Already have an account?
        <Link className="have" to="/signing">
          {" "}Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
