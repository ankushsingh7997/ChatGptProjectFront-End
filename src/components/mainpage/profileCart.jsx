import React from "react";
import style from './mainpagecss/Mainpage.module.css'
import LogoutIcon from "@mui/icons-material/Logout";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Icon } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  userChat,
  userId,
  userprofileData,
  chatVisibility,
  editProfileVisibility,
} from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { chatLogView } from "../../recoil/atom";
import { CgProfile } from "react-icons/cg";

function Profile() {
  const [userData, setUserData] = useRecoilState(userprofileData);
  const chat = useSetRecoilState(userChat);
  const id = useSetRecoilState(userId);
  const navigate = useNavigate();
  const setChatLog = useSetRecoilState(chatLogView);
  const [chatVisible, setChatVisible] = useRecoilState(chatVisibility);
  const [editProfileVisibile, setEditProfileVisibile] = useRecoilState(
    editProfileVisibility
  );

  function handleLogout() {
    chat([]);
    id("");
    setUserData({});
    localStorage.setItem("login", false);
    localStorage.setItem("authToken", "");
    localStorage.setItem("refreshToken", "");
    setChatLog([]);
    setChatVisible(true);
    setEditProfileVisibile(false);
    navigate("/");
  }

  return (
    <div className={style.profileCard}>
      <div className={style.image}>
        {userData.profileImage != "" ? (
          <Avatar
            src={userData.profileImage}
            sx={{ width: 120, height: 116, fontSize: "5rem" }}
            alt="image"
          ></Avatar>
        ) : (
          <Avatar
            src={
              "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/profileImage/alex-knight-2EJCSULRwC8-unsplash__1_-removebg-preview.png"
            }
            sx={{ width: 120, height: 116, fontSize: "5rem" }}
          ></Avatar>
        )}
      </div>
      <div className={style.userName}>
        <div className={style.name}>{userData.name}</div>
      </div>
      ///broken-image.jpg
      <div className={style.logout} onClick={handleLogout}>
        <Icon>
          <LogoutIcon></LogoutIcon>
        </Icon>{" "}
        <label>Logout</label>
      </div>
      <div
        className={style.optional}
        onClick={() => {
          setChatVisible(false);
          setEditProfileVisibile(true);
        }}
      >
        {/* <Icon> */}
        <CgProfile style={{ fontSize: "1.5rem" }} />
        {/* </Icon>{" "} */}
        <label>Profile</label>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Profile;
