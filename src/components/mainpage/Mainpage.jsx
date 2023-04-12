import style from "../../componentcss/Mainpage.module.css";

import LeftSlide from "./leftSlide";
import ChatComponent from "./chatComponent";
import { chatVisibility,editProfileVisibility } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import EditProfile from "./profileUpdate";

function Mainpage() {
  const visible=useRecoilValue(chatVisibility);
  const profileVisible=useRecoilValue(editProfileVisibility);


  return (
    <div className={style.mainContainer}>
      <LeftSlide/>
     {visible ? <ChatComponent/>:''}
     {profileVisible?<EditProfile/>:''}
      
    </div>
  );
}

export default Mainpage;
