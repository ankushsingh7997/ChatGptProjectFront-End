import style from "../../componentcss/Register.module.css";
import React, { useState } from "react";
import {
  isValidEmail,
  isValidNo,
  passwordVal,
} from "../../validations/validation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, SetName] = useState("");

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [phone, SetPhone] = useState("");
  const [error, SetError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (name && email && password &&phone) {
      if (!isValidEmail(email)) {
        SetError("enter a valid email");
        setInterval(() => {
          SetError("");
        }, 10000);
      } else if (!passwordVal(password)) {
        SetError("enter a valid password");
        setInterval(() => {
          SetError("");
        }, 10000);
      } else {
        try {
          let item = { name, email, password,phone };
          let dataa = JSON.stringify(item);
          console.log(JSON.stringify(item)); //--------------
          let result = await fetch("https://summer-code-project-backend-72pe.vercel.app/register", {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: dataa,
          });
          result = await result.json();
          if (!result.status) {
            SetError(result.message);
            setInterval(() => {
              SetError("");
            }, 10000);
          }
         
          if (result.status) {
            Swal.fire("Registered successfully");
            SetName("");
            SetEmail("");
            SetPassword("");
            navigate("/");
          } //  SetError("registered successfully")
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      SetError("please enter all the fields");
      setInterval(() => {
        SetError("");
      }, 10000);
    }
  }

  return (
    <div>
      <div className={style.MinContainer}>
        <form className={style.Formm}>
          <section>
            <h1>register</h1>
          </section>

          <section>
            <input
              type="text"
              value={name}
              placeholder="name"
              onChange={(e) => {
                SetName(e.target.value);
              }}
            />
          </section>

          <section>
            <input
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => {
                SetEmail(e.target.value);
              }}
            />
          </section>
          <section>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
            />
          </section>
          <section>
            <input
              type="text"
              value={phone}
              placeholder="phone"
              onChange={(e) => {
                SetPhone(e.target.value);
              }}
            />
          </section>

          <section>
            <button className={style.loginButton} onClick={handleSubmit}>
              submit
            </button>
          </section>

          <section>
            <div className={style.error} style={{ color: "red" }}>
              {error}{" "}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
