import style from "../../componentcss/Mainpage.module.css";

import LeftSlide from "./leftSlide";
import ChatComponent from "./chatComponent";

function Mainpage() {


  return (
    <div className={style.mainContainer}>
      <LeftSlide/>
      <ChatComponent/>
      
    </div>
  );
}

export default Mainpage;
