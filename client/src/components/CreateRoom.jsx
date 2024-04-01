import { useState, useEffect } from "react";

const createRoom = ({ setCreatedRoom }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const json = await (
        await fetch(`http://localhost:8081/room/create/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("MyToken")}`,
          },
          body: JSON.stringify({
            title: title,
            description: description,
          }),
        })
      ).json();

      console.log(json);
      setCreatedRoom((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Create a Room!</h1>
      <input
        placeholder="Room Name"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Notes"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button style={{ backgroundColor: "grey" }} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default createRoom;