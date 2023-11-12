/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const MessageBox = ({ userMsg, setUserMsg, handleSubmit }) => {
  const [btnHovered, setBtnHovered] = useState(false);

  const handleChange = (e) => {
    const textarea = e.target;

    const maxHeight =
      4 * parseFloat(window.getComputedStyle(textarea).lineHeight);
    const height = Math.min(maxHeight, textarea.scrollHeight);
    textarea.style.height = `${height}px`;

    setUserMsg(textarea.value);

    if (textarea.value.trim() === "") {
      textarea.style.height = "100%";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (userMsg.trim() !== "") {
        handleSubmit(e);
      }
    }
  };

  return (
    <div id="input-area">
      <form onSubmit={handleSubmit} id="input-form">
        <textarea
          id="message-box"
          type="text"
          value={userMsg}
          placeholder="Chat with your data..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          id="send-btn"
          type="submit"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onClick={handleSubmit}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={{
              width: "100%",
              height: "100%",
              minWidth: "100%",
              minHeight: "100%",
            }}
            bounce={btnHovered}
          />
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
