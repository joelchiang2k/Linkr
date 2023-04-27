import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatScreen = (props) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="b091b0e4-d6ed-4e43-bb88-f64080b2c47b"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatScreen;