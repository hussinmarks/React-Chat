import React from "react";
import { useState, useEffect } from "react";
import CreateMessage from "./CreateMessage";

const MessageLoader = ({ currentRoom = "" }) => {
  const [messages, setMessages] = useState([]);
  // const [name, setName] = useState("");
  console.log("Current Room in MessageLoader:", currentRoom);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/message/all/${currentRoom}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
            },
          }
        );

        const json = await response.json();

        console.log(json);
        setMessages(json.Results);
      } catch (err) {
        console.log(err);
      }
    };

    getMessage();
  }, [currentRoom]);

  const handleNewMessage = (newMessage, userName) => {
    // Append the new message to the messages array
    const combo = { ...newMessage, user_id: { firstName: userName } };
    setMessages((prevMessages) => [...prevMessages, combo]);
  };

  return (
    <div className="messages">
      <ul style={{ listStyle: "none" }}>
        {messages?.map((message) => (
          <li key={message._id} className="message">
            <div className="message-header">
              <strong>{message.user_id.firstName}</strong>
            </div>
            <div className="message-text">{message.text}</div>
          </li>
        ))}
      </ul>
      <CreateMessage
        currentRoom={currentRoom}
        onNewMessage={handleNewMessage}
      />
    </div>
  );
};

export default MessageLoader;
