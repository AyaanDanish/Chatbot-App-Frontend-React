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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Copy user message as we're about to clear the text box - we'll send the copy
    const msgCopy = userMsg;

    // Clear the textbox after message is submitted
    setUserMsg("");

    // If message was empty
    if (userMsg.trim() === "") return;

    // If the chat didn't have a title yet, set it
    if (!currentTitle) setCurrentTitle(msgCopy);

    // Add the user's message to the chat history
    setPreviousChats((prev) => [
      ...prev,
      {
        title: currentTitle || msgCopy, // Use current title if available, otherwise use the initial message
        role: "user",
        content: msgCopy,
      },
    ]);

    // NOTE: This API request is what sends the user input to the Flask backend
    try {
      const response = await requestor.post("/send_to_backend", {
        userMsg: msgCopy,
      });
      const botAnswerText = response.data[response.data.length - 1].content; // Get the bot response

      // Add the bot's message to the chat history
      setPreviousChats((prev) => [
        ...prev,
        {
          title: currentTitle || msgCopy,
          role: "assistant",
          content: botAnswerText,
        },
      ]);
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
