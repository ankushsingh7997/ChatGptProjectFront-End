import React, { useState } from "react";
import { isValidEmail } from "../validations/validation";
import style from "../componentcss/Login.module.css";
// import { userId } from "../recoil/atom";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import   {toast}  from "react-hot-toast";
export default function Login() {
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [error, SetError] = useState("");
  const navigate=useNavigate()

  console.log(email)
  // const setId = useSetRecoilState(userId); // if we want to set recoil

  async function HandleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email))
    { SetError("enter a valid email");
    setInterval(() => {
      SetError("")
    }, 20000);
  }
    else {
      let obj = { email, password };
  
      let result = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(obj),
      });

      result = await result.json();
      if (!result.status)
      { SetError(result.message);
        setInterval(() => {
          SetError("")
        }, 20000);
      }
      else {
        
        localStorage.setItem('login', true);
        localStorage.setItem('authToken',result.data["x-api-key"])
        localStorage.setItem('refreshToken',result.data["refreshToken"])
        
        Swal.fire("login successfully");
        navigate('/Mainpage')
        
      }
    }
  }

  return (
    <div className={style.Container}>
      <form className={style.Form}>
        <section>
          <h1>login</h1>
        </section>
        <section>
          <input
            type={"email"}
            value={email}
            placeholder="email"
            onChange={(e) => {
              SetEmail(e.target.value.trim());
            }}
          ></input>
        </section>
        <section>
          <input
            type={"password"}
            value={password}
            placeholder="password"
            onChange={(e) => {
              SetPassword(e.target.value.trim());
            }}
          ></input>
        </section>
        <section>
          <button className={style.loginButton} onClick={HandleSubmit}>
            SignIn
          </button>
        </section>
        <section>
          <div className={style.error} style={{ color: "red" }}>
            {error}{" "}
          </div>
        </section>
      </form>
    </div>
  );
}
