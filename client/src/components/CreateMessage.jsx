import React, { useState } from "react";

const CreateMessage = ({ currentRoom, onNewMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.length === 0) {
      return;
    }

    try {
      const json = await (
        await fetch(`http://localhost:8081/message/create/${currentRoom}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
          },
          body: JSON.stringify({
            text: message,
          }),
        })
      ).json();

      console.log(json);

      // Call the onNewMessage callback with the new message
      onNewMessage(json.Created);
      onNewMessage(json.Created, json.userName);
      setMessage(""); // Clear the input field
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form>
        <input
          placeholder="Type here!"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
      </form>
    </>
  );
};

export default CreateMessage;
