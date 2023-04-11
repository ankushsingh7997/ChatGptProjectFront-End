import React, { useEffect, useState } from "react";
import style from "../../componentcss/Mainpage.module.css";
import { userChat, userId } from "../../recoil/atom";
import { useRecoilState ,useRecoilValue } from "recoil";
// import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Icon from "@mui/material/Icon";
import Profile from "./profileCart";

function LeftSlide() {
  // user chat
  
  const [userData,setUserData]= useRecoilState(userChat);
  const userid = useRecoilValue(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login") == "false") {
      navigate("/Login");
    }

    (async () => {
      await fetch(`http://localhost:4000/fetchuser/${userid}`)
        .then((res) => res.json())
        .then((data) => setUserData(data.chatLogs.questions));
    })();
  }, []);



  async function handleDelete(uniqueKey)
  {
    console.log(' am i here')
    let result=await fetch(`http://localhost:4000/deleteChat/${userid}/${uniqueKey}`,{
    method:'DELETE',
    headers:{
      'content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('authToken')}`
    }
}).then(result=> result.json()).then(result=>{
  

  let newLIst=userData.filter((item)=>item.uniqueKey!==uniqueKey)

    setUserData(newLIst)

}).catch(()=>console.log('there is some error'));
   

           
  }

  

  return (
   
      <div className={style.slideCard}>
        
        <ul className={style.myList}>
        <h3>chat logs</h3>
          {userData &&
            userData.map((item) => (
              <li key={item.uniqueKey}>
                <div className={style.question}>
                  <span>
                    {" "}
                    <Icon>
                      <ChatBubbleOutlineOutlinedIcon />
                    </Icon>
                  </span>
                  <label>{item.question}</label>{" "}
                  <span className={style.mySpan}>
                    {" "}<span onClick={()=>handleDelete(item.uniqueKey)} >
                    <Icon >
                      <DeleteOutlinedIcon />
                    </Icon></span>
                  </span>
                </div>
              </li>
            ))}
        </ul>
        <hr></hr>
        
        <div className={style.card}>
        
          <Profile/>
        </div>
      </div>
    
   
  );
}

export default LeftSlide;