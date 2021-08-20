import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import Chatonline from "../../components/chatonline/Chatonline"
import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";
export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setcurrentChat] = useState(null);
    const [messages, setmessages] = useState([]);
    const [newmessages, setNewmessages] = useState(null);
    const {user} = useContext(AuthContext)
    const scrollRef = useRef
    

    useEffect(()=>{
        const getConversations = async ()=>{
            try{
                const res = await axios.get("/conversations/"+user._id)
                setConversations(res.data)
                console.log(res);
            }catch(err){
                console.log(err);
            }

        }
        getConversations();
    },[user._id])
    useEffect(()=>{
        const getMessages = async () =>{
       try{
           
                const res = await axios.get("/messages/"+ currentChat?._id)
                setmessages(res.data)
                console.log(setmessages(res.data))
       }catch(err){
           console.log(err)
       }};
       getMessages();
       
    },[currentChat]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const message = {
            sender:user._id,
            text: newmessages,
            conversationId: currentChat._id
        };
        try{
            const res = await axios.post("/messages", message)
            setmessages([...messages, res.data])
            setNewmessages("")
        }catch(err){
            console.log(err)
        }
    }
    console.log(currentChat)
    return (
        <>
        <Topbar />
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search Friends Here" className="chatMenuInput" />
                    
                    {conversations.map((c)=>
                    (<div onClick={()=>setcurrentChat(c)}>
                        <Conversation conversation={c} currentUser={user}/>
                    </div>                                        
                    ))}
                    
                    
                    
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                    <>
                    <div className="chatBoxTop">
                       {messages.map( (m)=>(
                            <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id}/>
                            </div>
                       ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className= "chatMessageInput" placeholder="Chat here..."
                        onChange={(e)=> setNewmessages(e.target.value)}
                        value={newmessages}                        
                        >

                        </textarea>
                        <button className="chatSubmitButton"onClick={handleSubmit}>Send</button>
                    </div></>: <span className="noConversationText">Start a conversation</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <Chatonline/>
                </div>
            </div>
        </div>
        </>
    )
}
