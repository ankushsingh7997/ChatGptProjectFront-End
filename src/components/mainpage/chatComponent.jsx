import { useState,useRef, useEffect } from "react";
import style from "../../componentcss/Mainpage.module.css";
import { userId ,userChat} from "../../recoil/atom";
import { useRecoilState, useRecoilValue,useSetRecoilState } from "recoil";
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Icon } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function ChatComponent()
{  const [userChatLog,setUserChat]=useRecoilState(userChat) 
  // console.log(userChatLog)
  const userid=useRecoilValue(userId)
  const[userQuestion,setUserQuestion]=useState("")
  const[conversation,setConversation]=useState([])
  const myChatRef = useRef(null);

    async function handleQuestion()
    {
     if(userQuestion.trim()!='')
     {
        let question=userQuestion
        setUserQuestion('')

        setConversation([conversation.push({user:"me",text:`${question}`}),...conversation])
        let result= await fetch(`http://localhost:4000/ask/${userid}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: `${question}`,
            })
          }).then((response)=>response.json()).then((res)=>res)

          if(!result.status)
          {
              // need to add error here
          }
          else{


            // console.log(result.message)
            setConversation([conversation.push({user:"bot",text:`${result.message}`}),...conversation])
            setUserChat([{uniqueKey:result.uniqueKey,question:result.question,answer:result.message},...userChatLog])

          }
        }
   
     }



 
    


     useEffect(() => {
      myChatRef.current.scrollTo(0, myChatRef.current.scrollHeight);
    }, [conversation]);


    return(
       <div className={style.mainCard}>
        
        <div className={style.chatCard}>
          
            
        <ul className={style.myChatList} ref={myChatRef}>

        {conversation.map((item,index)=>{
    if(item.user === 'me'&&item.message!='') {
        return (
          
            <div key={index} className={style.conversationOuther}>
                <div className={style.conversation}>
                    
                    <li className={style.userChat}><Icon><PersonIcon></PersonIcon></Icon>{" : "}{item.text}</li>
                   
                </div>
            </div>
            
        );
    } else if(item.user === 'bot'&&item.message!='') {
        return (
          
            <div key={index} className={style.conversationOuther}>
                <div className={style.conversation}>
                   
                    <li className={style.BotReply}><Icon><SmartToyIcon></SmartToyIcon></Icon>{" : "}{item.text}</li>
                    
                </div>
             </div>
            
        );
    }
})}
</ul>

    
                
 
    
      </div>
      <div className={style.submitQuestion}>
      <input type="text" placeholder="Type your question here" value={userQuestion}className={style.inputQuestion} onChange={(e) => {
              setUserQuestion(e.target.value);
            }}
          />
          <Button variant="contained" endIcon={<SendIcon />} type="submit" className={style.submitChat} onClick={handleQuestion} >
            Send
          </Button>
          </div>

      </div> 

    )

 }
 export default ChatComponent;


