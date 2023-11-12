import PropTypes from "prop-types";

const ChatHeader = ({ heading }) => {
  return (
    <div id="chat-header">
      {heading ? (
        <h1>Topic: {heading}</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          Welcome to your personal assistant!
        </h1>
      )}
    </div>
  );
};

export default ChatHeader;

ChatHeader.propTypes = {
  heading: PropTypes.string,
};
