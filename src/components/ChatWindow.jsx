/* eslint-disable react/prop-types */
const ChatWindow = ({ currentChat }) => {
  return (
    <div id="chat-window">
      <ul id="message-feed">
        {currentChat?.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {message.role !== "user" && (
              <img
                id="user-icon"
                src="./openai.jpg"
                alt="No Image"
                style={{ marginLeft: "8px" }}
              />
            )}
            <li
              style={{
                backgroundColor:
                  message.role === "user" ? "#222327" : "#131314",
              }}
            >
              <p>{message.content}</p>
            </li>
            {message.role === "user" && (
              <img
                id="user-icon"
                src="./user.png"
                alt="No Image"
                style={{ marginLeft: "8px" }}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ChatWindow;
