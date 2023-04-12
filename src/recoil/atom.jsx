import { atom } from "recoil";

export const userChat = atom({
  key: "userChat",
  default: [],
});

export const userId = atom({
  key: "userId",
  default: "",
});
export const userprofileData = atom({
  key: "userprofileData",
  default: {},
});
// export const chattingboxx=atom({
//   key:"chattingboxx",
//   default:[]
// })
export const chatVisibility=atom({
  key:"chatVisibility",
  default:true
});
export const editProfileVisibility=atom({
  key:"editProfileVisibility",
  default:false
});
export const chatLogView=atom({
  key:"chatLogView",
  default:[]
});
