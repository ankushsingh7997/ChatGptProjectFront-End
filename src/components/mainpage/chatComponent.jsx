import { useState } from "react";
import style from "../../componentcss/Mainpage.module.css";
import { userId } from "../../recoil/atom";
import { useRecoilValue } from "recoil";

 function ChatComponent()
 {
    const userid=useRecoilValue(userId)
    const[userQuestion,setUserQuestion]=useState("")
    const[conversation,setConversation]=useState([])

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

          }
          else{

            console.log(result.message)
            setConversation([conversation.push({user:"bot",text:`${result.message}`}),...conversation])

          }
          

     }
     console.log(conversation)
     

    }

    return(
       <div className={style.mainCard}>
        
        <div className={style.chatCard}>
            
            

        {conversation.map((item)=>{
    if(item.user === 'me'&&item.message!='') {
        return (
            <div className={style.conversationOuther}>
                <div className={style.conversation}>
                    <ul>
                        <li className={style.BotReply}>{item.text}</li>
                    </ul>
                </div>
            </div>
        );
    } else if(item.user === 'bot'&&item.message!='') {
        return (
            <div className={style.conversationOuther}>
                <div className={style.conversation}>
                    <ul>
                        <li className={style.userChat}>{item.text}</li>
                    </ul>
                </div>
            </div>
        );
    }
})}
    
                
 
    
      </div>
      <div className={style.submitQuestion}>
      <input type="text" placeholder="Type your question here" value={userQuestion}className={style.inputQuestion} onChange={(e) => {
              setUserQuestion(e.target.value);
            }}
          />
          <button type="submit" className={style.submitChat} onClick={handleQuestion} >
            Send
          </button>
          </div>

      </div> 

    )

 }
 export default ChatComponent;