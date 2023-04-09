

import React from "react";
import { Link } from "react-router-dom";
import style from "../componentcss/Homepage.module.css";

function Homepage() {
  return (
    <div className={style.homepage_container}>
      <h1>welcome to chatGpt</h1>
      <div className={style.homepage_links}>
        <p>Already have account?</p>
        <Link to="/login">Login</Link>
      </div>
      <div className={style.homepage_links}>
        <p>Need  an account?  </p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Homepage;
