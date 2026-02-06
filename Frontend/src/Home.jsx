import React from "react";
import "./App.css";

const Login = () => {
  return (
    <div className="Container">
      <div className="top-cont">
        <div className="name">
          <h1>Kindlee</h1>
        </div>
        <div>
          <a className="tags" href="#">
            Home
          </a>
          <a className="tags" href="#">
            Log In
          </a>
          <a className="tags" href="#">
            Join
          </a>
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
            <button className="btn-2">View Profiles</button>
            <button className="btn-1">Sign Up</button>
          </div>
        </div>
        <div className="right-cont">
          <img
            src="https://i.pinimg.com/1200x/12/d4/81/12d4810b9d25f866a98245e23c775351.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
