/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import check_arr from "./Global";
import AppContext from "./Context";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import Chat from "./Chat";

const WS_URL = "ws:/127.0.0.1:5002";

// const socket = io("ws://localhost:5001");

function Home() {
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
  });
  const { data_obj, setDataObj } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  data_obj["sendJsonMessage"] = sendJsonMessage;
  data_obj["lastMessage"] = lastMessage;

  const joinRoom = () => {
    if (!check_arr.includes(username) && !check_arr.includes(room)) {
      data_obj["username"] = username;
      data_obj["room"] = room;
      let msgJson = {
        msgType: "join_msg",
        username: username,
        room: room,
      };
      sendJsonMessage(msgJson, true);
    } else {
      alert("Enter username and room.");
    }
  };

  return (
    <div>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <div>
        <Chat />
      </div>
    </div>
  );
}

export default Home;
