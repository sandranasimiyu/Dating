import React from "react";
import "./index.css";
import "./index.css";
import searchImg from "./assets/search.png";
import facebookImg from "./assets/facebook.png";
import linkedinImg from "./assets/linkedin.png";

const Register = () => {
  return (
    <div className="Register-cont">
      <h1 className="create-name">Create Account</h1>
      <div className="svgs">
        <img src={searchImg} alt="" />
        <img src={facebookImg} alt="" />
        <img src={linkedinImg} alt="" />
      </div>
      <p>or use your email for registration</p>
      <div>
        <input className="input" type="text" placeholder="First Name" />
        <input className="input" type="text" placeholder="Last Name" />
        <input className="input" type="text" placeholder="Username" />
        <input className="input" type="Email" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <input
          className="input"
          type="password"
          placeholder="Confirm password"
        />
      </div>

      <div className="check">
        <input type="checkbox" id="check" />
        <p className="agree">
          I agree to the <t />{" "}
          <a className="tg" href="#">
            Terms and conditions
          </a>
        </p>
      </div>

      <button className="btn-3">SIGN UP</button>
      <p>
        Already have an account?
        <a className="have" href="#">
          Log in
        </a>
      </p>
    </div>
  );
};

export default Register;
