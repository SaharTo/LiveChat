import "./App.css";
import io from "socket.io-client"; //io use to establish the connection
import { useState } from "react"
import Chat from "./chat";
const socket = io.connect("http://localhost:3001"); //here we put the url where we run the socket.io server

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input type="text" placeholder="John..." onChange={(event) => { setUserName(event.target.value) }}></input>
          <input type="text" placeholder="Room ID..." onChange={(event) => { setRoom(event.target.value) }}></input>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room}></Chat>
      )
      }
    </div>
  );
}
export default App;
