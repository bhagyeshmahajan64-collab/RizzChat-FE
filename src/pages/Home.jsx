
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import "./Home.css";
import { getAuth , signOut , onAuthStateChanged } from "firebase/auth";
import { FiSend } from "react-icons/fi";
import { RiZzzFill } from "react-icons/ri";
import { io } from "socket.io-client";

let socket = io("http://localhost:3000/");

function Home(){

  let [chat, setChat] = useState([]);
  let [message, setMessage] = useState("");
  let [username, setUsername] = useState(null);
  let endRef = useRef(null);

  let auth = getAuth();
  let nav = useNavigate();

  useEffect(()=>{
    function checkUser(user){
      if(!user) nav("/login");      // If the user is not logged in, navigate to the login page
      else setUsername(user.email); // Set the username to the user's email
    }

    let stopWatching = onAuthStateChanged(auth, checkUser);
    return ()=> stopWatching();
  } , [] );

  useEffect(() => {
    
    socket.on("history", (data) => setChat(data));
    socket.emit("getHistory"); // Request chat history from the server

    socket.on("message", (data) => setChat((prev) => [...prev, data]));
    
    return () => {
    socket.off("history");  // Clean up the event listeners when the component unmounts
      socket.off("message"); // Clean up the event listeners when the component unmounts
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" }); //Scroll to the bottom of the chat when a new message is added
  }, [chat]);

  function sendMessage()
  {
     if(username && message)
     {
        socket.emit("message",{ username , message}) // Send the message to the server
        setMessage("");
     }
  }

  return (
    <div className="container">
      <div className="form-box">
        <h2>RizzChat <RiZzzFill /></h2>


        <div className="button-group">
          <button onClick={()=>nav("/profile")}  style={{ backgroundColor: "#28a745" }}>
            Profile
          </button>

          <button onClick={()=>nav("/photos")} style={{ backgroundColor: "#007bff" }}>
            Snaps
          </button>

          <button onClick={()=>signOut(auth).then(()=>nav("/login"))} style={{ backgroundColor: "#dc3545" }}>
            Logout
          </button>
        </div>

        <div className="chat-box">
          <div className="chat-messages">
            {chat.map((data, index) => (
              <div
                key={index}
                className={`chat-row ${data.username === username ? "sent" : "received"}`}
              >
                <div className="chat-sender">{data.username}</div>
                <span className={`chat-bubble ${data.username === username ? "sent" : "received"}`}>
                  {data.message}
                </span>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="chat-input-area">
            <div className="chat-input-row">
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              />
              <button className="send-btn" onClick={sendMessage}>
                <FiSend style={{ color: 'inherit' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
