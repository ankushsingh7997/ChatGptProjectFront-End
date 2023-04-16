// import style from "../../componentcss/Mainpage.module.css"
// import LeftSlide from "./leftSlide";
// import ChatComponent from "./chatComponent";
// import { chatVisibility,editProfileVisibility } from "../../recoil/atom";
// import { useRecoilState, useRecoilValue } from "recoil";
// import EditProfile from "./profileUpdate";
// import {ImMenu} from "react-icons/im";
// import { useState } from "react";

// import {MdMenuOpen} from "react-icons/md";


// function Mainpage() {
//   const visible=useRecoilValue(chatVisibility);
//   const profileVisible=useRecoilValue(editProfileVisibility);
//   const [showSlideCard, setShowSlideCard] = useState(false);

//   function handleClick() {
//     alert('hii')
//     setShowSlideCard(true);
//   }



//   return (
//     <div className={style.mainContainer}>
//       <div className={style.openCloseButton}><span   className={style.openMenu}  onClick={handleClick}><ImMenu/></span>
     
//      <span  className={style.closeMenu} ><MdMenuOpen/></span></div> 
//       <LeftSlide style={{ display: showSlideCard ? 'none' : 'block' }} className={style.myleftslide}/>
//      {visible ? <ChatComponent/>:''}
//      {profileVisible?<EditProfile/>:''}
      
//     </div>
//   );
// }

// export default Mainpage;




import style from "../../componentcss/Mainpage.module.css";
import LeftSlide from "./leftSlide";
import ChatComponent from "./chatComponent";
import { chatVisibility, editProfileVisibility } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import EditProfile from "./profileUpdate";
import { ImMenu } from "react-icons/im";
import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";

function Mainpage() {
  const visible = useRecoilValue(chatVisibility);
  const profileVisible = useRecoilValue(editProfileVisibility);
  const [showSlideCard, setShowSlideCard] = useState(false);

  function handleClick() {
    alert('hiii')
    setShowSlideCard(!showSlideCard);
  }

  return (
    <div className={style.mainContainer}>
      
      <LeftSlide
        style={{ display: showSlideCard ? 'none' : 'block' }}
        className={style.myleftslide}
      />
      {visible ? <ChatComponent /> : ''}
      {profileVisible ? <EditProfile /> : ''}
    </div>
  );
}

export default Mainpage;
