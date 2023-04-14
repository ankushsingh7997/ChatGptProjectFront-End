

import React from "react";
import style from "../../componentcss/Homepage.module.css";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate=useNavigate()
  return (
    <div className={style.bodyContainer}>
     
    <div className={style.homepage_container1}>
      
      
      
      <div><Login/></div>
      <div className={style.homepage_links}>
        <div className={style.white}>   Need  an account  </div>
        <div><button className={style.myRegister} onClick={()=>{navigate('/register')}}>Register</button></div>
        
      </div>
    </div>
   <div className={style.homepage_container2}></div>
    </div>
  
  );
}

export default Homepage;
