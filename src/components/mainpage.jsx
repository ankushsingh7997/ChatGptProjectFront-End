import React, { useEffect, useState } from "react";
import style from '../componentcss/Mainpage.module.css'
import { UserDetail, userId } from "../recoil/atom";
import { useRecoilValue,useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Icon from '@mui/material/Icon';




function Mainpage()
{
  const[userData,setUserData]=useState();
  const userid=useRecoilValue(userId);
  const navigate=useNavigate()
   

  useEffect(()=>{
    if(localStorage.getItem('login')=="false") 
    {
      navigate('/Login')
    }

    (async ()=>{
      await fetch(`http://localhost:4000/fetchuser/${userid}`).then((res)=>res.json()).then((data)=>setUserData(data))
    })();
    
    },[]);
    console.log(userData)
   
    
  return(
    <div className={style.mainContainer}>
      
      <div className={style.slideCard} >
      <h3>chat logs</h3>
      <ul className={style.myList}>
        {userData&&userData.chatLogs.questions.map((item)=>(
          <li key={item.uniqueKey}>
          <div className={style.question}>
         <label ><span > <Icon>
        <ChatBubbleOutlineOutlinedIcon />
      </Icon></span>{item.question} <span className={style.mySpan}> <Icon>
        <DeleteOutlinedIcon />
      </Icon></span>  </label>
          </div>
          
          </li> ))}
         
     
      </ul>
      <hr></hr>
      <h3>rest of the details</h3>
      
    </div>
    <div  className={style.mainCard}>
    <h1>hello there</h1>
      
    </div>
      
    </div>
  )
}

export default Mainpage;