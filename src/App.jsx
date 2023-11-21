/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import MessageBox from "./components/MessageBox";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import "./index.css";

const requestor = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

const App = () => {
  const [userMsg, setUserMsg] = useState("");
  const [botMsg, setBotMsg] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  useEffect(() => {
    if (currentTitle && userMsg && botMsg) {
      setPreviousChats((prev) => [
        ...prev,
        {
          title: currentTitle,
          role: botMsg.role,
          content: botMsg.content,
        },
      ]);
      setUserMsg("");
    }
  }, [botMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userMsg.trim() === "") return;

    if (!currentTitle) setCurrentTitle(userMsg);

    setPreviousChats((prev) => [
      ...prev,
      {
        title: currentTitle || userMsg,
        role: "user",
        content: userMsg,
      },
    ]);

    // NOTE: This API request is what sends the user input to the Flask backend
    try {
      const response = await requestor.post("/send_to_backend", { userMsg });
      // console.log(response.data[response.data.length-1].content);
      setBotMsg({
        role: "assistant",
        content: response.data[response.data.length - 1].content,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const createNewChat = () => {
    setBotMsg(null);
    setUserMsg("");
    setCurrentTitle(null);
  };

  const changeCurrentChat = (newTitle) => {
    setBotMsg(null);
    setUserMsg("");
    setCurrentTitle(newTitle);
  };

  const currentChat = previousChats.filter(
    (item) => item.title === currentTitle
  );

  const chatTitles = Array.from(
    new Set(previousChats.map((item) => item.title))
  );

  console.log(previousChats);

  return (
    <div id="container">
      <Sidebar
        createNewChat={createNewChat}
        chatTitles={chatTitles}
        changeCurrentChat={changeCurrentChat}
        currentTitle={currentTitle}
      />
      <div id="main-panel">
        <ChatHeader heading={currentTitle} />
        <ChatWindow currentChat={currentChat} />
        <MessageBox
          userMsg={userMsg}
          setUserMsg={setUserMsg}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default App;
