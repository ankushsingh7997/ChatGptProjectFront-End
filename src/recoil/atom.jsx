import { atom } from "recoil";

export const userChat = atom({
  key: "userChat",
  default: [],
});

export const userId=atom({
    key:"userId",
    default:""
})
