import React from "react";
import style from "../../componentcss/Mainpage.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Icon } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userChat, userId, userprofileData ,chatVisibility,editProfileVisibility } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { chatLogView } from "../../recoil/atom";
function Profile() {
  const [userData, setUserData] = useRecoilState(userprofileData);
  const chat = useSetRecoilState(userChat);
  const id = useSetRecoilState(userId);
  const navigate = useNavigate();
  const setChatLog=useSetRecoilState(chatLogView)
  const [chatVisible, setChatVisible] = useRecoilState(chatVisibility);
    const [editProfileVisibile, setEditProfileVisibile] = useRecoilState(editProfileVisibility);

  function handleLogout() {
    chat([]);
    id("");
    setUserData({});
    localStorage.setItem("login", false);
    localStorage.setItem("authToken", "");
    localStorage.setItem("refreshToken", "");
    setChatLog([])
    setChatVisible(true)
    setEditProfileVisibile(false)
    navigate("/");
  }

  return (
    <div className={style.profileCard}>
      {/* <div className={style.imageBox}> */}
      <div className={style.image}>
        {userData.profileImage != "" ? (
          <Avatar
            src={userData.profileImage}
            sx={{ width: 120, height: 116, fontSize: "5rem" }}
            alt="image"
          ></Avatar>
        ) : (
          <Avatar
            src="/broken-image.jpg"
            sx={{ width: 120, height: 116, fontSize: "5rem" }}
          ></Avatar>
        )}
      </div>
      <div className={style.userName}>{userData.name}</div>

      {/* </div> */}

      {/* <div className={style.restBox}> */}
      <div className={style.logout} onClick={handleLogout}>
        <Icon>
          <LogoutIcon></LogoutIcon>
        </Icon>{" "}
        <label>Logout</label>
      </div>
      <div className={style.optional} onClick={()=>{setChatVisible(false);setEditProfileVisibile(true)}}>
        <Icon>
          <AcUnitIcon></AcUnitIcon>
        </Icon>{" "}
        <label>update</label>
      </div>

      {/* </div> */}
    </div>
  );
}

export default Profile;
