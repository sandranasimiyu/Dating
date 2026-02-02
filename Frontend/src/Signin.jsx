import React from "react";
import "./index.css";
import searchImg from "./assets/search.png";
import facebookImg from "./assets/facebook.png";
import linkedinImg from "./assets/linkedin.png";

const Signin = () => {
  return (
    <div className="sign">
      <h1 className="log">Login</h1>
      <div className="svgs">
        <img src={searchImg} alt="" />
        <img src={facebookImg} alt="" />
        <img src={linkedinImg} alt="" />
      </div>
      <p>or use your email account</p>
      <div>
        <input className="input" type="Email" placeholder="Email" /> <br />
        <input className="input" type="password" placeholder="Password" />
      </div>
      <button className="btn-4">Login</button>
      <p>
        You don't have an account?
        <a className="dont" href="#">
          Sign up
        </a>
      </p>
      <a className="fog" href="#">
        Forgot your password?
      </a>
    </div>
  );
};

export default Signin;
