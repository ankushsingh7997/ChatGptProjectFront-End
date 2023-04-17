import React, { useEffect, useState } from "react";
import style from './mainpagecss/Mainpage.module.css'
import { userChat, userId, userprofileData } from "../../recoil/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Icon from "@mui/material/Icon";
import Profile from "./profileCart";
import { chatLogView, leftSlideVisivility } from "../../recoil/atom";
import Swal from "sweetalert2";

function LeftSlide() {
  // user chat

  const [userData, setUserData] = useRecoilState(userChat);
  const userid = useRecoilValue(userId);
  const setUserProfile = useSetRecoilState(userprofileData);
  const navigate = useNavigate();
  const setChatLog = useSetRecoilState(chatLogView);

  useEffect(() => {
    if (localStorage.getItem("login") == "false") {
      navigate("/");
    }

    (async () => {
      await fetch(`https://chatgpt3-ujj0.onrender.com/fetchuser/${userid}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.chatLogs.questions);
          setUserProfile(data.data);
        });
    })();
  }, []);

  async function handleDelete(uniqueKey) {
    let result = await fetch(
      `https://chatgpt3-ujj0.onrender.com/deleteChat/${userid}/${uniqueKey}`,
      {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((result) => result.json())
      .then((result) => {
        let newLIst = userData.filter((item) => item.uniqueKey !== uniqueKey);

        setUserData(newLIst);
      })
      .catch(() => console.log("there is some error"));
  }
  const onclickChat = (item) => {
    setChatLog([
      { user: "me", text: item.question },
      { user: "bot", text: item.answer },
    ]);
  };
  const handleDeleteConversation = async () => {
    if (userData.length != 0) {
      let result = await fetch(
        `https://chatgpt3-ujj0.onrender.com/deleteAllChat/${userid}`,
        {
          method: "DELETE",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
        .then((result) => result.json())
        .then((result) => {
          setUserData([]);
        })
        .catch(() => console.log("there is some error"));
    } else {
      Swal.fire("chat is already deleted");
    }
  };

  return (
    <div className={style.slideCard}>
      <ul className={style.myList}>
        <h3>chat logs</h3>
        {userData &&
          userData.map((item) => (
            <li key={item.uniqueKey}>
              <div className={style.question}>
                <span className={style.chatBubble}>
                  <Icon>
                    <ChatBubbleOutlineOutlinedIcon />
                  </Icon>
                </span>
                <label onClick={() => onclickChat(item)}>{item.question}</label>{" "}
                <span className={style.mySpan}>
                  {" "}
                  <span onClick={() => handleDelete(item.uniqueKey)}>
                    <Icon>
                      <DeleteOutlinedIcon />
                    </Icon>
                  </span>
                </span>
              </div>
            </li>
          ))}
      </ul>

      <button
        className={style.deleteAllChat}
        onClick={handleDeleteConversation}
      >
        <label className={style.deleteconvoButton}>delete conversation</label>
      </button>
      <hr className={style.hr}></hr>
      <div className={style.card}>
        <Profile />
      </div>
    </div>
  );
}

export default LeftSlide;
