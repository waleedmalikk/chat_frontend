import React, { useEffect, useState, useContext } from "react";
import check_arr from "./Global";
import ChatList from "./List";
import AppContext from "./Context";

function Chat() {
  const [currMsg, setCurrMsg] = useState("");
  const [msgArr, setMsgArr] = useState([]);

  const { data_obj } = useContext(AppContext);

  const lastMessage = data_obj["lastMessage"];

  // console.log(data_obj);
  // const socket = data_obj[2];
  // const chat_hist = data_obj[3];

  async function sendMsg() {
    if (!check_arr.includes(currMsg)) {
      const username = data_obj["username"];
      const room = data_obj["room"];
      const sendJsonMessage = data_obj["sendJsonMessage"];

      const msgJSON = {
        msgType:'text_msg',
        username: username,
        room: room,
        msgBody: currMsg,
        timeStamp: dateCalc(),
        timeStamp2: new Date(),
      };
      // await socket.emit("send_msg", msgJSON);
      await sendJsonMessage(msgJSON, true);
    }
  }

  useEffect(() => {
    if (lastMessage !== null) {
      // console.log("lastmsg:", lastMessage);
      // console.log(JSON.parse(lastMessage.data));
      let temp_msg = JSON.parse(lastMessage.data);
      setMsgArr((prevState) => [...prevState, temp_msg]);
    }
  }, [lastMessage]);

  function dateCalc() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    let sort_chat = [];
    // for (let i = chat_hist.length-1; i >= 0; i--) {
    // sort_chat.push(JSON.parse(chat_hist[i]));
    // }

    sort_chat.forEach((chat_msg) => {
      setMsgArr((prevState) => [...prevState, chat_msg]);
    });
  }, []);

  // useEffect(() => {
  //   socket.on("receive_msg", (data) => {
  //     setMsgArr((prevState) => [...prevState, data]);
  //   });
  // }, [socket]);

  return (
    <div>
      {/* <div>Username:{username}</div>

      <div>Room:{room}</div> */}
      <div>
        <ChatList msgArr={msgArr} />
      </div>
      <div>
        <input
          type="text"
          onChange={(event) => {
            setCurrMsg(event.target.value);
          }}
        />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
