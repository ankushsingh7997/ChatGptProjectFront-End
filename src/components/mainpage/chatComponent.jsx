import { useState, useRef, useEffect } from "react";
import style from "../../componentcss/Mainpage.module.css";
import { userId, userChat } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Icon } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FacebookShareButton } from "react-share";
import { chatLogView } from "../../recoil/atom";

function ChatComponent() {
  const [userChatLog, setUserChat] = useRecoilState(userChat);

  const userid = useRecoilValue(userId);
  const [userQuestion, setUserQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const myChatRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorEl = useRef(null);
  const useChatLog=useRecoilValue(chatLogView)

  // share option methods
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  async function handleQuestion() {
    if (userQuestion.trim() != "") {
      let question = userQuestion;
      setUserQuestion("");

      setConversation([
        conversation.push({ user: "me", text: question }),
        ...conversation,
      ]);

    
      let result = await fetch(`http://localhost:4000/ask/${userid}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `${question}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => res);

      if (!result.status) {
        // need to add error here
      } else {
        console.log(result.message)
        setConversation([
          conversation.push({ user: "bot", text: result.message }),
          ...conversation,
        ]);

        
        setUserChat([
          {
            uniqueKey: result.uniqueKey,
            question: result.question,
            answer: result.message,
          },
          ...userChatLog,
        ]);

        
        
        console.log(conversation)
      }
    }
  }
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("copied"))
      .catch(() => console.log("some error"));

    // here in then  i  have to add code to show that text is successfully copied
  };
  const handleFacebookShare = (text) => {
    console.log("am i here");
    return (
      <FacebookShareButton quote={text} hashtag={"#chatBot"}>
        share on facebook
      </FacebookShareButton>
    );
  };

  const handleTwitterShare = (text) => {};
  const handleLinkedinShare = (text) => {};

// set chat from logs


const setChat=()=>{
     
  setConversation([...useChatLog])
  
}
useEffect(() => {
  setChat()
}, [useChatLog]);


  useEffect(() => {
    myChatRef.current.scrollTo(0, myChatRef.current.scrollHeight);
  }, [conversation]);



  return (
    <div className={style.mainCard}>
      <div className={style.chatCard}>
        <ul className={style.myChatList} ref={myChatRef}>
          {conversation.map((item, index) => {
            if (item.user === "me" && item.message != "") {
              return (
                <div key={index} className={style.conversationOuther}>
                  <div className={style.conversation}>
                    <li className={style.userChat}>
                      <Icon>
                        <PersonIcon></PersonIcon>
                      </Icon>
                      {" : "}
                      {item.text}
                    </li>
                  </div>
                </div>
              );
            } else if (item.user === "bot" && item.message != "") {
              return (
                <div key={index} className={style.conversationOuther}>
                  <div className={style.convoAndLogo}>
                    <div className={style.conversation}>
                      <li className={style.BotReply}>
                        <Icon>
                          <SmartToyIcon></SmartToyIcon>
                        </Icon>
                        {" : "}
                        {item.text}
                      </li>
                    </div>
                    <div>
                      <span onClick={() => handleCopy(item.text)}>
                        {" "}
                        <IconButton>
                          <ContentCopyIcon />
                        </IconButton>
                      </span>
                      <span>
                        {" "}
                        <ClickAwayListener onClickAway={handleMenuClose}>
                          <IconButton onClick={handleMenuOpen} ref={anchorEl}>
                            <ShareIcon />
                          </IconButton>
                        </ClickAwayListener>{" "}
                        <Menu
                          anchorEl={anchorEl.current}
                          open={isMenuOpen}
                          // PaperProps={}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            onClick={() => handleFacebookShare(item.text)}
                          >
                            Share on Facebook
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleTwitterShare(item.text)}
                          >
                            Share on Twitter
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleLinkedinShare(item.text)}
                          >
                            Share on LinkedIn
                          </MenuItem>
                        </Menu>
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </ul>
      </div>
      <div className={style.submitQuestion}>
        <input
          type="text"
          placeholder="Type your question here"
          value={userQuestion}
          className={style.inputQuestion}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleQuestion();
            }
          }}
          onChange={(e) => {
            setUserQuestion(e.target.value);
          }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          className={style.submitChat}
          onClick={handleQuestion}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
export default ChatComponent;
