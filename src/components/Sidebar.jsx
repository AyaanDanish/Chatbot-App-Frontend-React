/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

const Sidebar = ({
  createNewChat,
  chatTitles,
  changeCurrentChat,
  currentTitle,
}) => {
  return (
    <div id="sidebar">
      <div id="logo">
        <h1 id="title">Azure Chatbot</h1>
        <p id="subtitle">Your Helpful Assistant</p>
      </div>

      <button id="new-chat-btn" onClick={createNewChat}>
        + New Chat
      </button>

      {chatTitles.length > 0 && <hr className="divider" />}

      <ul id="chat-history">
        {chatTitles?.map((title, index) => (
          <li
            key={index}
            onClick={() => changeCurrentChat(title)}
            className={title === currentTitle ? "selected-chat" : ""}
          >
            <FontAwesomeIcon icon={faComment} style={{ marginRight: "10px" }} />
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
