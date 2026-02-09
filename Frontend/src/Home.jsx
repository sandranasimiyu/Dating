import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <div className="Container">
      <div className="top-cont">
        <div className="name">
          <h1>Kindlee</h1>
        </div>
        <div>
          <Link className="tags" to="/">
            Home
          </Link>
          {user ? (
            <>
              <span className="tags" style={{ cursor: "default" }}>
                Hi, {user.firstName}
              </span>
              <button 
                className="tags" 
                onClick={handleLogout}
                style={{ 
                  background: "none", 
                  border: "none", 
                  cursor: "pointer",
                  color: "inherit",
                  font: "inherit"
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className="tags" to="/signing">
                Log In
              </Link>
              <Link className="tags" to="/register">
                Join
              </Link>
            </>
          )}
          <a className="tags" href="#">
            About Us
          </a>
        </div>
      </div>
      <div className="mini-cont">
        <div className="left-cont">
          <div>
            <h3>HELLO THERE</h3>
          </div>
          <div>
            <h2>
              Say goodbye to lonely nights. <br />
              Meet someone special.
            </h2>
          </div>
          <div>
            <h4>Real people. Real dates. Really simple.</h4>
          </div>
          <div>
            <button 
              className="btn-2"
              onClick={() => {
                if (user) {
                  alert("View Profiles feature coming soon!");
                } else {
                  navigate("/signing");
                }
              }}
            >
              View Profiles
            </button>
            <Link to="/register">
              <button className="btn-1">Sign Up</button>
            </Link>
          </div>
        </div>
        <div className="right-cont">
          <img
            src="https://i.pinimg.com/1200x/12/d4/81/12d4810b9d25f866a98245e23c775351.jpg"
            alt="Dating couple"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
